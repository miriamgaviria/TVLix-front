import { TvShowsService } from './../../services/tvShows.service';
import { TvShows } from '../../models/tvShows.model';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvShowsComponent implements OnInit {

  title: string = 'Series para la home';

  tvShowsForHome: TvShows [];

  constructor(private tvShowsService: TvShowsService) { }

  ngOnInit(): void {
    this.tvShowsService.getTvShows().subscribe(
      tvShowsForHome => this.tvShowsForHome = tvShowsForHome
    );
  }

}
