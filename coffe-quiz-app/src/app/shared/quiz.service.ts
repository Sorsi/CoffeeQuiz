import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const params = new HttpParams()
  .set('count', '100');
@Injectable({
  providedIn: 'root'
})

export class QuizService {
//----------------------------- Properties -----------------------------
  readonly rootUrl = 'http://jservice.io/api/';
  randomQuestion = [];
  timer;
  seconds: number;

  constructor(private http: HttpClient) { }
//----------------------------- Http Methods -----------------------------
  getRandomQuestion() {
    return this.http.get(this.rootUrl + 'random');
  }

  getCategories() {
    return this.http.get(`${this.rootUrl}categories?${params.toString()}`);
  }

  getSelectedCategory(selectedCategoryId: number) {
    return this.http.get(`${this.rootUrl}category?id=${selectedCategoryId}`);
  }
}
