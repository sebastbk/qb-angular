import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Question } from './question.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class QuestionService {
  private questionsUrl = 'api/questions';

  constructor(private http: HttpClient) { }
  
  searchQuestions(query: string): Observable<Question[]> {
    let tags = query ? query.split(/\s/).join(')|(') : '';
    return this.http.get<Question[]>(`${this.questionsUrl}?tags=(${tags})`).pipe(
      catchError(this.handleError('searchQuestions', []))
    )
  }

  getCollectionQuestions(id: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionsUrl}?collections=${id}`).pipe(
      catchError(this.handleError('getCollectionQuestions', []))
    )
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl).pipe(
      catchError(this.handleError('getQuestions', []))
    );
  }
  
  getQuestion(id: number): Observable<Question> {
    const url = `${this.questionsUrl}/${id}`;
    return this.http.get<Question>(url).pipe(
      catchError(this.handleError<Question>(`getQuestion id=${id}`))
    );
  }
  
  updateQuestion(question: Question): Observable<Question> {
    return this.http.put(this.questionsUrl, question, httpOptions).pipe(
      catchError(this.handleError<any>('updateQuestion'))
    )
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question, httpOptions).pipe(
      catchError(this.handleError<any>('createQuestion'))
    )
  }

  deleteQuestion(question: Question | number): Observable<Question> {
    const id = typeof question === 'number' ? question : question.id;
    const url = `${this.questionsUrl}/${id}`;

    return this.http.delete<Question>(url, httpOptions).pipe(
      catchError(this.handleError<any>('deleteQuestion'))
    )
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
    }
  }
}