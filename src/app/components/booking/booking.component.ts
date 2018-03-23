import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService, LoginService } from '../_services/index';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [AlertService, LoginService]
})
export class BookingComponent implements OnInit {
  addBookingTO = {};
  constructor(private router: Router, private http: HttpClient, private loginSerive: LoginService) { }
  loading = false;
  userDetail = {};
  isUpdate = false;
  ngOnInit() {
    this.isUpdate = false;
    if (this.loginSerive.loadUserDetails()) {
      this.userDetail = { fileds: { mobile: 'q' } };
      this.userDetail = JSON.parse(this.loginSerive.getCookie('userDetails'));
      try {
        this.userDetail['fields'] = JSON.parse(this.userDetail['fields']);
      } catch (e) { }
      this.addBookingTO['name'] = this.userDetail['fields'].name;
      this.addBookingTO['mobile'] = this.userDetail['fields'].mobile;
      this.addBookingTO['email'] = this.userDetail['fields'].email;
    }
    var change_book = null;
    try {
      change_book = JSON.parse(this.loginSerive.getCookie('change_book'));
    } catch (e) { }
    console.log('change_book----->>>>', change_book);
    if (change_book) {
      this.addBookingTO['receiver'] = change_book.fields.receiver;
      this.addBookingTO['pickUpdate'] = change_book.fields.pickUpdate;
      this.addBookingTO['pickUpTime'] = change_book.fields.pickUpTime;
      this.addBookingTO['sender'] = change_book.fields.sender;
      this.addBookingTO['fromAddress'] = change_book.fields.fromAddress;
      this.addBookingTO['toAddress'] = change_book.fields.toAddress;
      this.addBookingTO['goodsType'] = change_book.fields.goodsType;

      this.addBookingTO['book_id'] = change_book.book_id;
      this.addBookingTO['status'] = change_book.fields.status;
      this.addBookingTO['locations'] = change_book.fields.locations;
      this.addBookingTO['adminInfo'] = change_book.fields.adminInfo;
      this.addBookingTO['c_loc'] = change_book.fields.c_loc;
      this.isUpdate = true;
    }
    this.loginSerive.setCookie('change_book', null);
  }
  validate() {
    let errMsgList = [];
    if (!this.addBookingTO['name']) {
      errMsgList.push("Please enter the Name");
    } else if (!this.addBookingTO['mobile']) {
      errMsgList.push("Please enter the Mobile No");
    } else if (!this.addBookingTO['receiver']) {
      errMsgList.push("Please enter the Receiver Name");
    } else if (!this.addBookingTO['sender']) {
      errMsgList.push("Please enter the Sender Name");
    } else if (!this.addBookingTO['fromAddress']) {
      errMsgList.push("Please enter the From Address");
    } else if (!this.addBookingTO['toAddress']) {
      errMsgList.push("Please enter the To Address");
    } else if (!this.addBookingTO['pickUpdate']) {
      errMsgList.push("Please enter the PickUp date");
    } else if (!this.addBookingTO['pickUpTime']) {
      errMsgList.push("Please enter the PickUp Time");
    }
    return errMsgList;
  }
  addBooking() {
    console.log(this.addBookingTO);
    if ((this.validate()).length > 0){
      alert('Please enter the mandatory Fields!')
      return;
    }
    this.addBookingTO['status'] = this.loginSerive.isAdmin ? 'Approved' : 'Pending';
    this.addBookingTO['locations'] = [];
    this.addBookingTO['adminInfo'] = {};
    this.addBookingTO['audit'] = {};
    this.addBookingTO['c_loc'] = '-';
    this.loading = true;
    this.http.post(this.loginSerive.urls['booking'], {
      userId: this.userDetail['user_id']
      , fields: JSON.stringify(this.addBookingTO)
    }, {})
      .subscribe(
        (data:any) => {
          //this.alertService.error(error);
          if (data && data.indexOf('Booked Successfully')>-1) {
            alert(data.split("@1")[0]);
            this.router.navigateByUrl('/tracking');
          }else{

          }//'Booked Successfully! Your Booking(Tacking) ID number is '
        },
        (error:any) => {
          //this.alertService.error(error);
          if (error && error.error && error.error.text.indexOf('Booked Successfully')>-1) {
            alert(error.error.text.split("@1")[0]);
            this.router.navigateByUrl('/tracking');
          }else{

          }
          this.loading = false;
        });
  }
  cancelBooking() {
    this.addBookingTO['status'] = 'Cancelled';
    this.updateBooking();
  }
  updateBooking() {
    if ((this.validate()).length > 0)
      return;
    this.loading = true;
    this.http.post(this.loginSerive.urls['update_booking'], {
      book_id: this.addBookingTO['book_id']
      , fields: JSON.stringify(this.addBookingTO)
    }, {})
      .subscribe(
        data => {
          if (data == 1) {
            if(this.addBookingTO['status']=="Canceled")
              alert('Booking Canceled Successfully!');
            else 
              alert('Booked Successfully!');
            this.router.navigateByUrl('/tracking');
          }
        },
        error => {
          if (error == 1) {
            if(this.addBookingTO['status']=="Canceled")
              alert('Booking canceled Successfully!');
            else 
              alert('Booked Successfully!');
            this.router.navigateByUrl('/tracking');
          }
          this.loading = false;
        });
  }
}