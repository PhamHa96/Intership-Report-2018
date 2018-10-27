
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
@Injectable()
export class LoginService implements CanActivate {
  constructor() { }

  canActivate() {
    const checkToken = localStorage.getItem('x');
    return checkToken ? true : false;
  }
}

