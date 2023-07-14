import { TestBed } from '@angular/core/testing';

import { SendTransactionsService } from './send-transactions.service';

describe('SendTransactionsService', () => {
  let service: SendTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
