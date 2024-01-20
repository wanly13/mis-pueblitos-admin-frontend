import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOficinasComponent } from './add-oficinas.component';

describe('AddOficinasComponent', () => {
  let component: AddOficinasComponent;
  let fixture: ComponentFixture<AddOficinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOficinasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOficinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
