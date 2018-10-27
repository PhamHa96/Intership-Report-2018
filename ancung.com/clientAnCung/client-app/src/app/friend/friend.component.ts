import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { IUser } from './../models/IUser';
import { UserService } from './../providers/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  listFriend: any[] = [];
  objListFriend: Array<IUser> = [];
  constructor(private usersv: UserService, private toast: ToastrService) { }

  ngOnInit() {
    this.getListFriend();
  }
  // Lấy danh sách bạn bè 1.2
  async getListFriend() {
    await this.usersv.getUserByToken().subscribe(user => {
      // 1.2.c Lấy danh sách bạn bè của user đó
      this.listFriend = user.friend;
      this.listFriend.forEach(item => {
        this.usersv.getUsertByID(item.id_friend).subscribe(a => {
          this.objListFriend.push(a);
        });
      });
     // console.log('check kq>>>>> ', this.objListFriend);
    });
  }
  unFriend(id) {
    this.usersv.unFriend(id).subscribe(res => {
      if (res) {
        // Thông báo thành công 4.2.a
        if (res.statusCode === 200) {
          this.toast.success(res.message);
          this.getListFriend();
        }
        // Báo lỗi 4.1.a.1
        if (res.statusCode === 400) {
          this.toast.error(res.message);
        }
      }
    });
  }
}
