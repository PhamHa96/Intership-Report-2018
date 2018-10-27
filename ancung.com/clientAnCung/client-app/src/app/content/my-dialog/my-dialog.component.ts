import { IUser } from './../../models/IUser';
import { UserService } from './../../providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { IParty } from './../../models/IParty';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuanAnService } from '../../providers/quan-an.service';
import { IQuan } from '../../models/IQuan';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {
  isDisableBtnSend = false;
  showFind = false;
  hideCreate = false;
  keySearchFriend: '';
  listFriend: any[] = [];
  objListFriend: Array<IUser> = [];
  listResult: Array<IUser> = []; // list tim dc trong ds  ban
  quanAn: IQuan;
  idQuanAn: String;
  party: IParty = {
    numberMax: 2,
    timeStart: '',
    timeEnd: '',
    idRestaurant: ''
  };
  idPartyResult: '';
  constructor(private usersv: UserService, private quanansv: QuanAnService,
    public thisDialogRef: MatDialogRef<MyDialogComponent>, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    await this.usersv.getUserByToken().subscribe(user => {
      // console.log('user infi in friendcomponent: ' , user);
      this.listFriend = user.friend;
      console.log(this.listFriend);
      this.listFriend.forEach(item => {
        this.usersv.getUsertByID(item.id_friend).subscribe(a => {
          this.objListFriend.push(a);
        });
      });
    });
  }
  createParty() {
    this.quanansv.nhanIdQuanAn.subscribe(idQuanAn => this.idQuanAn = idQuanAn); // Nhận id từ service
    this.party.idRestaurant = this.idQuanAn;
    const x = JSON.stringify(this.party);
    this.quanansv.createParty(x).subscribe(res => {
      console.log('res party tra ve', res);
      if (res) {
        if (res.statusCode === 404) {
          this.toastr.error('not exist restaurent!');
        } else if (res.statusCode === 400) {
          this.toastr.error('Date start not valid!');
        } else if (res.statusCode === 201) {
          this.toastr.success('Create party success !');
          this.idPartyResult = res.response._id;
          this.hideCreate = true;
          this.showFind = true;
        } else {
          this.toastr.error('Create restaurent false !');
        }

      } else {
        this.toastr.error('Create restaurent false !');
      }
    });
  }
  onCloseConfirm() {
    this.createParty();
    this.showFind = true;
    // this.thisDialogRef.close('confirm');
  }

  onCloseCancel() {
    this.thisDialogRef.close('cancel');
  }
  // search() {
  //   this.isDisableBtnSend = false;
  //   this.objListFriend.forEach(item => {
  //     if (item.name === this.keySearchFriend || item.email === this.keySearchFriend) {
  //       this.listResult.push(item);
  //     }
  //   });
  // }
  inviteFriend(idUser) {
    console.log('iduser', idUser);

    this.quanansv.inviteByMail(this.idPartyResult, idUser).subscribe(res => {
      if (res) {
        console.log(res, 'resssssssss');
        if (res.statusCode === 400) {
          this.toastr.error('You send this person before!');
        } else {
          if (res.message.statusCode === 202) {
            this.toastr.success('Send mail invite success !');
            this.isDisableBtnSend = true;
          } else {
            this.toastr.error('Send mail fail !');
          }
        }
      } else {
        this.toastr.error('Send mail fail !');
      }
    });
  }
}
