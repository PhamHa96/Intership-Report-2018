// import { Injectable, OnInit } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
// import { LoginService } from './login.service';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

// @Injectable()
// export class HomeguardService implements CanActivate, OnInit {
//   constructor(private _login: LoginService) { }
//   // isLogin: String = 'false';
//   isLogin: any;

//   ngOnInit() {

//   }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (localStorage.getItem('isLoginSocial') === 'true') {
//       this._login.setIsLogin(true);
//     }

//     this._login.IsLogin.subscribe(value => {
//       // console.log(value);
//       this.isLogin = value;
//     });

//     if (localStorage.getItem('local_login') === 'true') {
//       this._login.setIsLogin(true);
//     }

//     if (this.isLogin || localStorage.getItem('local_login') === 'true' ||
//     localStorage.getItem('token') || localStorage.getItem('isLoginSocial') === 'true') {
//       return true;
//     }
//     return false;
//   }
// }
