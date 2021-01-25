import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBusinessComponent } from './page-business.component';

describe('PageBusinessComponent', () => {
  let component: PageBusinessComponent;
  let fixture: ComponentFixture<PageBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
