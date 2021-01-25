import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormBusinessComponent } from './page-form-business.component';

describe('PageFormBusinessComponent', () => {
  let component: PageFormBusinessComponent;
  let fixture: ComponentFixture<PageFormBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFormBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFormBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
