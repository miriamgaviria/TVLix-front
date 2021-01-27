import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchingTvShowsFormComponent } from './watching-tv-shows-form.component';

describe('WatchingTvShowsFormComponent', () => {
  let component: WatchingTvShowsFormComponent;
  let fixture: ComponentFixture<WatchingTvShowsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchingTvShowsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchingTvShowsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
