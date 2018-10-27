import { IUser } from './../models/IUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
@Injectable()
export class SignupService {
constructor(private http: Http) { }

  signUp(user: IUser) {
    return this.http.post('http://localhost:3000/api/user', user).pipe(map(res => {
      console.log('ressssss', res );
      return res.json();
    }));
  }
}
