import { Component, OnInit } from '@angular/core';
import {TransferMarketService} from '../../services/transfer-market.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['./info-board.component.scss']
})
export class InfoBoardComponent implements OnInit {

  constructor(private service: TransferMarketService) { }

  ngOnInit(): void {
  }

  get budget(): Observable<number>{
    return this.service.budget;
  }
}
