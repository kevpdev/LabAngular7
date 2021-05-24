import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConfirmSendResetPasswordComponent } from './page-confirm-send-reset-password.component';

describe('PageConfirmSendResetPasswordComponent', () => {
  let component: PageConfirmSendResetPasswordComponent;
  let fixture: ComponentFixture<PageConfirmSendResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageConfirmSendResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageConfirmSendResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
