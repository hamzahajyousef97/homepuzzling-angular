import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Information } from '../shared/information';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  informations: Information[];
  id: string;

  constructor(public quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getInformations()
    .subscribe((informations) => {
      this.informations = informations;
      this.id = this.informations[0]._id;
    });
  }

}