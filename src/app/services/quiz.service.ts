import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { catchError, map } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Quiz } from '../models/quiz';
import { Question } from '../models/question';
import { Option } from '../models/option';
import { youKnow } from '../shared/youKnow';
import { Information } from '../shared/information';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getQuizes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(baseURL + 'quizes')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getQuiz(link: string): Observable<Quiz> {
    return this.http.get<Quiz>(baseURL + 'quizes/' + link)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getQuestions(link: string): Observable<Question[]> {
    return this.http.get<Question[]>(baseURL + 'quizes/' + link + '/questions')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getQuestion(link: string, _id: string): Observable<Question> {
    return this.http.get<Question>(baseURL + 'quizes/' + link + '/questions/' + _id)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getOptions(link: string, questionId: string): Observable<Option[]> {
    return this.http.get<Option[]>(baseURL + 'quizes/' + link + '/questions/' + questionId + '/options')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getYouKnow(): Observable<youKnow[]> {
    return this.http.get<youKnow[]>(baseURL + 'youKnow')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getInformations(): Observable<Information[]> {
    return this.http.get<Information[]>(baseURL + 'informations')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getInformation(id: string): Observable<Information> {
    return this.http.get<Information>(baseURL + 'informations/' + id)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getInformationIds(): Observable<string[] | any> {
    return this.getInformations()
      .pipe(map(informations => informations.map(information => information._id)))
      .pipe(catchError(error => error));
  }

}
