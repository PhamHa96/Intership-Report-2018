import { IUser } from './../../models/IUser';
import { UserService } from './../../providers/user.service';
import { StatesService } from './../../providers/state.service';
import { Component, OnInit } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
const message_err = require('../../../app/message_err.ts');
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dataUser: IUser[];
  usernow: IUser;
  idCheckFriend: '';
  keySearchFriend: ''; // 2.2 nhập key search
  constructor(private usersv: UserService, private toastr: ToastrService, private userStateService: StatesService) { }

  ngOnInit() {
    this.usersv.getUserByToken()
      .subscribe(user => {
        this.usernow = user;
        this.idCheckFriend = user._id;
      });
  }
  // (2) Xử lý search
  search() {
    // check hạng mục 2.3.a.1
    if (this.keySearchFriend === '') {
      this.toastr.error(message_err.EM.ADDFRIEND.EMTY_KEYSEARCH);
    }
    this.usersv.getUsertByNameOrEmail(this.keySearchFriend).subscribe(data => {
      this.dataUser = data;
    });
  }
  addFriend(id) {
    this.usersv.follow(id).subscribe(data => {
      console.log('data---> ', data);
      if (data.statusCode === 400) {
        // Check make friend 3.1.a.1
        this.toastr.error(message_err.EM.ADDFRIEND.ALREADY_MAKEFRI);
      } else if (data.statusCode === 200) {
        // Thông báo thành công 3.2.a
        this.toastr.success(data.message);
      } else {
        this.toastr.error(message_err.EM.ADDFRIEND.ERROR);
      }
    });
  }
}
