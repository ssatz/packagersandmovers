import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/index';
declare var $:any;
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(loginService:LoginService) { }

  ngOnInit() {
    setTimeout(()=>{
      $('[data-toggle="popover"]').popover({html:true,trigger:'focus'})
    },3000);
  }

}
