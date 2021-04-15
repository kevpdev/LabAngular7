import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDetailBusinessComponent } from './page-detail-business.component';

describe('PageDetailBusinessComponent', () => {
  let component: PageDetailBusinessComponent;
  let fixture: ComponentFixture<PageDetailBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDetailBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDetailBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
