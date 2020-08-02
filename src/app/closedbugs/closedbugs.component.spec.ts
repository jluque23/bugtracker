import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedbugsComponent } from './closedbugs.component';

describe('ClosedbugsComponent', () => {
  let component: ClosedbugsComponent;
  let fixture: ComponentFixture<ClosedbugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedbugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedbugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
