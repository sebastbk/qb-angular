import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Question, difficulties, answer_widgets } from '../shared/question.model';
import { QuestionService } from '../shared/question.service';

@Component({
  selector: 'qb-question-detail',
  templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit, OnChanges {
  question: Question;

  questionForm: FormGroup;
  difficulties = difficulties;
  answer_widgets = answer_widgets;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private questionService: QuestionService,
  ) {
    this.question = new Question();
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
    });
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { question: Question }) => {
        if (data.question) { this.setQuestion(data.question); }
      });
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
    this.question.id ?
      this.questionService.updateQuestion(this.question) :
      this.questionService.createQuestion(this.question)
        .subscribe(question => {
          console.log(question);
          // TODO: this method seems to be rather slow to update the url
          this.location.replaceState(`/questions/${question.id}`);
          this.setQuestion(question);
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

    // added server defined fields for mock service
    // TODO: replace 'admin' with a user service
    const saveQuestion: Question = {
      id: this.question.id,
      // mock
      created_by: this.question.created_by || 'admin',
      created_on: this.question.created_on || new Date(),
      modified_on: new Date(),
      collections: this.question.collections || [],
      // end mock
      text: formModel.text as string,
      answer_widget: formModel.answer_widget as string,
      answer: formModel.answer as string,
      alternate_answer: formModel.alternate_answer as string,
      difficulty: formModel.difficulty as number,
      tags: formModel.tags.trim().replace(/\s+/g, ' ').split(/\s/) as string[]
    };
    return saveQuestion;
  }
}
