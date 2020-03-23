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
import { OpinatorFormComponent } from './components/opinator/opinator-form/opinator-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FinishedTvShowsFormComponent } from './components/finished-tv-shows/finished-tv-shows-form/finished-tv-shows-form.component';
import { WishedTvShowsFormComponent } from './components/wished-tv-shows/wished-tv-shows-form/wished-tv-shows-form.component';
import { WatchingTvShowsFormComponent } from './components/watching-tv-shows/watching-tv-shows-form/watching-tv-shows-form.component';
import { ProfileFormComponent } from './components/profile/profile-form/profile-form.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'tvShows', pathMatch: 'full'},
  {path: 'tvShows', component: TvShowsComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TvShowsComponent,
    FooterComponent,
    OpinatorFormComponent,
    ProfileComponent,
    FinishedTvShowsFormComponent,
    WishedTvShowsFormComponent,
    WatchingTvShowsFormComponent,
    ProfileFormComponent,
    LoginComponent
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
