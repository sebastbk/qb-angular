import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


export class Credentials {
  username: string;
  password: string;
}


export class AuthResponse {
  token?: string;
  non_field_errors?: string[];
}


@Injectable()
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;
  username: string;

  redirectUrl: string;

  private loginUrl = 'http://127.0.0.1:8000/login';
  private token: string;

  get httpOptions(): any {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return { headers: new HttpHeaders(headers) };
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: Credentials): Observable<boolean> {
    const url = `${this.loginUrl}/`;
    return this.http.post<boolean>(url, credentials, this.httpOptions).pipe(
      catchError(this.handleError<any>('login')),
      tap((result: AuthResponse) => {
        if ('token' in result) {
          this.isLoggedIn = true;
          this.username = credentials.username;
          this.token = result.token;
        }
      }),
      map((result: AuthResponse) => {
        return 'token' in result;
      }),
    );
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    this.token = '';
    window.location.reload();
  }

  redirectToLogin(url: string, extras?: NavigationExtras) {
    this.redirectUrl = url;
    this.router.navigate(['/login'], extras);
  }

  redirectFromLogin(extras?: NavigationExtras) {
    let redirect = this.redirectUrl ? this.redirectUrl : '/';
    // do not attempt to redirect back to the login page
    if (redirect === '/login') { redirect = '/'; }
    // clear existing redirect on navigate
    this.redirectUrl = '';
    this.router.navigate([redirect], extras);
  }

  redirectToForbidden() {
    this.router.navigate(['/forbidden']);
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
