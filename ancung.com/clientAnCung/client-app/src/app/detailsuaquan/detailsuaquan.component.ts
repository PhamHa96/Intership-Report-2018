import { ToastrService } from 'ngx-toastr';
import { IQuan } from './../models/IQuan';
import { Router, ActivatedRoute } from '@angular/router';
import { QuanAnService } from './../providers/quan-an.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailsuaquan',
  templateUrl: './detailsuaquan.component.html',
  styleUrls: ['./detailsuaquan.component.scss']
})
export class DetailsuaquanComponent implements OnInit {
  data: IQuan;
  idQuan: any;
  constructor(private toast: ToastrService, private _quananService: QuanAnService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idQuan = (params['_id'] as string);
      this._quananService.getOneRestaurentByID(this.idQuan).subscribe(quan => {
        this.data = quan;
      });
    });
  }
  update() {
    this._quananService.updateRestaurant(this.idQuan, this.data).subscribe(res => {
      if (res) {
        if (res.statusCode === 202) {
          this.toast.success('Update restaurant success !');
        } else {
          this.toast.error('Update restaurant fail !');
        }
      }
    });
  }
  cancel() {
    this.router.navigate(['/manarestaurant']);
  }
}
