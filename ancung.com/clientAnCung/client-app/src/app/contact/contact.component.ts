import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  formContact: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formContact = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const URL = 'http://localhost:8081/contact/';
    this.http.post(URL, this.formContact.value).subscribe(res => {
      console.log(res);
    });
    console.log(this.formContact.value);
  }

}
