import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPoderesComponent } from './edit-poderes.component';

describe('EditPoderesComponent', () => {
  let component: EditPoderesComponent;
  let fixture: ComponentFixture<EditPoderesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPoderesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPoderesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
