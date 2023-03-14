import { TestBed } from '@angular/core/testing';

import { PhotoEditGuard } from './photo-edit.guard';

describe('PhotoEditGuard', () => {
  let guard: PhotoEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PhotoEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
