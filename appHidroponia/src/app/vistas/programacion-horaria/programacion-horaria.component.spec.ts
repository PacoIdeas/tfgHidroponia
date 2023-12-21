import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionHorariaComponent } from './programacion-horaria.component';

describe('ProgramacionHorariaComponent', () => {
  let component: ProgramacionHorariaComponent;
  let fixture: ComponentFixture<ProgramacionHorariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramacionHorariaComponent]
    });
    fixture = TestBed.createComponent(ProgramacionHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
