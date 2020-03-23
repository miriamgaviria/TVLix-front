import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedTvShowsComponent } from './finished-tv-shows.component';

describe('FinishedTvShowsComponent', () => {
  let component: FinishedTvShowsComponent;
  let fixture: ComponentFixture<FinishedTvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedTvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
