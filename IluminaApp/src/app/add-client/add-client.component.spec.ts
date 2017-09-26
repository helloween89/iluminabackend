/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { addClientComponent} from './add-client.component';

describe('addClientComponent', () => {
  let component: addClientComponent;
  let fixture: ComponentFixture<addClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(addClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
