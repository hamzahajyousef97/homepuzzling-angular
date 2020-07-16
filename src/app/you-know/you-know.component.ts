import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Title } from '@angular/platform-browser';
import { youKnow } from '../shared/youKnow';

@Component({
  selector: 'app-you-know',
  templateUrl: './you-know.component.html',
  styleUrls: ['./you-know.component.scss']
})
export class YouKnowComponent implements OnInit {

  youKnow: youKnow[];
  errMess: string;
  website: string = 'https://homepuzzling.com/';
  spinner: boolean = false;
  searchText;

  constructor(
    public quizService: QuizService,
    private titleService: Title) {
      this.titleService.setTitle("هل تعلم");
    }

  ngOnInit() {
    this.quizService.getYouKnow()
    .subscribe((youKnow) => {
      this.youKnow = youKnow;
      this.spinner = true;
    },
    errmess => {
      this.youKnow = null;
      this.spinner = false;
      this.errMess = <any>errmess
    });
  }

}
