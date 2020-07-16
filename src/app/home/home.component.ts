import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../models';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // quizes: Quiz[] = [];
  // errMess: string;
  // spinner: boolean = false;

  constructor(
    // private quizService: QuizService,
    private router: Router,
    private title: Title,
    private meta: Meta,
  ) { 
    // this.title.setTitle("الصفحة الرئيسية");
  }

  ngOnInit() {
    this.title.setTitle("Home Puzzling | الصفحة الرئيسية");

    this.meta.updateTag({ name: "title", content: "Home Puzzling | الصفحة الرئيسية" });
    this.meta.updateTag({ name: "description", content: "تتكون هذه المنصة من اختبارات ثقافية وعلمية ورياضية ودينية، لكل من هذه الاختبارات مدة زمنية، يمكن للمستخدم ان يقوم بالتحدي مع اصدقائه عبر وسائل التواصل الاجتماعي في النتيجة التي حصل عليها، وفي المدة الزمنية التي استغرقها لينتهي من الاختبار." });

    this.meta.updateTag({ property: "og:title", content: "Home Puzzling | الصفحة الرئيسية" });
    this.meta.updateTag({ property: "og:description", content: "تتكون هذه المنصة من اختبارات ثقافية وعلمية ورياضية ودينية، لكل من هذه الاختبارات مدة زمنية، يمكن للمستخدم ان يقوم بالتحدي مع اصدقائه عبر وسائل التواصل الاجتماعي في النتيجة التي حصل عليها، وفي المدة الزمنية التي استغرقها لينتهي من الاختبار." });
    this.meta.updateTag({ property: "og:url", content: "https://www.homepuzzling.com" });

    this.meta.updateTag({ property: "twitter:title", content: "Home Puzzling | الصفحة الرئيسية" });
    this.meta.updateTag({ property: "twitter:description", content: "تتكون هذه المنصة من اختبارات ثقافية وعلمية ورياضية ودينية، لكل من هذه الاختبارات مدة زمنية، يمكن للمستخدم ان يقوم بالتحدي مع اصدقائه عبر وسائل التواصل الاجتماعي في النتيجة التي حصل عليها، وفي المدة الزمنية التي استغرقها لينتهي من الاختبار." });
    this.meta.updateTag({ property: "twitter:url", content: "https://www.homepuzzling.com" });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    
    
    // this.quizService.getQuizes()
    //   .subscribe((quizes) => {
    //     for(let i = 0; i < quizes.length; i++) {
    //       if (quizes[i].link == 'corona') {
    //         this.quizes.push(quizes[i]);
    //       }
    //       else if (quizes[i].link == 'thesaying') {
    //         this.quizes.push(quizes[i]);
    //       }
    //       else if (quizes[i].link == 'culture') {
    //         this.quizes.push(quizes[i]);
    //       }
    //     }
    //     this.spinner = true;
    //   },
    //   errmess => {
    //     this.spinner = false;
    //     this.errMess = <any>errmess;
    //   });
  }

}
