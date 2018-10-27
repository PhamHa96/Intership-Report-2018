import { IUser } from './../../models/IUser';
import { UserService } from './../../providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { IParty } from './../../models/IParty';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuanAnService } from '../../providers/quan-an.service';
@Component({
  selector: 'app-join-dialog',
  templateUrl: './join-dialog.component.html',
  styleUrls: ['./join-dialog.component.scss']
})
export class JoinDialogComponent implements OnInit {
  user: IUser;
  quanAn: any = {};
  idQuanAn: String;
  listParty: Array<IParty> = [];
  listUser: Array<IUser> = [];
  constructor(
    public thisDialogRef: MatDialogRef<JoinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _quanAnService: QuanAnService,
    private toastr: ToastrService, private usersv: UserService
  ) { }



  ngOnInit() {
    this._quanAnService.nhanIdQuanAn.subscribe(idQuanAn => this.idQuanAn = idQuanAn); // Nhận id từ service
    // 2.2.a Lấy danh sách các tiệc
    this._quanAnService.getPartyByIdRestaurant(this.idQuanAn).subscribe(data => {
      this.listParty = data;
      console.log('this.listParty', this.listParty);
    });
    // lay user hien tai de check
    this.usersv.getUserByToken().subscribe(u => { u = this.user; });
  }
  viewMore() {
    this.thisDialogRef.close('confirm');

  }
  onCloseConfirm() {
    this.thisDialogRef.close('confirm');
  }
}
