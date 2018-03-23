import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_services/index';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [LoginService]
})
export class SignupComponent implements OnInit {

  isSignUpActive = false;
  signupTO: any = { login_type_id: 2 };
  loading = false;
  constructor(private router: Router, private http: HttpClient, public loginService: LoginService) { }

  signup = {};
  signinTO = {};

  toggleSignUp(condition) {
    if (condition == 'login')
      this.isSignUpActive = false;
    else
      this.isSignUpActive = true;
  }

  ngOnInit() {
  }

  singin() {
    console.log(this.signinTO)
    this.loading = true;
    this.http.post(this.loginService.urls['signin'],
      {
        tableName: 'users', userName: this.signinTO['userName'],
        password: this.signinTO['password']
      }, {})
      .subscribe(
        data => {
          console.log(data);
          if (data == 0) {
            alert('Invalid Login. Please try again!');
          } else {
            this.loginService.setCookie('userName', this.signinTO['userName']);
            this.loginService.setCookie('userDetails', JSON.stringify(data[0]));
            this.loginService.setCookie('isAdmin', data[0].login_type_id == 1);
            this.router.navigateByUrl('/booking');
            if (data[0].login_type_id == 1)
              this.router.navigateByUrl('/addTracking');
            else
              this.router.navigateByUrl('/booking');
          }
        },
        error => {
          //this.alertService.error(error);
          this.loading = false;
        });
  }
  singup() {
    console.log(this.signupTO)
    this.loading = true;
    if(!this.signupTO.password){
      alert("Please enter the password!");
      return;
    }
    if(!this.signupTO.userName){
      alert("Please enter the userName!");
      return;
    }
    if(!this.signupTO.mobile){
      alert("Please enter the Mobile No!");
      return;
    }
    if(!this.signupTO.email){
      alert("Please enter the email address!");
      return;
    }
    if(this.signupTO.password != this.signupTO.confirmPassword){
      alert('Password and Confirm Password should be same!');
      return;
    }
    this.http.post(this.loginService.urls['signup'],
      {
        userName: this.signupTO.userName, login_type_id: '2',
        fields: JSON.stringify(this.signupTO),
        password: this.signupTO.password,
        email: this.signupTO.email
      }, {})
      .subscribe(
        (data: any) => {
          if (data && data.indexOf('Records inserted successfully') > -1) {
            alert('Account created successfully! Please login');
            this.toggleSignUp('login');
          } else if (data && data.indexOf('Record already exist') > -1) {
            alert('User name already exist!. Please try different name.');
          } else {
            alert('Please try again later!');
          }
        },
        error => {
          if (error && error.error && error.error.text && error.error.text.indexOf('Records inserted successfully') > -1) {
            alert('Account created successfully! Please login');
            this.toggleSignUp('login');
          } else if (error && error.error &&  error.error.text && error.error.text.indexOf('Record already exist') > -1) {
            alert('User name already exist!. Please try different name.');
          } else {
            alert('Please try again later!');
          }
        });
  }

}
