import { Component, OnInit } from '@angular/core';
import {Sort, TransferMarketService} from '../../services/transfer-market.service';
import {Observable} from 'rxjs';
import {ExtendedPlayer, Players} from '../../models/Player';



@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  sort: Sort;
  constructor(private service: TransferMarketService) {
    this.sort = {} as Sort;
  }

  ngOnInit(): void {
    this.service.sort.subscribe( sort => this.sort = sort);
  }

  get players(): Observable<Players> {
    return this.service.players;
  }

  sortBy(sort: string): void {
    this.service.onSort(sort);
  }

  isColumnSorted(colName: string , order: number): boolean {
    return this.sort.sortBy === colName && this.sort.order === order;
  }

  onPlayerSelect(player: ExtendedPlayer): void{
    this.service.onPlayerSelect(player);
  }

}
