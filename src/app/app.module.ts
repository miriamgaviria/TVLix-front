import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FinishedTvShowsFormComponent } from './components/finished-tv-shows-form/finished-tv-shows-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { OpinionFormComponent } from './components/opinions/opinion-form/opinion-form.component';
import { OpinionsComponent } from './components/opinions/opinions.component';
import { ToastComponent } from './components/toast/toast.component';
import { TvShowsComponent } from './components/tvShows/TvShows.component';
import { TvShowDetailComponent } from './components/tv-show-detail/tv-show-detail.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { WishedTvShowsFormComponent } from './components/wished-tv-shows-form/wished-tv-shows-form.component';
import { WatchingTvShowsFormComponent } from './components/watching-tv-shows-form/watching-tv-shows-form.component';

import { from } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

import { OpinionService } from './services/opinion.service';
import { LoginService } from './services/login.service';
import { TvShowsService } from './services/tvShows.service';
import { UserService } from './services/user.service';
import { FoundTvShowsComponent } from './components/found-tv-shows/found-tv-shows.component';

const routes: Routes = [
  {path: '', redirectTo: 'tvShows', pathMatch: 'full'},
  {path: 'tvShows', component: TvShowsComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    FinishedTvShowsFormComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    OpinionFormComponent,
    OpinionsComponent,
    ToastComponent,
    TvShowsComponent,
    TvShowDetailComponent,
    UserComponent,
    UserFormComponent,
    WatchingTvShowsFormComponent,
    WishedTvShowsFormComponent,
    FoundTvShowsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
  providers: [
    LoginService,
    OpinionService,
    TvShowsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
