import { StatesService } from './../providers/state.service';
import { IQuan } from './../models/IQuan';
import { async } from '@angular/core/testing';
import { AgmCoreModule } from '@agm/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuanAnService } from '../providers/quan-an.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MyDialogComponent } from '../content/my-dialog/my-dialog.component';
import { JoinDialogComponent } from '../content/join-dialog/join-dialog.component';
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-google-map-agm',
  templateUrl: './google-map-agm.component.html',
  styleUrls: ['./google-map-agm.component.scss']
})
export class GoogleMapAgmComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
 
  quans: IQuan[] = [];
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialog: MatDialog, private quanansv: QuanAnService
  ) { }
  ngOnInit(): void {
    this.quanansv.getAllRestaurents().subscribe(quans => {
      this.quans = quans;
      console.log('xem data quan', this.quans);
    });
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
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
        });
      });
    });
  }
  // GET MYLOCATION
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  search() {
    // this._quananStateService.find(this.txtTim as string);
  }
}
