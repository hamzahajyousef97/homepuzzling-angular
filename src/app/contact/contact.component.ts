import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  errMess: string;
  Sended: boolean = false;
  showForm: boolean = true;
  showMessage: boolean = false;

  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
    'message': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'الاسم مطلوب',
    },
    'lastname': {
      'required': 'الكنية مطلوبة',
    },
    'telnum': {
      'required': 'رقم الهاتف مطلوب',
      'pattern': 'يجب ان يحتوى على ارقام فقط'
    },
    'email': {
      'required': 'البريد الإلكتروني مطلوب',
      'email': 'البريد الإلكتروني غير صحيح'
    },
    'message': {
      'required': 'رسالتكم مطلوبة',
    }
  };

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private title: Title,
    private meta: Meta,
  ) { 
    // this.title.setTitle("تواصل معنا");
  }

  ngOnInit() {
    this.title.setTitle("Home Puzzling | تواصل معنا");

    this.meta.updateTag({ name: "title", content: "Home Puzzling | تواصل معنا" });
    this.meta.updateTag({ name: "description", content: "يسرنا دوماً تواصلكم معنا، اذا واجهتم عطل فني في موقعنا، او إن كان لديكم اقتراحٌ جديد يمكنكم مراسلتنا عبر الفورم الموجود في موقعنا" });

    this.meta.updateTag({ property: "og:title", content: "Home Puzzling | تواصل معنا" });
    this.meta.updateTag({ property: "og:description", content: "يسرنا دوماً تواصلكم معنا، اذا واجهتم عطل فني في موقعنا، او إن كان لديكم اقتراحٌ جديد يمكنكم مراسلتنا عبر الفورم الموجود في موقعنا" });
    this.meta.updateTag({ property: "og:url", content: "https://www.homepuzzling.com/contact" });

    this.meta.updateTag({ property: "twitter:title", content: "Home Puzzling | تواصل معنا" });
    this.meta.updateTag({ property: "twitter:description", content: "يسرنا دوماً تواصلكم معنا، اذا واجهتم عطل فني في موقعنا، او إن كان لديكم اقتراحٌ جديد يمكنكم مراسلتنا عبر الفورم الموجود في موقعنا" });
    this.meta.updateTag({ property: "twitter:url", content: "https://www.homepuzzling.com/contact" });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    this.Sended = false;
    this.showForm = true;
    this.showMessage = false;
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telnum: ['90', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); //(re)set form validation messages 
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous erroe message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(feedback => {
        this.Sended = true;
        setTimeout(() => {
          this.showForm = false;
          this.showMessage = true;
          setTimeout(() => {
            this.ngOnInit();
          },10000);
        }, 500);
        this.feedback = feedback;
        this.feedbackForm.reset({
          firstname: '',
          lastname: '',
          telnum: '90',
          email: '',
          message: ''
        });
        this.feedbackFormDirective.resetForm();
        
      },
      errmess => {
        this.feedback = null; 
        this.errMess = <any>errmess; 
      }
    );
  }


}
