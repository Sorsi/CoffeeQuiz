import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
