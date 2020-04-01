import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpinionFormComponent } from './components/opinions/opinion-form/opinion-form.component';
import { OpinionsComponent } from './components/opinions/opinions.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { TvShowsComponent } from './components/tvShows/TvShows.component';
import { TvShowsService } from './services/tvShows.service';
import { FinishedTvShowsFormComponent } from './components/finished-tv-shows/finished-tv-shows-form/finished-tv-shows-form.component';
import { WishedTvShowsFormComponent } from './components/wished-tv-shows/wished-tv-shows-form/wished-tv-shows-form.component';
import { WatchingTvShowsFormComponent } from './components/watching-tv-shows/watching-tv-shows-form/watching-tv-shows-form.component';
import { LoginComponent } from './components/login/login.component';
import { from } from 'rxjs';
import { ToastComponent } from './components/toast/toast.component';

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
    UserComponent,
    UserFormComponent,
    TvShowsComponent,
    WatchingTvShowsFormComponent,
    WishedTvShowsFormComponent,
    ToastComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TvShowsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
