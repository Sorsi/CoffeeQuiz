import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  question: string;
  answer: string;
  randomQuestionId: number;
  score: number;
  category: string;
  show: boolean;
  categories = [];

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadRandomQuestion();
    this.startTimer();
    this.quizService.seconds = 0;
  }

  loadRandomQuestion(): any {
    this.quizService.getRandomQuestion().subscribe(
      (data: any) => {
        console.log('random question', data)
        this.quizService.randomQuestion = data;
        this.question = this.quizService.randomQuestion[0].question;
        this.answer = this.quizService.randomQuestion[0].answer;
        this.randomQuestionId = this.quizService.randomQuestion[0].id;
        this.score = this.quizService.randomQuestion[0].value;
        this.category = this.quizService.randomQuestion[0].category.title;
        console.log(this.answer)
      }
      )
    }

    loadCategories(): any {
      this.quizService.getCategories().subscribe(
        (data: any) => {
          console.log('categories -------------', data);
          this.categories = data;
        }
      )
    }

    showRightAnswer(): any {
      this.show = !this.show;
    }

    showNextQuestion(): any {
      this.show = false;
      this.loadRandomQuestion();
      this.quizService.seconds = 0;
      this.displayTimeElapsed();
    }

    startTimer() {
      this.quizService.timer = setInterval(() => {
        this.quizService.seconds++;
      }, 1000);
    }

    displayTimeElapsed() {
      return Math.floor(this.quizService.seconds / 3600) + ':' + Math.floor(this.quizService.seconds / 60) + ':' + Math.floor(this.quizService.seconds % 60);
    }

  }
