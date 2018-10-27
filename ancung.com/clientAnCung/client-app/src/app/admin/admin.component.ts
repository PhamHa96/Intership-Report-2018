import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  a: Boolean = false;
  constructor(router: Router) {
    // router.events.subscribe((url: any) => console.log(url));
    // if (router.url === '/admin') {
    //   this.a = false;
    // }
   }

  ngOnInit() {
  }
  click() {
    this.a = true;
  }
}
