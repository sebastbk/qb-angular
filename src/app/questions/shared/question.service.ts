import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Question } from './question.model';

@Injectable()
export class QuestionService {
  private questionsUrl = 'http://127.0.0.1:8000/api/questions';

  constructor(private http: HttpClient) { }

  getQuestions(params= {}): Observable<Question[]> {
    const url = `${this.questionsUrl}/`;
    let httpParams = new HttpParams();
    for (const key of Object.keys(params)) {
      httpParams = httpParams.append(key, params[key]);
    }
    console.log(httpParams);
    return this.http.get<Question[]>(url, {params: httpParams}).pipe(
      catchError(this.handleError('getQuestions', [])),
      map((data: any) => data.results)
    );
  }

  getQuestion(id: number): Observable<Question> {
    const url = `${this.questionsUrl}/${id}/`;
    return this.http.get<Question>(url).pipe(
      catchError(this.handleError<Question>(`getQuestion id=${id}`))
    );
  }

  updateQuestion(question: Question): Observable<Question> {
    const url = `${this.questionsUrl}/${question.id}/`;
    return this.http.patch(url, question).pipe(
      catchError(this.handleError<any>(`updateQuestion id=${question.id}`))
    );
  }

  createQuestion(question: Question): Observable<Question> {
    const url = `${this.questionsUrl}/`;
    return this.http.post<Question>(url, question).pipe(
      catchError(this.handleError<any>('createQuestion'))
    );
  }

  deleteQuestion(question: Question | number): Observable<Question> {
    const id = typeof question === 'number' ? question : question.id;
    const url = `${this.questionsUrl}/${id}/`;

    return this.http.delete<Question>(url).pipe(
      catchError(this.handleError<any>(`deleteQuestion id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any):  Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
