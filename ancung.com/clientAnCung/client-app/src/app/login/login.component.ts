import { IUser } from './../models/IUser';
import { UserService } from './../providers/user.service';
import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { log } from 'util';
import { ToastrService } from 'ngx-toastr';

// import {Http}  from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userSV: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  email: String;
  password: String;
  ngOnInit() {
  }
// Mô tả: Hàm check login
  checkLogin() {
    this.userSV.checkLogin(this.email, this.password).subscribe(data => {
      if (data.statuscode === 200) {
        localStorage.setItem('x', data.token);
        this.router.navigate(['./home']);
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message);
      }
    });
  }


}
