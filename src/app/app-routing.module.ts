import { FinishedTvShowsComponent } from './components/finished-tv-shows/finished-tv-shows.component';
import { FinishedTvShowsFormComponent } from './components/finished-tv-shows/finished-tv-shows-form/finished-tv-shows-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { OpinionsComponent } from './components/opinions/opinions.component';
import { OpinionFormComponent } from './components/opinions/opinion-form/opinion-form.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { TvShowDetailComponent } from './components/tv-show-detail/tv-show-detail.component';
import { WatchingTvShowsComponent } from './components/watching-tv-shows/watching-tv-shows.component';
import { WatchingTvShowsFormComponent } from './components/watching-tv-shows/watching-tv-shows-form/watching-tv-shows-form.component';
import { WishedTvShowsComponent } from './components/wished-tv-shows/wished-tv-shows.component';
import { WishedTvShowsFormComponent } from './components/wished-tv-shows/wished-tv-shows-form/wished-tv-shows-form.component';
import { TvShowsComponent } from './components/tvShows/tvShows.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [  

  {path: 'finishedTvShows', component: FinishedTvShowsComponent},
  {path: 'finishedTvShowsForm', component: FinishedTvShowsFormComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'header', component: HeaderComponent}, 
  {path: 'login', component: LoginComponent},
  {path: 'opinions', component: OpinionsComponent},
  {path: 'opinionForm', component: OpinionFormComponent},
  {path: 'tvShowDetail', component: TvShowDetailComponent},  
  {path: 'user', component: UserComponent},
  {path: 'userForm', component: UserFormComponent},  
  {path: 'watchingTvShows', component: WatchingTvShowsComponent},
  {path: 'watchingTvShowsForm', component: WatchingTvShowsFormComponent},
  {path: 'wishedTvShows', component: WishedTvShowsComponent},
  {path: 'wishedTvShowsForm', component: WishedTvShowsFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
