import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';
import { NgForm  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../providers/user.service';
import { IUser } from '../../models/IUser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() isDisable: boolean; // nhan tu cha 
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTrueDisable: EventEmitter<boolean> = new EventEmitter<boolean>(); // truyen sang cha
  dataUser: IUser;
  form: NgForm;
  // sex: boolean;
  selectedFile: File = null;
  getTokenInLocalStorage =  localStorage.getItem('x');
  constructor(private userService: UserService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();

    // this._getprofile.Disable.subscribe(value => {
    //   this.disable = value;
    // });
  }

  getProfile() {
    this.userService.getUserByToken()
      .subscribe(user => {
        console.log('user info' , user.name);
        this.dataUser = user;
      });
      if (this.dataUser.sex === 'male') {
        this.form.value.sex = 'male';
      } else {
        this.form.value.sex = 'female';
      }
    }
    onFileSelected(event) {
      console.log('event file ', event);
      this.selectedFile = event.target.files[0];
    }

  update(form: NgForm) {
    // const fd = new FormData();
    // fd.append('files', this.selectedFile, this.selectedFile.name);
    // this.userService.uploadAvatarUser(fd, this.dataUser._id).subscribe(res => {
    //   console.log('res in image', res);
    // });
    console.log('data user', this.dataUser);
    this.userService.update(form.value).subscribe(data => {
      console.log(data);
      if (data) {
        this.toastr.success('Update Successfully');
      } else {
        this.toastr.error('Update Fail');

      }
    });
  }
  cancel() {
    this.onTrueDisable.emit(true);
  }

}
