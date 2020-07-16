import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { QuizesComponent } from '../quizes/quizes.component';
import { QuizComponent } from '../quiz/quiz.component';
import { ContactComponent } from '../contact/contact.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { YouKnowComponent } from '../you-know/you-know.component';
import { InformationsComponent } from '../informations/informations.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'contact', component: ContactComponent},
    // { path: 'quizes', component: QuizesComponent},
    { path: 'doYouKnow', component: YouKnowComponent},
    { path: 'informations/:id', component: InformationsComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent},
    { path: '', component: HomeComponent},
    { path: 'general-culture', component: QuizesComponent, data: {quizType: 'culture'}},
    { path: 'countries', component: QuizesComponent, data: {quizType: 'countries'}},
    // { path: 'sports', component: QuizesComponent, data: {quizType: 'sports'}},
    // { path: 'islamic', component: QuizesComponent, data: {quizType: 'islamic'}},
    // { path: 'historic', component: QuizesComponent, data: {quizType: 'historic'}},
    // { path: 'geographic', component: QuizesComponent, data: {quizType: 'geographic'}},
    { path: 'quiz/:name', component: QuizComponent},
    { path: '**', redirectTo: 'general-culture', pathMatch: 'full' }
];