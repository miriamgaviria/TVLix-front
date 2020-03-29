import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinatorComponent } from './opinions.component';

describe('OpinatorComponent', () => {
  let component: OpinatorComponent;
  let fixture: ComponentFixture<OpinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
