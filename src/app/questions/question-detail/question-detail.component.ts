import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DialogService } from '@qb/core/dialog.service';
import { AuthService } from '@qb/auth/shared/auth.service';

import { Question, difficulties, answer_widgets } from '../shared/question.model';
import { QuestionService } from '../shared/question.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'qb-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: [ './question-detail.component.scss' ]
})
export class QuestionDetailComponent implements OnInit, OnChanges {
  question: Question = new Question();

  get isOwner() { return this.authService.isAdmin || this.question.created_by === this.authService.username; }

  questionForm: FormGroup;
  difficulties = difficulties;
  answer_widgets = answer_widgets;

  get text() { return this.questionForm.get('text'); }

  get answerWidget() { return this.questionForm.get('answer_widget'); }

  get answer() { return this.questionForm.get('answer'); }

  get altAnswer() { return this.questionForm.get('alt_answer'); }

  get tags() { return this.questionForm.get('tags'); }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: DialogService,
    private questionService: QuestionService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { question: Question }) => {
        if (data.question) { this.setQuestion(data.question); }
      });
  }

  ngOnChanges() {
    this.questionForm.disable();
    this.questionForm.get('answer_widget')
      .reset(this.question.answer_widget);
    // wrap in timeout to give the DOM time to update the answer input widgets
    setTimeout(() => {
      this.questionForm.reset({
        text: this.question.text,
        answer_widget: this.question.answer_widget,
        answer: this.question.answer,
        alt_answer: this.question.alt_answer,
        difficulty: this.question.difficulty,
        tags: this.question.tags.join(' ')
      });
    }, 0);
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (this.questionForm.pristine) { return true; }
    return this.dialogService.confirm(`Discard ${this.question.id ? 'changes' : 'new question'}?`);
  }

  cancel() {
    this.question.id ? this.ngOnChanges() : this.goBack();
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.questionForm.disable();
    const question = this.prepareSaveQuestion();
    question.id
      ? this.updateQuestion(question)
      : this.createQuestion(question);
  }

  onAnswerWidgetChange() {
    this.answer.setValue('');
    this.altAnswer.setValue('');
  }

  onTagsKeyPress(event: any) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/[\w ]/g.test(inputChar)) {
      event.preventDefault();
    }
  }

  onTagsBlur() {
    const tags = this.tags.value
      .trim()
      .replace(/\s+/g, ' ') // replace all whitespace with spaces
      .replace(/[^\w ]/g, '') // strip non word characters (except spaces)
      .toLowerCase();
    this.tags.setValue(tags);
  }

  setQuestion(question: Question) {
    this.question = question;
    this.ngOnChanges();
  }

  private updateQuestion(question: Question) {
    this.questionService.updateQuestion(question)
      .subscribe(q => this.setQuestion(q));
  }

  private createQuestion(question: Question) {
    this.questionService.createQuestion(question)
      .subscribe(q => {
        this.setQuestion(q);
        this.location.replaceState(`/questions/${q.id}`);
      });
  }

  private createForm() {
    this.questionForm = this.fb.group({
      text: ['', Validators.required],
      answer_widget: ['text', Validators.required],
      answer: ['', Validators.required],
      alt_answer: '',
      difficulty: [1, Validators.required],
      tags: ['', [
        Validators.required,
        Validators.pattern('\\s*\\w{3,30}(\\s+\\w{3,30}){0,9}\\s*')
      ]]
    });
  }

  private prepareSaveQuestion(): Question {
    const formModel = this.questionForm.value;

    // added server defined fields for mock service
    // TODO: replace 'admin' with a user service
    const modified_on = (new Date()).toJSON();
    const saveQuestion: Question = {
      id: this.question.id,
      // mock
      created_by: this.question.created_by || this.authService.username,
      created_on: this.question.created_on || modified_on,
      modified_on: modified_on,
      avg_rating: this.question.avg_rating || 0,
      rating: this.question.rating || 0,
      favorite: this.question.favorite || false,
      collections: this.question.collections || [],
      // end mock
      text: formModel.text as string,
      answer_widget: formModel.answer_widget as string,
      answer: formModel.answer as string,
      alt_answer: formModel.alt_answer as string,
      difficulty: formModel.difficulty as number,
      tags: formModel.tags.trim().split(/\s+/) as string[]
    };
    return saveQuestion;
  }
}
