import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugexterminatorComponent } from './bugexterminator.component';

describe('BugexterminatorComponent', () => {
  let component: BugexterminatorComponent;
  let fixture: ComponentFixture<BugexterminatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugexterminatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugexterminatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
