import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { userResponse } from '../interfaces/userResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

public get currentUserValue(): User {
    return this.currentUserSubject.value;
}
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private token:string;

  forgotPassword(username: string) {
    return this.http.get(environment.ApiUrl + `/${username}/forgot`);
  }
  resetPassword(username: string, password: string){
    return this.http.post(environment.ApiUrl + '/reset', {
      username,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setCurrentUser(user: User) {
    if (user == null) {
      localStorage.removeItem('currentUser');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser') != null) {
      return true;
    }
    return false;
  }



  // login(username: string, password: string) {

  //   return this.http.post(environment.ApiUrl + '/login', { username,password});

  // }

  login(username: string, password: string) {
    return this.http.post<any>(environment.ApiUrl+'/login', { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log(user);
            console.log("---"+user.token);
            this.token=user.token;
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  getToken(){
    return this.token;
  }
logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  register(user: User) {
    return this.http.post(environment.ApiUrl + '/register', user);
  }
}
