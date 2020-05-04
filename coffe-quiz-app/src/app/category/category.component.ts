import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Category } from '../models/category';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  selectedCategory: Category;
  selectedCategoryQuestions = [];
  categories = [];
  show: boolean;
  rightAnswer: string

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
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

    loadCategories(): any {
      this.quizService.getCategories().subscribe(
        (data: any) => {
          this.categories = data;
        }
      )
    }
}
