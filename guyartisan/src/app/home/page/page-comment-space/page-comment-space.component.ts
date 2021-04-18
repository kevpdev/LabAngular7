import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Local } from 'protractor/built/driverProviders';
import { Subscription } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { Comment } from 'src/app/shared/models/comment';
import { Critere } from 'src/app/shared/models/critere';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-page-comment-space',
  templateUrl: './page-comment-space.component.html',
  styleUrls: ['./page-comment-space.component.scss']
})
export class PageCommentSpaceComponent implements OnInit {
  currentDate: Date;
  currentRate = 0;
  commentForm: FormGroup;
  @Input() business: Business;
  @Input() test: string
  enableCommentForm = false;
  businessSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private homeService: HomeService) {
    this.currentDate = new Date();
   }

  ngOnInit(): void {
    this.initForm();
    console.log(this.business);

  }

  initForm(){
    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required],
      currentDate: [''],
      rate: [''],
      content: [''],
      test: ['']
    })
  }

  onSubmitCommentForm(){
    console.log('ici');
    const name = this.commentForm.get('name').value;
    const currentDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
    const rate = this.currentRate;
    const content = this.commentForm.get('content').value;

    const newComment = new Comment();
    newComment.content = content;
    newComment.date = currentDate;
    newComment.name = name;
    newComment.rate = rate;

    this.homeService.addCommentBusiness(newComment, this.business.id);
    this.businessSubscription = this.homeService.businessSubject.subscribe(data => {
      console.log(data);
      if(data){
        console.log(data);
        this.business = data; 
      }
    });
    this.resetForm();
    this.enableCommentForm = false;

  }

  showCommentForm(){
    this.enableCommentForm = true;
  }

  closeCommentForm(){
    this.enableCommentForm = false;
    this.resetForm();
  }

  resetForm(){
    this.commentForm.reset();
    this.currentRate = 0;
  }


}
