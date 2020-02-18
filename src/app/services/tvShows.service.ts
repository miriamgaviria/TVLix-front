import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { TvShows } from '../models/tvShows.model';
import { TVSHOWS } from '../models/tvShows.json';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor() { }

  getTvShows(): Observable<TvShows[]> {
    return of(TVSHOWS);
  }
}
