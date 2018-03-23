import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertService, LoginService } from '../_services/index';
@Component({
  selector: 'app-add-tacking',
  templateUrl: './add-tacking.component.html',
  styleUrls: ['./add-tacking.component.css']
})
export class AddTackingComponent implements OnInit {

  isActive = false;
  addLocationTO = {};
  addTrackingTO = {};
  saveStatusTO = {};
  bookList;
  isBookingNotSelected = true;
  toggleaddTracking(condition) {
    if (condition == 'ongoing')
      this.isActive = false;
    else
      this.isActive = true;
  }

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) { }
  loading = false;

  ngOnInit() {
    if (this.loginService.loadUserDetails()) {

    }
    this.addTracking();
  }
  editBooking(bookingObj) {
    this.loginService.setLocalObject('change_book', bookingObj);
    this.loginService.setCookie('change_book', JSON.stringify(bookingObj));
    this.router.navigateByUrl('/booking');
  }
  addTracking() {
    //addTrackingTO.bookingid
    //addTrackingTO.mobile
    console.log(this.addTrackingTO)
    var whereString = "";
    this.loading = true;
    if (this.addTrackingTO['bookingid'])
      whereString = ' book_id = ' + this.addTrackingTO['bookingid'];
    if (this.addTrackingTO['searchText']) {
      whereString = " fields like '%" + this.addTrackingTO['searchText'] + "%' ";
    }
    this.http.post(
      this.loginService.urls['commonSelect'],
      {
        tableName: 'book', whereString: whereString
      }, {})
      .subscribe(
        data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          //this.alertService.success('Registration successful', true);
          for (let i in data) {
            if (data[i].fields != '') {
              data[i].fields = data[i].fields.replace(new RegExp('\\n', 'g'), '');
              try { data[i].fields = JSON.parse(data[i].fields); } catch (r) { }
            }
          }
          this.bookList = data;
        },
        error => {
          //this.alertService.error(error);
          this.loading = false;
        });
  }
  selectedBookingObj = { fields: {} };
  viewTracking(bookingObj) {
    this.isBookingNotSelected = false;
    this.selectedBookingObj = bookingObj;
  }

  addLocation() {
    if (this.addLocationTO['addLocationTo']) {
      if (this.selectedBookingObj.fields['locations']) {
        this.selectedBookingObj.fields['locations'].push(this.addLocationTO['addLocationTo']);
      } else {
        this.selectedBookingObj.fields['locations'] = [];
        this.selectedBookingObj.fields['locations'].push(this.addLocationTO['addLocationTo']);
      }
      this.selectedBookingObj.fields['c_loc'] = this.addLocationTO['addLocationTo'];
      this.updateBooking();
    } else {
      alert('Please enter the valid location!');
    }
  }

  updateBooking() {
    console.log(this.saveStatusTO)
    this.loading = true;
    this.http.post(this.loginService.urls['update_booking'], {
      book_id: this.selectedBookingObj['book_id']
      , fields: JSON.stringify(this.selectedBookingObj.fields)
    }, {})
      .subscribe(
        data => {
          if (data == 1) {
            this.addLocationTO['addLocationTo'] = "";
            alert('Saved Successfully!');
          }
        },
        error => {
          //this.alertService.error(error);
          if (error == 1) {
            this.addLocationTO['addLocationTo'] = "";
            alert('Saved Successfully!');
          }
          this.loading = false;
        });
  }

}
