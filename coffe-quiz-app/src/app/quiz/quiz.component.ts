import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import { Category } from '../models/category';
import { Clue } from '../models/clue';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  category: string;
  show: boolean;
  categories = [];
  selectedCategory: Category;
  clue: Clue;
  selectedCategoryQuestions = [];
  rightAnswer: string;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadRandomQuestion();
    this.loadCategories();
  }

  selectCategory() {
    this.quizService.getSelectedCategory(this.selectedCategory.id).subscribe(
      (data: any) => {
        console.log(data);
        this.selectedCategoryQuestions = data.clues;
      }
    )
  }

  loadRandomQuestion(): any {
    this.quizService.getRandomQuestion().subscribe(
      (data: any) => {
        console.log('random question', data)
        this.clue = {
          id: data[0].id,
          answer: data[0].anser,
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

  loadCategories(): any {
    this.quizService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      }
    )
  }

  showRightAnswer(questId: number): any {
    this.show = !this.show;
    this.selectedCategoryQuestions.forEach(e => {
      console.log(e);
      if (e.id === questId) {
        console.log('riight answer rrrrrrrr', e.answer)
        this.rightAnswer = e.answer;
      }
    });
  }

  showNextQuestion(): any {
    this.show = false;
    this.loadRandomQuestion();
  }

}
