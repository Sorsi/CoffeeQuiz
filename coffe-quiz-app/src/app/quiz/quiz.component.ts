import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import { Clue } from '../models/clue';

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
  answer: string = 'whats your answer';

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
          }
        }
      }
    )
  }

  showNextQuestion(): any {
    this.show = false;
    this.loadRandomQuestion();
  }

  showRightAnswer(): any {
    this.show = !this.show;
  }

  onSubmit(form, answer) {
    this.submitted = true;
    console.log(form.value);
    console.log(answer);
    if (form.value.answer === answer) {
      console.log('yout are realz clever', typeof(answer))
    } else {
      console.log('yout are realz dummmm', typeof(answer))

    }
  }
}
