import {Injectable} from '@angular/core';
import {getTransferMargetData} from './mock';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ExtendedPlayer, Player, Players, PlayersResponse, Position, StyleType, Team} from '../models/Player';
import {map} from 'rxjs/operators';
import {v4 as uuidv4} from 'uuid';
import {Choice, ChoiceList} from '../components/shared/dropdown/dropdown.component';
import {newArray} from '@angular/compiler/src/util';

export type Sort = {
  sortBy: string;
  order: number;
};

interface Filter {
  position: string;
  minPrice: number;
  maxPrice: number;
  club: string;
  player: string;
}

interface Store{
  originalPlayers: Players;
  players: BehaviorSubject<Players>;
  sort: BehaviorSubject<Sort>;
  budget: BehaviorSubject<number>;
  team: Team;
  clubsOptions: BehaviorSubject<ChoiceList>;
  playersOptions: BehaviorSubject<ChoiceList>;
  filter: Filter;
}

enum Boundaries {
  BUDGET = 120000000,
  MAX_PLAYERS_PER_POSITION = 4
}

const resetFilterCode = '-100';

@Injectable({
  providedIn: 'root'
})
export class TransferMarketService {

  private store: Store;
  constructor() {
    this.store = {
      originalPlayers: [],
      players: new BehaviorSubject<Players>([]),
      sort: new BehaviorSubject<Sort>({ sortBy: 'name', order: -1 }),
      budget: new BehaviorSubject<number>(Boundaries.BUDGET),
      team: { defender: 0, goalkeeper: 0, middleFielder: 0, striker: 0 },
      clubsOptions: new BehaviorSubject<ChoiceList>([]),
      playersOptions: new BehaviorSubject<ChoiceList>([]),
      filter: {
        club: resetFilterCode,
        maxPrice: Number.MAX_SAFE_INTEGER,
        minPrice: Number.MIN_SAFE_INTEGER,
        player: resetFilterCode,
        position: resetFilterCode
      }
    };
    this.init();
  }

  private init(): void {
    this.fetchPlayers().subscribe( players => {
      this.store.originalPlayers = [...players];
      const sortedPlayers = this.sortArray(this.store.sort.getValue(), 'name', players);
      this.store.players.next(sortedPlayers);
      this.store.clubsOptions.next(this.createClubsOptions(sortedPlayers));
      this.store.playersOptions.next(this.createPlayersOptions(sortedPlayers));
    });
  }

  private createClubsOptions(players: Players): ChoiceList {
    return players.reduce((clubs: ChoiceList, player: ExtendedPlayer ) => [...clubs, { code: player.club, value: player.club }], []);
  }

  private createPlayersOptions(players: Players): ChoiceList {
    return players.reduce((clubs: ChoiceList, player: ExtendedPlayer ) => [...clubs, { code: player.id, value: `${player.firstName} ${player.lastName}` }], []);
  }

  private getStyle(position: Position): StyleType {
    switch (position) {
      case Position.DEFENDER:
        return StyleType.DEFENDER;
      case Position.GOALKEEPER:
        return StyleType.GOALKEEPER;
      case Position.MIDDLE_FIELDER:
        return StyleType.MIDDLE_FIELDER;
      case Position.STRIKER:
        return StyleType.STRIKER;
    }
  }

  private fetchPlayers(): Observable<Players> {
    return of<PlayersResponse>(getTransferMargetData()).pipe(map( res => res.players.map( (p: Player) => {
      return {
        ...p,
        taken: false,
        id: uuidv4(),
        styleType: this.getStyle(p.position)
      };
    }) as Players));
  }

  private compareBy(sort: string, player: ExtendedPlayer , otherPlayer: ExtendedPlayer): boolean {
    switch (sort){
      case 'popularity':
        return player.popularity > otherPlayer.popularity;
      case 'price':
        return player.price > otherPlayer.price;
      case 'name':
        return (player.firstName + player.lastName)  > (otherPlayer.firstName + otherPlayer.lastName);
      case 'score':
        return player.score > otherPlayer.score;
      default:
        return player.popularity > otherPlayer.popularity;
    }
  }

  private setCurrentSort(sort: string): void {
    const currentSort = this.store.sort.getValue();
    if (sort === currentSort.sortBy) {
      this.store.sort.next({...currentSort, order: currentSort.order * -1});
    } else {
      this.store.sort.next({sortBy: sort, order: 1});
    }
  }

