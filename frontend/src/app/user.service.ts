import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './course';
import { Site } from './site';
import { User } from './user';
import { Article } from './article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userNumber: number;
  userId: string;

  constructor(private http: HttpClient) {}

  authorized(): Promise<boolean> {
    return this.http
      .get<User>('/api/auth/')
      .toPromise()
      .then(
        user => {
          this.userId = user.userId;
          this.userNumber = user.id;
          return true;
        },
        error => {
          return false;
        }
      );
  }

  signIn(userId: string, password: string): Promise<boolean> {
    return this.http
      .post<User>('/api/sign_in/', {
        userId: userId,
        password: password
      })
      .toPromise()
      .then(
        user => {
          this.userId = user.userId;
          this.userNumber = user.id;
          return true;
        },
        error => {
          return false;
        }
      );
  }

  signOut(): Promise<any> {
    this.userNumber = -1;
    this.userId = '';
    return this.http.get<any>('/api/sign_out/').toPromise();
  }

  signUp(userId: string, password: string): Promise<boolean> {
    return this.http
      .post<User>('/api/sign_up/', {
        userId: userId,
        password: password
      })
      .toPromise()
      .then(
        user => {
          this.userId = user.userId;
          this.userNumber = user.id;
          return true;
        },
        error => {
          return false;
        }
      );
  }

  getCourses(): Observable<Course[]> {
    let url = '/api/user/course/';
    return this.http.get<Course[]>(url);
  }

  addCourses(courses: Course[]): Observable<any> {
    let url = '/api/user/course/';
    return this.http.post<any>(url, courses);
  }

  addSiteByCourseId(course: Course, site: Site): Observable<any> {
    let url = '/api/user/course/' + course.id + '/site/';
    return this.http.post<any>(url, site);
  }

  getNewsfeed(): Observable<Article[]> {
    let url = '/api/user/newsfeed/';
    return this.http.get<Article[]>(url);
  }

  updateArticle(article: Article): Observable<any> {
    let url = '/api/user/article/' + article.id + '/';
    return this.http.put<any>(url, article);
  }

  getUserNumber(): number {
    return this.userNumber;
  }

  getUserId(): string {
    return this.userId;
  }
}
