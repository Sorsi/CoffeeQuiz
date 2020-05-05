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
  lastkeydown: number = 0;
  categoryTitlesList: string[] = [];
  titleMatches = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  selectCategory() {
    let selectedCategoryClues = [];
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
          selectedCategoryClues.push(this.selectedClue);
        }
        return selectedCategoryClues;
      },
      error => {
        console.log("Something wrong here");
      });
    this.selectedCategoryClues = selectedCategoryClues;
  }

  showRightAnswer(clue): any {
    clue.shown = !clue.shown;
  }

  loadCategories(): any {
    let categoryTitlesList = [];
    this.quizService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        this.categories.forEach(e => {
          categoryTitlesList.push(e.title);
        })
      },
      error => {
        console.log("Something wrong here");
      });
    this.categoryTitlesList = categoryTitlesList;
  }

  getCategoryId($event) {
    let categoryId = (<HTMLInputElement>document.getElementById('categoryId')).value;
    this.titleMatches = [];
    if (categoryId.length > 2) {
      if ($event.timeStamp - this.lastkeydown > 200) {
        this.titleMatches = this.searchFromArray(this.categoryTitlesList, categoryId);
      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

}
