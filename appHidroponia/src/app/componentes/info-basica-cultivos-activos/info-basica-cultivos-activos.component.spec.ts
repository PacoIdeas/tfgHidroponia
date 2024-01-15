import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBasicaCultivosActivosComponent } from './info-basica-cultivos-activos.component';

describe('InfoBasicaCultivosActivosComponent', () => {
  let component: InfoBasicaCultivosActivosComponent;
  let fixture: ComponentFixture<InfoBasicaCultivosActivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoBasicaCultivosActivosComponent]
    });
    fixture = TestBed.createComponent(InfoBasicaCultivosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
