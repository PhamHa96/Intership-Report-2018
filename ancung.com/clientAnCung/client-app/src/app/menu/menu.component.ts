import { log } from 'util';
import { IUser } from './../models/IUser';
import { UserService } from './../providers/user.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoginService } from '../providers/login.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {
  // isLogin = new BehaviorSubject<Boolean>(false);
  @Input() checkShow: boolean; // nhan tu cha
  isTemp = false;
  isInLogin = false;
  // check an hien admin
  isAdmin = false;
  user: IUser = {
    name: ''
  };
  constructor(private userService: UserService, private _login: LoginService, private router: Router) {
  }
  ngOnChanges(changes: SimpleChanges) {
  }
  ngOnInit() {
    this.router.events.subscribe((url: any) => {
      if (url.url === '/home') {
        this.userService.getUserByToken().subscribe(result => {
          this.user.name = result.name;
          if (result.role === 'ADMIN') {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        });
      } else if (url.url === '/login') {
        this.isAdmin = false;
      }
      const checkToken = localStorage.getItem('x');
      if (checkToken) {
        this.isInLogin = true;
      } else {
        this.isInLogin = false;
        this.user.name = '';
      }
    });
  }
}
