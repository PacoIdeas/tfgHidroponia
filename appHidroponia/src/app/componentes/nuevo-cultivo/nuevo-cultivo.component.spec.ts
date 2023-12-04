import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCultivoComponent } from './nuevo-cultivo.component';

describe('NuevoCultivoComponent', () => {
  let component: NuevoCultivoComponent;
  let fixture: ComponentFixture<NuevoCultivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoCultivoComponent]
    });
    fixture = TestBed.createComponent(NuevoCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
