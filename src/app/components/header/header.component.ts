import { Component, OnInit } from '@angular/core';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;

  loggedUserId: string;
  loggedUserUserName: string;

  constructor() {}

  ngOnInit(): void {}
}
