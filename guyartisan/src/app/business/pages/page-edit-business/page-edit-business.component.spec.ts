import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditBusinessComponent } from './page-edit-business.component';

describe('PageEditBusinessComponent', () => {
  let component: PageEditBusinessComponent;
  let fixture: ComponentFixture<PageEditBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEditBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
