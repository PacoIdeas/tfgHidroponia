import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCultivoComponent } from './add-edit-cultivo.component';

describe('AddEditCultivoComponent', () => {
  let component: AddEditCultivoComponent;
  let fixture: ComponentFixture<AddEditCultivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCultivoComponent]
    });
    fixture = TestBed.createComponent(AddEditCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
