import { Component, OnInit } from '@angular/core';
import {TransferMarketService} from '../../services/transfer-market.service';
import {Observable} from 'rxjs';
import {Choice, ChoiceList} from '../shared/dropdown/dropdown.component';
import {ExtendedPlayer} from '../../models/Player';

@Component({
  selector: 'app-filter-board',
  templateUrl: './filter-board.component.html',
  styleUrls: ['./filter-board.component.scss']
})
export class FilterBoardComponent implements OnInit {

  selectedPosition = 'all';
  minPrice = '';
  maxPrice = '';
  constructor(private service: TransferMarketService) { }

  ngOnInit(): void {
  }

  onFilterSelected(data: any, filterType: string): void{
    this.service.onFilter(filterType, data);
  }

  onPlayerSelected(event: Choice): void {
    this.onFilterSelected(event.code, 'player');
  }

  onClubSelected(event: Choice): void {
    this.onFilterSelected(event?.code, 'club');
  }

  get players(): Observable<ChoiceList>{
    return this.service.playersOptions;
  }

  get clubs(): Observable<ChoiceList>{
    return this.service.clubsOptions;
  }
}
