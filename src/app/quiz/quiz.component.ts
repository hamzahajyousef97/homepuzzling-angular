import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

import { visibility, flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {

  quizes: Quiz[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  errMess: string;
  trueQuestions: number = 0;
  falseQuestions: number = 0;
  spinner: boolean = false;
  comment: string;
  quizTypeAR: string;
  quizType: string;
  quizSelected: boolean = false;

  visibility = 'shown';

  
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';


  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router,
    private titleService: Title
    ) {
      this.quizName = this.route.snapshot.params['name'];
      // this.titleService.setTitle("Home Puzzling | اختبار" + this.quiz.name);
    }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    
    this.loadQuiz(this.quizName)
  }

  loadQuiz(quizName: string) {
    if(quizName) {
      this.quizService.getQuiz(quizName).subscribe(res => {
        this.quizSelected = true;
        this.quiz = new Quiz(res);
        this.quizTypeAR = this.quiz.quizType;
        this.pager.count = this.quiz.questions.length;
        this.startTime = new Date();
        this.ellapsedTime = '00:00';
        this.timer = setInterval(() => { this.tick(); }, 1000);
        this.duration = this.parseTime(this.quiz.time);
        this.titleService.setTitle("اختبار " + this.quiz.name);
        if (this.quiz.quizType == 'دول') {
          this.quizType = 'countries';
          this.quizTypeAR = 'الدول';
        }
        else {
          this.quizType = 'general-culture';
          this.quizTypeAR = 'الثقافة عامة';
        }
        this.spinner = true;
      },
      errmess => { 
        this.spinner = false;
        this.errMess = <any>errmess;
      });
      this.mode = 'quiz';
    }

  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.quiz.time) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        this.visibility = 'hidden';
        if (x.id !== option.id) x.selected = false; 
      });
    }

    if (this.quiz.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    this.visibility = 'shown';
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
    else {
      this.onSubmit()
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'صحيحة' : 'خاطئة';
  };

  getResult() {
    let trueAnswer = 0;
    for(let i = 0; i < this.quiz.questions.length; i++) {
      if(this.isCorrect(this.quiz.questions[i]) == 'صحيحة'){
        trueAnswer +=1;
        this.trueQuestions = trueAnswer;
        this.falseQuestions = this.quiz.questions.length - this.trueQuestions;
      }
    }
    return Math.round((trueAnswer / this.quiz.questions.length) * 100);
  }

  getSmile() {
    if(this.getResult() == 100) {
      this.comment = 'انت عبقري! 😊🥰 معلوماتك ممتازة جداً, جرب نفسك مرة أُخرى في ';
    }
    else if(this.getResult() < 100 && this.getResult() > 80) {
      this.comment = 'احسنت! 😃 معلوماتك جيدة جداً, جرب نفسك مرة أُخرى في ';
    }
    else if(this.getResult() < 80 && this.getResult() > 50) {
      this.comment = 'جيد! 😅 لديك كم جيّد من المعلومات, جرب نفسك مرة أُخرى في ';
    }
    else if(this.getResult() < 50 && this.getResult() > 0) {
      this.comment = 'لا بأس! 🙁 عليك الاهتمام بثقافتك اكثر, جرب نفسك مرة أُخرى في ';
    }
    else if(this.getResult() == 0) {
      this.comment = 'انت فاشل!! 🙂 جرب نفسك مرة أُخرى في';
    }
  }

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz._id, 'questionId': x.id, 'answered': x.answered }));
    this.getResult();
    this.getSmile();
    console.log(this.ellapsedTime)
    this.mode = 'result';
  }

  // copyText(val: string){
  //   let selBox = document.createElement('textarea');
  //   // this.openSnackBar("تم حفظ رابط الاختبار الى الحافظة", '🙂')
  //   selBox.style.position = 'fixed';
  //   selBox.style.left = '0';
  //   selBox.style.top = '0';
  //   selBox.style.opacity = '0';
  //   selBox.value = val;
  //   document.body.appendChild(selBox);
  //   selBox.focus();
  //   selBox.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(selBox);
  // }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }

}
