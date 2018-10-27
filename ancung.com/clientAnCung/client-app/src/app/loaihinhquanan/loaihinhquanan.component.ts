import { ItypeFood } from './../models/ITypeFood';
import { ToastrService } from 'ngx-toastr';
import { TypeFoodService } from './../providers/type-food.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loaihinhquanan',
  templateUrl: './loaihinhquanan.component.html',
  styleUrls: ['./loaihinhquanan.component.scss']
})
export class LoaihinhquananComponent implements OnInit {
  isShowAdd = false;
  txtNewTypeFood: '';
  listTypeFood: ItypeFood[];
  constructor(private typeFoodsv: TypeFoodService, private toast: ToastrService) { }

  ngOnInit() {
    this.typeFoodsv.getAllTypeFood().subscribe(res => {
      this.listTypeFood = res;
    });
  }
  openAdd() {
    this.isShowAdd = true;
  }
  addTypeFood() {
    this.typeFoodsv.addNewTypeFood(this.txtNewTypeFood).subscribe(res => {
      if (res) {
        if (res.statusCode === 400) {
          this.toast.error('Type Food is existed!');
        } else {
          this.toast.success('Add type food success !');
          this.typeFoodsv.getAllTypeFood().subscribe(tf => {
            this.listTypeFood = tf;
          });
        }
      }
    });
    this.isShowAdd = false;
    this.txtNewTypeFood = '';
  }
  delete(id) {
    this.typeFoodsv.deleteTypeFood(id).subscribe(res => {
      if (res) {
        // console.log('hhihihi', res);
        if (res.statusCode === 400) {
          this.toast.success('Delete type food success !');
          this.typeFoodsv.getAllTypeFood().subscribe(tf => {
            this.listTypeFood = tf;
          });
        } else {
          this.toast.error('Delete type food fail !');
        }
      }
    });
  }
}
