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
  show: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getrandomQuestion().subscribe(
      (data: any) => {
        console.log('random question', data)
        this.quizService.randomQuestion = data;
        console.log(this.quizService.randomQuestion)
        this.question = this.quizService.randomQuestion[0].question;
        this.answer = this.quizService.randomQuestion[0].answer;
        this.randomQuestionId = this.quizService.randomQuestion[0].id;
        this.score = this.quizService.randomQuestion[0].value;
        this.category = this.quizService.randomQuestion[0].category.title;
        console.log(this.answer)
      }
    )
  }

  showRightAnswer(): any {
    this.show = !this.show;
  }

}
