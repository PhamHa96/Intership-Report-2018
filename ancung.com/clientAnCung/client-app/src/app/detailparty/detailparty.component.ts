import { ToastrService } from 'ngx-toastr';
import { IUser } from './../models/IUser';
import { UserService } from './../providers/user.service';
import { IQuan } from './../models/IQuan';
import { QuanAnService } from './../providers/quan-an.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-detailparty',
  templateUrl: './detailparty.component.html',
  styleUrls: ['./detailparty.component.scss']
})
export class DetailpartyComponent implements OnInit {
  infoQuan: IQuan = {
    name: '',
    address: '',
    lat: 0,
    long: 0
  };
  idParty: any;
  listObject: Array<IUser> = [];
  lat: Number = 10;
  lng: Number = 106;
  zoom: Number = 14;
  dir = undefined;
  party: any = {
  };
  user: IUser;
  listFriend: any[] = [];
  listUser: Array<IUser> = []; // list tim dc
  constructor(private router: Router, private route: ActivatedRoute, private _quananService: QuanAnService,
    private usersv: UserService, private toastr: ToastrService) { }

  async ngOnInit() {
    await this.usersv.getUserByToken().subscribe(user => {
      // console.log('user infi in friendcomponent: ' , user);
      this.user = user;
    });

    await this.route.params.subscribe(params => {
      const id = (params['_id'] as string);
      this.idParty = id;
      this._quananService.getPartyByID(id).subscribe(party => {
        this.party = party;
        party.listUser.forEach(item => {
          this.usersv.getUsertByID(item.id).subscribe(a => {
            this.listObject.push(a);
          });
        });
      });
    });
    // direction
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  async getDirection() {
    // lay nha hang
    await this._quananService.getOneRestaurentByID(this.party.idRestaurant).subscribe(info => {
      this.infoQuan = info;
      console.log('this.infoQuan', this.infoQuan);

      if (this.infoQuan === undefined) {
        alert('Restaurant was delete! please check before coming!');
      }
    });
    await this.setCurrentPosition();
    this.dir = {
      origin: { lat: this.lat, lng: this.lng },
      destination: { lat: this.infoQuan.lat, lng: this.infoQuan.long }
    };
    console.log(this.dir, 'dirrrrrr');

  }
  viewListInvite() {
    const listUserBeInvite: Array<IUser> = [];
    this.party.listUser.forEach(e => {
      if (e.invite) {
        this.usersv.getUsertByID(e.id).subscribe(item => {
          listUserBeInvite.push(item);
        });
      }
    });
    console.log(listUserBeInvite, 'listUserBeInvite');
    this.listUser = listUserBeInvite;
  }
  async join() {
    let flag = 0;

    if (this.party.public === false) { // neu la party private thi moi check
      console.log(this.party.listUser, 'listUser khi private');

      this.party.listUser.forEach(e => {

        if (e.id === this.user._id) {
          flag++;
          if (e.accept) {
            this.toastr.error('You was join this party!');
          } else {
            this._quananService.joinAParty(this.idParty).subscribe(r => {
              this.toastr.success('Join success !');
            });
          }
        }
      });
      if (flag === 0) {

        this.toastr.error('This is private party, you are not be invite!');

      }
    } else {
      this._quananService.joinAParty(this.idParty).subscribe(r => {
        console.log(r, 'r joi>>>>nnnnn');

        if (r.statusCode === 400) {
          this.toastr.error('You was join this party!!!');
        } else {
          this.toastr.success('Join success !');
        }
      });
    }
  }
}
