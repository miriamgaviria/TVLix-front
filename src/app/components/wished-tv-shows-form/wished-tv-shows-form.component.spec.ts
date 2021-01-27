import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishedTvShowsFormComponent } from './wished-tv-shows-form.component';

describe('WishedTvShowsFormComponent', () => {
  let component: WishedTvShowsFormComponent;
  let fixture: ComponentFixture<WishedTvShowsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishedTvShowsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishedTvShowsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
