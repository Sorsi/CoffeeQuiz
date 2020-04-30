import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  readonly rootUrl = 'http://jservice.io/api/'

  constructor(private http: HttpClient) { }

  getrandomQuestion() {
    return this.http.get(this.rootUrl + 'random');
  }
}
