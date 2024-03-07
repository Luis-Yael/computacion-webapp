import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScreenComponent } from './admin-screen.component';

describe('AdminScreenComponent', () => {
  let component: AdminScreenComponent;
  let fixture: ComponentFixture<AdminScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminScreenComponent]
    });
    fixture = TestBed.createComponent(AdminScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
