import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Title } from '@angular/platform-browser';
import { Information } from '../shared/information';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit {

  informations: Information[];
  information: Information;
  informationsIds: string[];

  prev: string;
  next: string;

  clicked: boolean = false;
  errMess: string;
  website: string = 'https://homepuzzling.com/';
  spinner: boolean = false;
  searchText;

  constructor(
    public quizService: QuizService,
    private titleService: Title,
    private route: ActivatedRoute) {
      this.titleService.setTitle("هل تعلم");
    }

    ngOnInit() {
      this.quizService.getInformationIds()
      .subscribe((dishIds) => {
        this.informationsIds = dishIds;
      });

      this.route.params
        .pipe(switchMap((params: Params) => {
          return this.quizService.getInformation(params['id']);
        }))
        .subscribe(information => {
          this.information = information;
          this.setPrevNext(information._id);
          this.spinner = true;
          setTimeout(() => { this.clicked = false; }, 200);
        },
        errmess => {
          this.informations = null;
          this.spinner = false;
          this.errMess = <any>errmess;
        });
    }

    onClick() {
      this.clicked = true;
    }

    setPrevNext(informationsId: string) {
      if(this.informationsIds) {
        let index = this.informationsIds.indexOf(informationsId);
        this.prev = this.informationsIds[(this.informationsIds.length + index - 1)%this.informationsIds.length];
        this.next = this.informationsIds[(this.informationsIds.length + index + 1)%this.informationsIds.length];
      }
    }

}
