import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/index';
declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogin = false;
  isAdmin = true;
  constructor(private loginService: LoginService) {
    setTimeout(() => {
      this.isLogin = loginService.getCookie('userDetails') ? true : false;
      this.isAdmin = loginService.getCookie('isAdmin') == 'true';

      var stickyOffset = $('.nav-stick').offset().top;
      $(window).scroll(function () {
        var sticky = $('.nav-stick'), scroll = $(window).scrollTop();
        if (scroll >= stickyOffset) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
      });
    }, 3000);
  }
  logout() {
    this.loginService.eraseCookie("userDetails");
    this.loginService.eraseCookie("userName");
    this.loginService.eraseCookie("isAdmin");
    window.location.href = "/";
  }

  ngOnInit() {
  }

}
