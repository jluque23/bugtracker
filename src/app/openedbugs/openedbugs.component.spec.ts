import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedbugsComponent } from './openedbugs.component';

describe('OpenedbugsComponent', () => {
  let component: OpenedbugsComponent;
  let fixture: ComponentFixture<OpenedbugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenedbugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedbugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
