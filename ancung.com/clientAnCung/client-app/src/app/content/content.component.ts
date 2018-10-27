import { StatesService } from './../providers/state.service';
import { Component, OnInit } from '@angular/core';
import { TypeFoodService } from '../providers/type-food.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  typeFood: any = {};
  getIdTypeFood: '';
  txtTim: '';
  constructor(
    private _typeFood: TypeFoodService, public _quananStateService: StatesService
  ) { }

  ngOnInit() {
    this.ngGetTypeFood();
  }
  ngGetTypeFood() {
    this._typeFood.getDataTypeFood();
    this._typeFood.getAllType.subscribe(data => {
      this.typeFood = data;
      return this.typeFood;
    });
  }
  search() {
    if (this.txtTim === undefined || this.txtTim === '') {
      const keySearch = this.getIdTypeFood;
      this._quananStateService.find(keySearch as string);
    } else if (this.getIdTypeFood === undefined) {
      const keySearch = this.txtTim;
      this._quananStateService.find(keySearch as string);
    } else {
      const keySearch = this.txtTim;
      this._quananStateService.find(keySearch as string);
    }
  }
}
