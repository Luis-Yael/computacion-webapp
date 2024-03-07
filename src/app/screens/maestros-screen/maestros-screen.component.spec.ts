import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrosScreenComponent } from './maestros-screen.component';

describe('MaestrosScreenComponent', () => {
  let component: MaestrosScreenComponent;
  let fixture: ComponentFixture<MaestrosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaestrosScreenComponent]
    });
    fixture = TestBed.createComponent(MaestrosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