  private sortArray(currentSort: Sort, newSort: string, players: Players): Players {
    const playersArray = [...players];
    return playersArray.sort((player , otherPlayer) => {
      return this.compareBy(newSort, player , otherPlayer) ? (1 * currentSort.order) : ( -1 * currentSort.order );
    });
  }

  private updateBudget(newBudget: number): void {
    this.store.budget.next(newBudget);
  }

  private updateTeam(key: keyof Team): void {
    this.store.team[key] +=  1 ;
  }

  private validatePlayersPerPosition(position: string): keyof Team | ''{
    const team = this.store.team;
    switch (position){
      case 'שוער':
        return team.goalkeeper < Boundaries.MAX_PLAYERS_PER_POSITION ? 'goalkeeper' : '';
      case 'קשר':
        return team.middleFielder < Boundaries.MAX_PLAYERS_PER_POSITION ? 'middleFielder' : '';
      case 'חלוץ':
        return team.striker < Boundaries.MAX_PLAYERS_PER_POSITION ? 'striker' : '';
      case 'מגן':
        return team.defender < Boundaries.MAX_PLAYERS_PER_POSITION ? 'defender' : '';
      default:
        return '';
    }
  }

  private validateBudget(price: number): number {
    const currentBudget = this.store.budget.getValue();
    return (currentBudget - price);
  }

  private validatePlayerNotOnTeam(player: ExtendedPlayer): boolean{
    return !player.taken;
  }

  private updateSelectedPlayer(player: ExtendedPlayer): boolean {
    const playerNotOnTheTeam = this.validatePlayerNotOnTeam(player);
    const playerPerPosition = this.validatePlayersPerPosition(player.position);
    const budget = this.validateBudget(player.price);
    if (playerNotOnTheTeam && playerPerPosition && budget > 0){
      this.updateTeam(playerPerPosition);
      this.updateBudget(budget);
      return true;
    }
    return false;
  }

  /***************** Public Api *********************/

  onSort(sort: string): void{
    this.setCurrentSort(sort);
    const currentSort = this.store.sort.getValue();
    const playersArray = this.sortArray(currentSort, sort, this.store.players.getValue());
    this.store.players.next(playersArray);
  }

  onPlayerSelect(player: ExtendedPlayer): void{
    if (this.updateSelectedPlayer(player)){
      const sort = this.store.sort.getValue();
      let updatedPlayers = this.store.originalPlayers.reduce((players: Players, otherPlayer: ExtendedPlayer) => {
        const updatedPlayer: ExtendedPlayer = {...otherPlayer };
        if (player.id === otherPlayer.id) {
          updatedPlayer.taken = true;
        }
        return [...players, updatedPlayer];
      }, []);
      this.store.originalPlayers = updatedPlayers;
      updatedPlayers = this.sortArray(sort, sort.sortBy, updatedPlayers);
      this.store.players.next(updatedPlayers);
    }
  }

  onFilter(type: string, data: any): void {
    const filter = { ...this.store.filter };
    switch (type){
      case 'position':
        filter.position = data;
        break;
      case 'minPrice':
        filter.minPrice = data && data >= 0 ? data : Number.MIN_SAFE_INTEGER;
        break;
      case 'maxPrice':
        filter.maxPrice = data && data >= 0 ? data : Number.MAX_SAFE_INTEGER;
        break;
      case 'club':
        filter.club = data;
        break;
      case 'player':
        filter.player = data;
        break;
    }
    const players = this.store.originalPlayers;
    const filteredPlayers = players.filter((player: ExtendedPlayer) => {
      return (filter.player === resetFilterCode || player.id === filter.player) &&
        (filter.club === resetFilterCode || player.club === filter.club) &&
        (filter.position === resetFilterCode || player.position === filter.position) &&
        (filter.minPrice === Number.MIN_SAFE_INTEGER || player.price >= filter.minPrice) &&
        (filter.maxPrice === Number.MAX_SAFE_INTEGER || player.price <= filter.maxPrice);
    });
    const sort = this.store.sort.getValue();
    this.store.players.next(this.sortArray(sort, sort.sortBy, filteredPlayers));
    this.store.filter = filter;
  }

  get players(): Observable<Players> {
    return this.store.players.asObservable();
  }

  get sort(): Observable<Sort> {
    return this.store.sort.asObservable();
  }

  get playersOptions(): Observable<ChoiceList> {
    return this.store.playersOptions.asObservable();
  }

  get clubsOptions(): Observable<ChoiceList> {
    return this.store.clubsOptions.asObservable();
  }

  get budget(): Observable<number>{
    return this.store.budget.asObservable();
  }
}
