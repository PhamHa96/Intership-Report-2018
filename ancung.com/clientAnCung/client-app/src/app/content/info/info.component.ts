import { MapsAPILoader } from '@agm/core';
import { IQuan } from './../../models/IQuan';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyDialogComponent } from '../../content/my-dialog/my-dialog.component';
import { QuanAnService } from '../../providers/quan-an.service';
import { JoinDialogComponent } from '../join-dialog/join-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  lat: Number = 10; // tọa độ mặc định
  lng: Number = 106; // tọa độ mặc định
  zoom: Number = 14;
  dir = undefined;
  quanAn: IQuan = {
    _id: '',
    name: '',
    typeFood: '',
    minPrice: '1000',
    maxPrice: '10000',
    timeStart: '',
    timeAnd: '',
    address: '',
    detail: '',
    long: 0,
    lat: 0
  };
  constructor(private mapsAPILoader: MapsAPILoader, public _quananService: QuanAnService,
    public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = (params['_id'] as string);
      // Lấy thông tin quán ăn 2.4.b
      this._quananService.getOneRestaurentByID(id).subscribe(quan => {
        this.quanAn = quan;
        // this.lat = this.quanAn.lat;
        // this.lng = this.quanAn.long;
        console.log('this.quanAn', this.quanAn);
      });
    });
    console.log('check lng lat ', this.lng, this.lat);
  }
  // Lay vị trí hiện tại 2.4.a
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  // Lay chi duong 2.4.b
  getDirection() {
    this.setCurrentPosition();
    console.log('check lng lat ', this.lng, this.lat);
    console.log('check quanAn lng lat ', this.quanAn.long, this.quanAn.lat);
    this.dir = {
      origin: { lat: this.lat, lng: this.lng },
      destination: { lat: this.quanAn.lat, lng: this.quanAn.long }
    };
  }
 // mo create dialog 2.3.a
 openDialog(idQuanAn) {
  this._quananService.shareIdQuanAn(idQuanAn); // gọi service shareIdQuanAn và gửi id của quán
  const dialogRef = this.dialog.open(MyDialogComponent, {
    width: '600px',
  });
}
// mo Join dialog 2.2.a
openJoinDialog(idQuanAn) {
  this._quananService.shareIdQuanAn(idQuanAn); // gọi service shareIdQuanAn và gửi id của quán
  const dialogRef = this.dialog.open(JoinDialogComponent, {
    width: '600px',
  });
}
}
