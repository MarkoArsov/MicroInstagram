import { TestBed } from '@angular/core/testing';

import { PhotoDetailsGuard } from './photo-details.guard';

describe('PhotoDetailsGuard', () => {
  let guard: PhotoDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PhotoDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
