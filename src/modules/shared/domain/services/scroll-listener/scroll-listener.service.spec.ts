import { TestBed } from '@angular/core/testing';

import { ScrollListenerService } from './scroll-listener.service';

describe('ScrollListenerService', () => {
  let service: ScrollListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
