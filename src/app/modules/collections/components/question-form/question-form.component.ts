import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Question, difficulties, answer_widgets } from '../../models/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'qb-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnChanges {
  @Input() question: Question;

  questionForm: FormGroup;
  difficulties = difficulties;
  answer_widgets = answer_widgets;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService) {

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

  ngOnChanges() {
    this.questionForm.reset({
      text: this.question.text,
      answer_widget: this.question.answer_widget,
      answer: this.question.answer,
      alternate_answer: this.question.alternate_answer,
      difficulty: this.question.difficulty,
      tags: this.question.tags.join(' ')
    })
  }

  onSubmit() {
    this.question = this.prepareSaveQuestion();
    this.questionService.update(this.question)
      .catch(this.handleErrors)
    this.ngOnChanges();
  }

  handleErrors(error) {
    console.log(error);
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

  revert() { this.ngOnChanges(); }
}
