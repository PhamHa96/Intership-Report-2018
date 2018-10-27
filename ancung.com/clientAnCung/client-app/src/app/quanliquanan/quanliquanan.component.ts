import { ToastrService } from 'ngx-toastr';
import { IQuan } from './../models/IQuan';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesService } from './../providers/state.service';
import { QuanAnService } from './../providers/quan-an.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quanliquanan',
  templateUrl: './quanliquanan.component.html',
  styleUrls: ['./quanliquanan.component.scss']
})
export class QuanliquananComponent implements OnInit {
  listRestaurant: IQuan[] = [];
  constructor(private quansv: QuanAnService, private svstateservice: StatesService,
    private route: ActivatedRoute, private router: Router, private toast: ToastrService) { }

  ngOnInit() {
    this.quansv.getAllRestaurents().subscribe(res => {
      this.listRestaurant = res;
    });
  }
  delete(id) {
    this.quansv.deleteRestaurant(id).subscribe(res => {
      if (res) {
        if (res.statusCode === 400) {
          this.toast.success('Delete success !');
          this.quansv.getAllRestaurents().subscribe(newlist => {
            this.listRestaurant = newlist;
          });
        }
      }
    });
  }
}
