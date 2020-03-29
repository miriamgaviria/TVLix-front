import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinatorFormComponent } from './opinator-form.component';

describe('OpinatorFormComponent', () => {
  let component: OpinatorFormComponent;
  let fixture: ComponentFixture<OpinatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
