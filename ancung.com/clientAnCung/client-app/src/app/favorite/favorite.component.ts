import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QuanAnService } from './../providers/quan-an.service';
import { IParty } from './../models/IParty';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  listParty: IParty[];
  constructor(private quanansv: QuanAnService) { }

  ngOnInit() {
    this.quanansv.getAllPartyIsComing().subscribe(data => {
      this.listParty = data;
      console.log('this.listParty', this.listParty);
    });
  }

}
