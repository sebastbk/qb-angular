import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Question, difficulties, answer_widgets } from '../../models/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'qb-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  @Input() question: Question;
  
  questionForm: FormGroup;
  difficulties = difficulties;
  answer_widgets = answer_widgets;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private questionService: QuestionService,
  ) {
    this.createForm();
  }

  createForm() {
    this.questionForm = this.fb.group({
      text: '',
      answer_widget: 'text',
      answer: '',
      alternate_answer: '',
      difficulty: 1,
      tags: ''
    })
  }

  ngOnInit(): void {
    if(!this.question) { this.getQuestion(); }
  }

  ngOnChanges(): void {
    this.questionForm.disable();
    this.questionForm.get('answer_widget')
      .reset(this.question.answer_widget);
    // wrap in timeout to give the DOM time to update the answer inputs
    setTimeout(() => {
      this.questionForm.reset({
        text: this.question.text,
        answer_widget: this.question.answer_widget,
        answer: this.question.answer,
        alternate_answer: this.question.alternate_answer,
        difficulty: this.question.difficulty,
        tags: this.question.tags.join(' ')
      });
    }, 0);
  }

  onSubmit(): void {
    this.questionForm.disable();
    this.question = this.prepareSaveQuestion();
    let observable = this.question.id ? 
      this.questionService.updateQuestion(this.question) : 
      this.questionService.createQuestion(this.question);
    observable.subscribe(question => {
      // TODO: this method seems to be rather slow to update the url
      this.location.replaceState(`/questions/${question.id}`);
      this.question = question;
    });
  }

  setQuestion(question: Question) {
    this.question = question;
    this.ngOnChanges();
  }
  
  cancel(): void { 
    this.question.id ? this.ngOnChanges() : this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
  
  prepareSaveQuestion(): Question {
    const formModel = this.questionForm.value;
    
    const saveQuestion: Question = {
      id: this.question.id,
      text: formModel.text as string,
      answer_widget: formModel.answer_widget as string,
      answer: formModel.answer as string,
      alternate_answer: formModel.alternate_answer as string,
      difficulty: formModel.difficulty as number,
      tags: formModel.tags.split(/\s/) as string[]
    };
    return saveQuestion;
  }

  getQuestion(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // return a new question obj if the id is 0
    if (id === 0) {
      this.question = new Question();
      this.questionForm.enable();
      return;
    }
    this.questionService.getQuestion(id)
      .subscribe(question => this.setQuestion(question));
  }
}