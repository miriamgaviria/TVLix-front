import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedTvShowsFormComponent } from './finished-tv-shows-form.component';

describe('FinishedTvShowsFormComponent', () => {
  let component: FinishedTvShowsFormComponent;
  let fixture: ComponentFixture<FinishedTvShowsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedTvShowsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedTvShowsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
