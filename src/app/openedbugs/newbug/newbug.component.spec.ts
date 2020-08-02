import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbugComponent } from './newbug.component';

describe('NewbugComponent', () => {
  let component: NewbugComponent;
  let fixture: ComponentFixture<NewbugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
