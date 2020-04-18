import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundTvShowsComponent } from './found-tv-shows.component';

describe('FoundTvShowsComponent', () => {
  let component: FoundTvShowsComponent;
  let fixture: ComponentFixture<FoundTvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundTvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
