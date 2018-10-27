import { LoginService } from './../providers/login.service';
import { Router } from '@angular/router';
import { UserService } from './../providers/user.service';
import { IUser } from './../models/IUser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
 isDisable = true;
  isInLogin = false;
  user: IUser;
  constructor(private userService: UserService, public router: Router, private _login: LoginService) { }

  ngOnInit() {
      // this._getprofile.getProfile().then(data => {
      //   this.dataUser = data;
      // });
      const checkToken = localStorage.getItem('x');
      if (checkToken) {
          this.isInLogin = true;
      }
      this.userService.getUserByToken()
          .subscribe(user => {
              this.user = user;
              if (user) {
                  this.isInLogin = true;
              }
          });
  }

  edit() {
    this.isDisable = false;
  }
  onTrueDisable(isDisable: boolean) {
        this.isDisable = true;
  }
  signout() {
      localStorage.clear();
      // this._login.setIsLogin(false);
      this.router.navigate(['/login']);
  }

}
