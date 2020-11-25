import { TestBed } from '@angular/core/testing';

import { TransferMarketService } from './transfer-market.service';

describe('TransferMarketService', () => {
  let service: TransferMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
