import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './category/category.component';


const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
