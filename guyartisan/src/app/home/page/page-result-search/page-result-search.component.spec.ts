import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageResultSearchComponent } from './page-result-search.component';

describe('PageResultSearchComponent', () => {
  let component: PageResultSearchComponent;
  let fixture: ComponentFixture<PageResultSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageResultSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageResultSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
