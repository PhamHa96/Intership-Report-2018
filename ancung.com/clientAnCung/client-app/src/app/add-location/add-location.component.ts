import { IQuan } from './../models/IQuan';
import { TypeFoodService } from './../providers/type-food.service';
import { AgmCoreModule, CircleManager, MouseEvent } from '@agm/core';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuanAnService } from '../providers/quan-an.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MyDialogComponent } from '../content/my-dialog/my-dialog.component';
import { JoinDialogComponent } from '../content/join-dialog/join-dialog.component';
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  messErr = '';
  nameImage: '';
  typeFood: any = {};
  quan: IQuan = {
    name: '',
    address: '',
    long: 10,
    lat: 106,
    typeFood: '',
    timeStart: '',
    timeAnd: '',
    detail: '',
    minPrice: '',
    maxPrice: ''
  };
  //   mapClicked($event: MouseEvent) {
  //     this.setLat= $event.coords.lat;
  //     this.setLng= $event.coords.lng;
  //     this.getDataQuan(this.setLat, this.setLng);
  //     console.log(this.setLat + " , " + this.setLng);
  //   }
  selectedFile: File = null;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public file = new FormData();
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _typeFood: TypeFoodService,
    private quanAnsv: QuanAnService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // set google maps defaults in 97 Man Thien, q9
    this.zoom = 4;
    this.latitude = 10.8478152;
    this.longitude = 106.78600099999994;

    // create search FormControl ảnh ở đâu nowi gửi ảnh
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          console.log('this.latitude , longitude===', this.latitude, this.longitude);
        });
      });
    });
    this.ngGetTypeFood();
  }
  // GET MYLOCATION
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  onFileSelected(event) {
    console.log('event file ', event);
    // this.nameImage = event.target.file[0].name;
    this.selectedFile = event.target.files[0];
  }
  // get list type food
  ngGetTypeFood() {
    this._typeFood.getDataTypeFood();
    this._typeFood.getAllType.subscribe(data => {
      this.typeFood = data;
      return this.typeFood;
    });
  }
  // upload image
  uploadImage(id) {
    const fd = new FormData();
    fd.append('file', this.selectedFile, (this.selectedFile ? this.selectedFile.name : ''));
    this.quanAnsv.uploadImageRestaurent(fd, id).subscribe(res => {
      console.log('res in image', res);
    });
  }
  checkValue() {
    if (this.quan.name === '') {
      this.messErr = 'Please fill name! ';
    }
    if (this.quan.typeFood === '') {
      this.messErr = 'Please fill type food! ';
    }
    if (this.quan.timeStart === '') {
      this.messErr = 'Please fill time open! ';
    }
    if (this.quan.timeAnd === '') {
      this.messErr = 'Please fill time close! ';
    }
    if (this.quan.address === '') {
      this.messErr = 'Please fill address! ';
    }
    if (this.quan.detail === '') {
      this.messErr = 'Please fill detail! ';
    }
    // if (this.nameImage === '') {
    //   this.messErr = 'Please choose image ! ';
    // }
  }
  // create restaurent
  createRestaurent() {
    this.checkValue();
    console.log(this.messErr, 'whyyyyy');
    this.quan.long = this.longitude;
    this.quan.lat = this.latitude;
    const x = JSON.stringify(this.quan);
    console.log('data get dc quan:::', x);
    this.quanAnsv.createRestaurent(x).subscribe(res => {
      if (res) {
        console.log(res, 'res quan tra 11ve');
        if (res.statusCode === 400) {
          this.toastr.error('RESTAURANT IS EXISTED');
        } else if (res.statusCode === 201) {
          this.uploadImage(res.response._id);
          console.log(res, 'res quan tra ve');
          this.toastr.success('Create restaurent success !');
        } else {
          this.toastr.error('Create restaurent false !');

        }
      }
    });
  }
}
