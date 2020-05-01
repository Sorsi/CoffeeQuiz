import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
//----------------------------- Properties -----------------------------
  readonly rootUrl = 'http://jservice.io/api/';
  randomQuestion = [];

  constructor(private http: HttpClient) { }
//----------------------------- Http Methods -----------------------------
  getrandomQuestion() {
    return this.http.get(this.rootUrl + 'random');
  }
}
