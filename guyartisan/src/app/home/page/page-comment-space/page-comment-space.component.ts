import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Local } from 'protractor/built/driverProviders';
import { Business } from 'src/app/shared/models/business';
import { Comment } from 'src/app/shared/models/comment';
import { Critere } from 'src/app/shared/models/critere';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-page-comment-space',
  templateUrl: './page-comment-space.component.html',
  styleUrls: ['./page-comment-space.component.scss']
})
export class PageCommentSpaceComponent implements OnInit, OnChanges {
  currentDate: Date;
  currentRate = 0;
  commentForm: FormGroup;
  @Input() business: Business;
  @Input() test: string

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private homeService: HomeService) {
    this.currentDate = new Date();
   }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes.business){
      console.log(changes.business);
    }
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
    const name = this.commentForm.get('name').value;
    const currentDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');
    const rate = this.currentRate;
    const content = this.commentForm.get('content').value;

    const newComment = new Comment();
    newComment.content = content;
    newComment.date = currentDate;
    newComment.name = name;
    newComment.rate = rate;
    
    console.log(name, currentDate, rate, content);

    this.homeService.addCommenttoBusiness(newComment, this.business.id);


  }



}
