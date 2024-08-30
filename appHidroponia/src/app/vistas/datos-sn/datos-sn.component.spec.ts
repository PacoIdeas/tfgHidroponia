import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSNComponent } from './datos-sn.component';

describe('DatosSNComponent', () => {
  let component: DatosSNComponent;
  let fixture: ComponentFixture<DatosSNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosSNComponent]
    });
    fixture = TestBed.createComponent(DatosSNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
