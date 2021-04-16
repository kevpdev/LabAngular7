import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommentSpaceComponent } from './page-comment-space.component';

describe('PageCommentSpaceComponent', () => {
  let component: PageCommentSpaceComponent;
  let fixture: ComponentFixture<PageCommentSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCommentSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCommentSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
