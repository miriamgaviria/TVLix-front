import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchingTvShowsComponent } from './watching-tv-shows.component';

describe('WatchingTvShowsComponent', () => {
  let component: WatchingTvShowsComponent;
  let fixture: ComponentFixture<WatchingTvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchingTvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchingTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
