import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TvShowsComponent } from './components/tvShows/TvShows.component';
import { TvShowsService } from './services/tvShows.service';

const routes: Routes = [
  {path: '', redirectTo: 'tvShows', pathMatch: 'full'},
  {path: 'tvShows', component: TvShowsComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TvShowsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TvShowsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
