import { Router } from '@angular/router';
import { element } from 'protractor';
import { StatesService } from './../../providers/state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IQuan } from './../../models/IQuan';
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyDialogComponent } from '../../content/my-dialog/my-dialog.component';
import { QuanAnService } from '../../providers/quan-an.service';
import { JoinDialogComponent } from '../join-dialog/join-dialog.component';

@Component({
  selector: 'app-quanan',
  templateUrl: './quanan.component.html',
  styleUrls: ['./quanan.component.scss']
})
export class QuananComponent implements OnInit {
  quan: IQuan = {
    name: '',
    address: '',
    image: [{ image: '' }],
  };
  // quans: IQuan[] = [];
  quans: any;
  txtTim = '';
  constructor(private router: Router,
    public dialog: MatDialog, private _quananStateService: StatesService, private quanAnsv: QuanAnService) {

  }
  async ngOnInit() {
    //   await this.quanAnsv.getAllRestaurents().subscribe(data => {
    //     this.quans = data;
    //     this.quans.forEach(e => {
    //       if (e.image.length > 0) { e.image = e.image[0].image; } else { e.image = null; }
    //     });
    //     console.log(this.quans, 'img');
    // });
    await this._quananStateService.getAll();
    await this._quananStateService.QuanAn.subscribe(quans => {
      this.quans = quans;
      this.quans.forEach(e => {
        if (e) {
          if (e.image.length > 0) { e.image = e.image[0].image; this.quan.image = e.image[0].image; } else { e.image = null; }
        }
      });
      // console.log(this.quans, 'img');
    });
    const v = 1;
  }
  search() {
    this._quananStateService.find(this.txtTim as string);
  }
  // mo create dialog
  openDialog(idQuanAn) {
    this.quanAnsv.shareIdQuanAn(idQuanAn); // gọi service shareIdQuanAn và gửi id của quán
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '600px',
    });
  }
  openJoinDialog(idQuanAn) {
    this.quanAnsv.shareIdQuanAn(idQuanAn); // gọi service shareIdQuanAn và gửi id của quán
    const dialogRef = this.dialog.open(JoinDialogComponent, {
      width: '600px',
    });
  }
}





