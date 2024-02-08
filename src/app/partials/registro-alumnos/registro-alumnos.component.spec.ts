import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlumnosComponent } from './registro-alumnos.component';

describe('RegistroAlumnosComponent', () => {
  let component: RegistroAlumnosComponent;
  let fixture: ComponentFixture<RegistroAlumnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroAlumnosComponent]
    });
    fixture = TestBed.createComponent(RegistroAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
