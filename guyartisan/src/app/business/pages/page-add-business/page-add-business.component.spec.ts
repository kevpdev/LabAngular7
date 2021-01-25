import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddBusinessComponent } from './page-add-business.component';

describe('PageAddBusinessComponent', () => {
  let component: PageAddBusinessComponent;
  let fixture: ComponentFixture<PageAddBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAddBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
