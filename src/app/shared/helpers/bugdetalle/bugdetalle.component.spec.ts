import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugdetalleComponent } from './bugdetalle.component';

describe('BugdetalleComponent', () => {
  let component: BugdetalleComponent;
  let fixture: ComponentFixture<BugdetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugdetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
