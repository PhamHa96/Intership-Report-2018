import { UserService } from './../../providers/user.service';
import { Component, OnInit } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';

@Component({
  selector: 'app-listfriends',
  templateUrl: './listfriends.component.html',
  styleUrls: ['./listfriends.component.scss']
})
export class ListfriendsComponent implements OnInit {
  userInfo: any[];
  constructor(private usersv: UserService) { }

  ngOnInit() {
    this.usersv.getUserByToken()
      .subscribe(user => {
        console.log('user info', user.name);
        this.userInfo = user;
      });
  }
}
