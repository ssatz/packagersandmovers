import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../_services/index';

@Component({
  selector: 'app-header-signin',
  templateUrl: './header-signin.component.html',
  styleUrls: ['./header-signin.component.css']
})
export class HeaderSigninComponent implements OnInit {
  enquiryRequestForm = {};

  constructor(private http: HttpClient,public loginService: LoginService) { }

  ngOnInit() {
  }

  enquiryRequest() {
    console.log(this.enquiryRequestForm);
    this.http.post(this.loginService.urls['enquiryRequestForm'],
      {
        enquiryRequestForm: this.enquiryRequestForm
      }, {})
      .subscribe(
        data => {
          alert('Thanks for the enquiry. We will reach you soon.');
        },
        error => {
          alert('Thanks for the enquiry. We will reach you soon.');
        });
  }

}
