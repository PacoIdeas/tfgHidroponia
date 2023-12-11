import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivosPredeterminadosComponent } from './cultivos-predeterminados.component';

describe('CultivosPredeterminadosComponent', () => {
  let component: CultivosPredeterminadosComponent;
  let fixture: ComponentFixture<CultivosPredeterminadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CultivosPredeterminadosComponent]
    });
    fixture = TestBed.createComponent(CultivosPredeterminadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
