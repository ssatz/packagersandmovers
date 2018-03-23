import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../_services/index';
declare var $: any;

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  addTrackingTO = {};
  track = {};
  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) { }
  loading = false;
  book;
  bookList: any = [];
  ngOnInit() {
    if (this.loginService.loadUserDetails()) {
    }
    if (this.loginService.userId) {
      this.http.post(
        this.loginService.urls['commonSelect'],
        {
          tableName: 'book', whereString: ' user_id=' + this.loginService.userId
        }, {})
        .subscribe(
          data => {
            for (let i in data) {
              if (data[i].fields != '') {
                try { data[i].fields = JSON.parse(data[i].fields); } catch (e) { }
              }
            }
            this.bookList = data;
          },
          error => {
            this.loading = false;
          });
    }
    this.book = undefined;
  }
  viewTracking(bookingObj) {
    this.book = bookingObj;
  }
  editBooking(bookingObj) {
    this.loginService.setLocalObject('change_book', bookingObj);
    this.loginService.setCookie('change_book', JSON.stringify(bookingObj));
    this.router.navigateByUrl('/booking');
  }
  getConfirmedColor() {
    if (this.book && this.book.fields)
      return (['Approved'].indexOf(this.book.fields.status) > -1) ? '#98D091' : '#A8D091';
  }
  findTracking() {
    this.loading = true;
    var varString = '';
    if (this.addTrackingTO['bookingid']) {
      varString = ' book_id=' + this.addTrackingTO['bookingid'];
    } else {
      if (this.loginService.isAdmin) {
        varString = '';
      } else {
        alert("Please enter the booking id(tracking id)!.");
        return;
      }
    }
    this.http.post(this.loginService.urls['commonSelect'],
      {
        tableName: 'book', whereString: varString
      }, {})
      .subscribe(
        data => {
          for (let i in data) {
            if (data[i].fields != '') {
              data[i].fields = data[i].fields.replace(new RegExp('\\n', 'g'), '');
              try { data[i].fields = JSON.parse(data[i].fields); } catch (r) { }
              setTimeout(function(){$('.panel-info').focus();},500);
            }
          }
          this.bookList = data;
          this.book = data[0];
        },
        error => {
          this.loading = false;
        });
  }
}