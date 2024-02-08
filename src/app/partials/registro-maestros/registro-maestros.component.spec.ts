import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMaestrosComponent } from './registro-maestros.component';

describe('RegistroMaestrosComponent', () => {
  let component: RegistroMaestrosComponent;
  let fixture: ComponentFixture<RegistroMaestrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroMaestrosComponent]
    });
    fixture = TestBed.createComponent(RegistroMaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
