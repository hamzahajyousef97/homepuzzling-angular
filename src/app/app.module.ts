import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HighlightDirective } from './directives/highlight.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { FileInputAccessorModule } from "file-input-accessor";
import { baseURL } from './shared/baseurl';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QuizService } from './services/quiz.service';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizesComponent } from './quizes/quizes.component';
import { FeedbackService } from './services/feedback.service';
import { AdsComponent } from './ads/ads.component';
import { YouKnowComponent } from './you-know/you-know.component';
import { InformationsComponent } from './informations/informations.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HighlightDirective,
    DashboardComponent,
    PageNotFoundComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    QuizComponent,
    QuizesComponent,
    AdsComponent,
    YouKnowComponent,
    InformationsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSnackBarModule,
    HttpClientModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    AngularFileUploaderModule,
    FileInputAccessorModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    ProcessHTTPMsgService,
    QuizService,
    FeedbackService,
    { provide: 'BaseURL', useValue: baseURL },
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
