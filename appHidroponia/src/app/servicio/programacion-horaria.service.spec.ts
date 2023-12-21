import { TestBed } from '@angular/core/testing';

import { ProgramacionHorariaService } from './programacion-horaria.service';

describe('ProgramacionHorariaService', () => {
  let service: ProgramacionHorariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramacionHorariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
