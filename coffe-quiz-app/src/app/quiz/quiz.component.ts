import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getrandomQuestion().subscribe(
      (data: any) => {
        console.log('random question', data)
      }
    )
  }

}
