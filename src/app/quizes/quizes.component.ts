import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../models';
import { Title, } from '@angular/platform-browser';
// import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss']
})
export class QuizesComponent implements OnInit {

  quizType: any;
  questions: any;
  quizTypeAR: any;
  spinner: boolean = false;
  quizes: Quiz[] = [];
  errMess: string;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    private titleService: Title,
    //private sanitizer: DomSanitizer //  gcsesearch: SafeHtml;
    ) { 
      this.titleService.setTitle("كل الاختبارات");
    }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    // this.gcsesearch = this.sanitizer.bypassSecurityTrustHtml("<gcse:search></gcse:search>");
    // var cx = '008590183670626233213:rqfo2aljr4x';
    // var gcse = document.createElement('script');
    // gcse.type = 'text/javascript';
    // gcse.async = true;
    // gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    // var s = document.getElementsByTagName('script')[0];
    // s.parentNode.insertBefore(gcse, s);


    this.route.data.subscribe(data => {
      this.quizType = data.quizType
    });

    this.quizService.getQuizes()
      .subscribe((quizes) => {
        for(let i = 0; i < quizes.length; i++) {
          if (quizes[i].questions.length > 5) {
            if(this.quizType == 'countries') {
              if(quizes[i].quizType == 'دول' ) {
                this.quizes.push(quizes[i]);
                this.quizTypeAR = 'دول'
              }
            }
            //
            else if (this.quizType == 'culture') {
              if(quizes[i].quizType == 'ثقافة عامة' || quizes[i].quizType == 'رياضة' || quizes[i].quizType == 'اسلامي' || quizes[i].quizType == 'تاريخ' || quizes[i].quizType == 'جغرافيا') {
                this.quizes.push(quizes[i]);
                this.quizTypeAR = 'ثقافة عامة'
              }
            }
          }
        }
        this.spinner = true;
      },
      errmess => {
        this.spinner = false;
        this.errMess = <any>errmess;
      });
  }

}
