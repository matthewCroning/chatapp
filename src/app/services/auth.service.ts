import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

export interface LoginData {
  username: string,
  password: string,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username: string;
  private token: string;

  constructor(private http: HttpClient) {}

  private saveToken(token) {
    localStorage.setItem('auth', JSON.stringify(token));
    return token;
  }

  private parseJwt (token) {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');

      return JSON.parse(window.atob(base64));
    }

    return {};
  }

  private getToken(): string {
    if (this.token) return this.token;

    if (this.isAuthenticated()) {
      return this.token = JSON.parse(localStorage.getItem('auth')).token;
    }

    return '';
  }


  public register(user: User): Observable<any> {
    return this.http.post('/api/v1/users/signup', user);
  }

  public login(loginData: LoginData): Observable<any> {

    return this.http.post('/api/v1/users/signin', loginData).pipe(map(token => this.saveToken(token)));   
  
  }

  public isAuthenticated(): boolean {
    // Check if token is not expired
    return !!localStorage.getItem('auth');
  }

  public logout(): Observable<any> {
    console.log("logging out");
    localStorage.removeItem('auth');
    this.token = '';
    this.username = '';

    return new Observable(observer => {
      if (!!localStorage.getItem('auth')) {
        observer.error(new Error("Token not removed"));
      } else {
        observer.next();
      }
    });
  }

  public getUsername(): string {
    if (this.username) return this.username;

    return this.username = this.parseJwt(this.getToken()).username;
  }

  public getAuthToken(): any {
    const auth = localStorage.getItem('auth');

    return auth ? `Bearer ${JSON.parse(auth).token}` : '';
  }

}
  