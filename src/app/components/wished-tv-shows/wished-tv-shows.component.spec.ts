import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishedTvShowsComponent } from './wished-tv-shows.component';

describe('WishedTvShowsComponent', () => {
  let component: WishedTvShowsComponent;
  let fixture: ComponentFixture<WishedTvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishedTvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishedTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
