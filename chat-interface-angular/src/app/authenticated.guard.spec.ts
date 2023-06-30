import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.inject(AuthenticatedGuard).canActivate(...guardParameters);

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
