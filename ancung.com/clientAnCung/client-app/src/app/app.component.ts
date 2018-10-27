import { UserService } from './providers/user.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { RequestOptions, Headers } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  checkShow = false;
  title = 'app AnCung';
  constructor(private router: Router, private usersv: UserService) {
    const checkToken = localStorage.getItem('x');
    if (checkToken) {
    } else {
      this.router.navigate(['login']);
    }
    // ve lai admin
    // router.events.subscribe((url: any) => console.log(url));
    // if (router.url === '/admin') {
    // // this.hihi = true;
    // }
  }
  ngOnInit() {
    // await this.usersv.getUserByToken().subscribe(res => {
    //   console.log(res, 'res in app ts');
    //   if (res && res.role === 'ADMIN') {
    //     console.log('check show o day>>', res.role);
    //     this.checkShow = true;
    //   } else {
    //     this.checkShow = false;
    //   }
    // });
  }
}
