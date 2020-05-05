import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import { Clue } from '../models/clue';
import { NgForm, FormControl } from '@angular/forms';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  category: string;
  show: boolean = false;
  clue: Clue;
  submitted = false;
  answerModel = {
    answer: ''
  }
  valid: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadRandomQuestion();
  }

  loadRandomQuestion(): any {
    this.quizService.getRandomQuestion().subscribe(
      (data: any) => {
        this.clue = {
          id: data[0].id,
          answer: data[0].answer,
          question: data[0].question,
          value: data[0].value,
          categoryId: data[0].category_id,
          category: {
            id: data[0].category.id,
            title: data[0].category.title,
            cluesCount: data[0].category.clues_count
          },
          shown: false,
        }
      },
      error => {
        console.log("Something wrong here");
      });
  }

  showNextQuestion(): any {
    this.answerModel.answer = null;
    this.show = false;
    this.loadRandomQuestion();
  }

  showRightAnswer(): any {
    this.show = !this.show;
  }

  validate(form: NgForm, answer) {
    this.submitted = true;
    let userInput = form.value.answer.toLowerCase().split(' ').join('').replace(/['"]+/g, '');
    let realAnswer = answer.toLowerCase().split(' ').join('').replace(/['"]+/g, '');
    if (userInput === realAnswer) {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  getSeconds(secondsForm) {
    let s = secondsForm.value.seconds * 1000;
    setTimeout(() => {
      this.show = true;
    }, s);
  }
}
