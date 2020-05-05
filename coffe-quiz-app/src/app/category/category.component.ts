import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Category } from '../models/category';
import { Clue } from '../models/clue';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  selectedCategory: Category;
  selectedClues = [];
  selectedCategoryClues = [];
  categories = [];
  show: boolean;
  rightAnswer: string
  selectedClue: Clue;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  selectCategory() {
    this.quizService.getSelectedCategory(this.selectedCategory.id).subscribe(
      (data: any) => {
        this.selectedClues = data.clues;
        for (let i = 0; i < data.clues.length; i++) {
          this.selectedClue = {
            id: data.clues[i].id,
            answer: data.clues[i].answer,
            question: data.clues[i].question,
            value: data.clues[i].value,
            categoryId: data.id,
            category: {
              id: data.id,
              title: data.title,
              cluesCount: data.clues_count,
            },
            shown: false,
          }
          this.selectedCategoryClues.push(this.selectedClue);
        }
        return this.selectedCategoryClues;
      }
    )
  }

  showRightAnswer(clue): any {
    clue.shown = !clue.shown;
  }

  loadCategories(): any {
    this.quizService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      }
    )
  }
}
