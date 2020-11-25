export interface Player{
  firstName: string;
  lastName: string;
  position: Position.DEFENDER|Position.GOALKEEPER|Position.MIDDLE_FIELDER|Position.STRIKER;
  price: number;
  popularity: number;
  club: string;
  score: number;
}

export interface Team{
  goalkeeper: number;
  defender: number;
  striker: number;
  middleFielder: number;
}

export interface ExtendedPlayer extends Player{
  id: string;
  taken: boolean;
  styleType: StyleType.DEFENDER|StyleType.GOALKEEPER|StyleType.MIDDLE_FIELDER|StyleType.STRIKER;
}

export type Players = Array<ExtendedPlayer>;

export type PlayersResponse = {
  players: Array<Player>
};

export enum Position{
  DEFENDER = 'מגן',
  STRIKER = 'חלוץ',
  GOALKEEPER = 'שוער',
  MIDDLE_FIELDER = 'קשר'
}


export enum StyleType{
  DEFENDER = 'defender',
  STRIKER = 'striker',
  GOALKEEPER = 'goalkeeper',
  MIDDLE_FIELDER = 'middleFielder'
}
