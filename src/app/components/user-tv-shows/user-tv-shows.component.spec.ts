import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTvShowsComponent } from './user-tv-shows.component';

describe('UserTvShowsComponent', () => {
  let component: UserTvShowsComponent;
  let fixture: ComponentFixture<UserTvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
