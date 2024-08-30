import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAtmosfericosComponent } from './datos-atmosfericos.component';

describe('DatosAtmosfericosComponent', () => {
  let component: DatosAtmosfericosComponent;
  let fixture: ComponentFixture<DatosAtmosfericosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosAtmosfericosComponent]
    });
    fixture = TestBed.createComponent(DatosAtmosfericosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
