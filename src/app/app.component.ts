import { Component } from '@angular/core';
import {TransferMarketService} from './services/transfer-market.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Football-Transfer-Market-App';
  constructor(service: TransferMarketService) {
  }
}
