import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }
    userId: any;
    userName: any;
    isAdmin: boolean = false;
    userDetails: any;
    // urls: Object = {
    //     getUserDetails: 'http://localhost/packers/getUserDetails.php',
    //     booking: 'http://localhost/packers/booking.php',
    //     update_booking: 'http://localhost/packers/update_booking.php',
    //     signin: 'http://localhost/packers/login.php',
    //     signup: 'http://localhost/packers/signup.php',
    //     commonSelect: 'http://localhost/packers/getBookingDetails.php',
    //     updateBooking: 'http://localhost/packers/updateBooking.php',
    //     session: 'http://localhost/packers/session.php',
    //     updateUserDetail: 'http://localhost/packers/updateProfile.php',
    //     tracking: 'http://localhost/packers/tracking.php'
    // };
    hostName = '';//'http://localhost';
    urls: Object = {
        getUserDetails: this.hostName + '/packers/getUserDetails.php',
        booking: this.hostName + '/packers/booking.php',
        update_booking: this.hostName + '/packers/update_booking.php',
        signin: this.hostName + '/packers/login.php',
        signup: this.hostName + '/packers/signup.php',
        commonSelect: this.hostName + '/packers/getBookingDetails.php',
        updateBooking: this.hostName + '/packers/updateBooking.php',
        session: this.hostName + '/packers/session.php',
        updateUserDetail: this.hostName + '/packers/updateProfile.php',
        tracking: this.hostName + '/packers/tracking.php',
        enquiryRequestForm: this.hostName + '/packers/enquiryRequestForm.php',
    };
    // urls: Object = {
    //     getUserDetails: 'https://packers-vignesh1001.c9users.io/packers/getUserDetails.php',
    //     booking: 'https://packers-vignesh1001.c9users.io/packers/booking.php',
    //     signin: 'https://packers-vignesh1001.c9users.io/packers/login.php',
    //     signup: 'https://packers-vignesh1001.c9users.io/packers/signup.php',
    //     getBookingDetails: 'https://packers-vignesh1001.c9users.io/packers/getBookingDetails.php',
    //     updateBooking: 'https://packers-vignesh1001.c9users.io/packers/updateBooking.php'
    // };
    loadUserDetails(callBack = undefined) {
        this.userDetails = JSON.parse(this.getCookie('userDetails'));
        if (!this.userDetails)
            return false;
        try {
            this.userDetails['fields'] = JSON.parse(this.userDetails['fields']);
        } catch (e) { }
        this.userName = this.getCookie('userName');
        if (!this.userName) {
            this.userName = this.userDetails['fields'].user_name ? this.userDetails['fields'].user_name : this.userDetails['fields'].username;
        }
        this.userId = this.userDetails['user_id'];
        this.isAdmin = this.userDetails.login_type_id == 1;
        return true;
    }
    localObject = {};
    isChangeBook = false;
    setLocalObject(name, value) {
        this.isChangeBook = name == "change_book";
        this.localObject[name] = value;
    }
    getLocalObject(name) {
        return this.localObject[name];
    }
    setCookie(name, value, days = 1) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
}