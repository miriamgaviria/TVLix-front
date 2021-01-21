import { Component, OnInit } from '@angular/core';

import Texts from '../../../assets/texts.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  texts: any = Texts;

  loggedUserId: string;
  loggedUserUserName: string;

  constructor() { }

  ngOnInit(): void {
    this.loggedUserId = localStorage.getItem('loggedUserId');
    this.loggedUserUserName = localStorage.getItem('loggedUserUserName');
    console.log('this.loggedUserId', this.loggedUserUserName);
    localStorage.removeItem('loggedUserId');
    localStorage.removeItem('loggedUserUserName');
  }
}
