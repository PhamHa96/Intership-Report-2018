import { Router } from '@angular/router';
import { IUser } from './../models/IUser';
import { Component, OnInit } from '@angular/core';
import { SignupService } from '../providers/signup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  fistName = '';
  lastName = '';
  confirmPassword = '';
  messErr = '';
  user: IUser = {
    email: '',
    password: '',
    phone: '',
    sex: 'female'
  };
  constructor(private _signup: SignupService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  signUp() {
    this.user.name = this.fistName + ' ' + this.lastName;
    this._signup.signUp(this.user).subscribe(data => {
      if (data) {
        if (data.statusCode === 404) {
          this.toastr.error(data.message);
        } else if (data.statusCode === 201) {
          this.toastr.success(data.message);
          // 2.5 chuyển sang màn hình login
          this.router.navigate(['./login']);
        }
      }
    });
  }
}
