import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertService, LoginService } from '../_services/index';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updatePrfileTO = {};
  loading = false;
  userDetail = { fileds: { mobile: 'qqqqqqqqqq' } };

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) {
    this.userDetail = { fileds: { mobile: 'wwwwwwwwwwwwww' } };
  }

  ngOnInit() {
    if (this.loginService.loadUserDetails()) {
      this.userDetail = { fileds: { mobile: 'q' } };
      this.userDetail = JSON.parse(this.loginService.getCookie('userDetails'));
      try {
        this.userDetail['fields'] = JSON.parse(this.userDetail['fields']);
      } catch (e) { }
      // this.updatePrfileTO['username'] = this.loginService.getCookie('userName');
      this.updatePrfileTO['mobile'] = this.userDetail['fields'].mobile;
      this.updatePrfileTO['landline'] = this.userDetail['fields'].landline;
      this.updatePrfileTO['email'] = this.userDetail['fields'].email;
      this.updatePrfileTO['address'] = this.userDetail['fields'].address;
      this.updatePrfileTO['name'] = this.userDetail['fields'].name;
      // this.updatePrfileTO['userid'] = fields.user_id;
      // this.updatePrfileTO['password'] = fields.password;
      // this.updatePrfileTO['login_type_id'] = this.userDetail['login_type_id'];
    }
  }
  updateProfile() {
    console.log(this.updatePrfileTO)
    this.loading = true;
    this.userDetail['fields'].mobile = this.updatePrfileTO['mobile'];
    this.userDetail['fields'].landline = this.updatePrfileTO['landline'];
    this.userDetail['fields'].email = this.updatePrfileTO['email'];
    this.userDetail['fields'].address = this.updatePrfileTO['address'];
    this.userDetail['fields'].name = this.updatePrfileTO['name'];
    this.http.post(this.loginService.urls['updateUserDetail'],
      { userId: this.userDetail['user_id'], fields: JSON.stringify(this.userDetail['fields']) }, {})
      .subscribe(
        data => {
          if (data == 1) {
            alert('Updated Successfully!');
            this.loginService.setCookie('userDetails', JSON.stringify(this.userDetail));
          } else {
            alert('Not Updated!');
          }
        },
        error => {
          if (error == 1) {
            alert('Updated Successfully!');
            this.loginService.setCookie('userDetails', JSON.stringify(this.userDetail));
          } else {
            alert('Not Updated!');
          }
          this.loading = false;
        });
  }
}