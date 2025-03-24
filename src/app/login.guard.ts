import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FormServiceService } from './services/form-service.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const service =inject(FormServiceService)
  if(service.isLoggedIn()){
    return true;
  }
  return false;
};
