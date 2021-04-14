import { Component, OnInit } from '@angular/core';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;

  public author: any = {name: 'TV-LIX', company: 'Gaviros Company S.A.'};

  constructor() { }

  ngOnInit(): void {
  }

}
