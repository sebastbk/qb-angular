import { Component, OnInit } from '@angular/core';

import { Post }            from './post';
import { PostService }     from './post.service';
import { Question }        from './question';
import { QuestionService } from './question.service';
import { Set }             from './set';
import { SetService }      from './set.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  recentPosts: Post[];
  topFiveQuestions: Question[];
  topTenSets: Set[];

  constructor(
    private postService: PostService,
    private questionService: QuestionService,
    private setService: SetService
  ) { }

  getPosts() {
    this.postService.getPosts()
      .then(posts => this.recentPosts = posts.slice(0, 5));
  }

  getQuestions() {
    this.questionService.getQuestions()
      .then(questions => this.topFiveQuestions = questions.slice(0, 5));
  }

  getSets() {
    this.setService.getSets()
      .then(sets => this.topTenSets = sets.slice(0, 10));
  }

  ngOnInit() {
    this.getPosts();
    this.getQuestions();
    this.getSets();
  }
}