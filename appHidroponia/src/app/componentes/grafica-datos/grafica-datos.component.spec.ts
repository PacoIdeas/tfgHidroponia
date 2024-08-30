import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaDatosComponent } from './grafica-datos.component';

describe('GraficaDatosComponent', () => {
  let component: GraficaDatosComponent;
  let fixture: ComponentFixture<GraficaDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaDatosComponent]
    });
    fixture = TestBed.createComponent(GraficaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
