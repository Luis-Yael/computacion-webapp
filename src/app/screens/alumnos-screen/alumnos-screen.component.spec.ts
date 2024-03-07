import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosScreenComponent } from './alumnos-screen.component';

describe('AlumnosScreenComponent', () => {
  let component: AlumnosScreenComponent;
  let fixture: ComponentFixture<AlumnosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnosScreenComponent]
    });
    fixture = TestBed.createComponent(AlumnosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
