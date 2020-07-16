import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private router: Router,
    private title: Title,
    private meta: Meta,) {
      // this.title.setTitle("سياسة الخصوصية");
  }

  ngOnInit() {
    this.title.setTitle("Home Puzzling | سياسة الخصوصية");

    this.meta.updateTag({ name: "title", content: "Home Puzzling | سياسة الخصوصية" });
    this.meta.updateTag({ name: "description", content: "- تشكل خصوصية زوارنا اهتماما كبيرا لنا في موقعنا Home Puzzling ، نلتزم بحماية خصوصية مستخدمينا ونرغب بإطلاعك عزيزي مستخدم الموقع على طبيعة البيانات والمعلومات التي نقوم بتجميعها ، وكيفية استخدامنا لها، وما حدود تحكمنا عليها، كما ستوضح طريقة استخدامنا لهذه البيانات أو المعلومات المجمعة." });

    this.meta.updateTag({ property: "og:title", content: "Home Puzzling | سياسة الخصوصية" });
    this.meta.updateTag({ property: "og:description", content: "- تشكل خصوصية زوارنا اهتماما كبيرا لنا في موقعنا Home Puzzling ، نلتزم بحماية خصوصية مستخدمينا ونرغب بإطلاعك عزيزي مستخدم الموقع على طبيعة البيانات والمعلومات التي نقوم بتجميعها ، وكيفية استخدامنا لها، وما حدود تحكمنا عليها، كما ستوضح طريقة استخدامنا لهذه البيانات أو المعلومات المجمعة." });
    this.meta.updateTag({ property: "og:url", content: "https://www.homepuzzling.com/privacy-policy" });

    this.meta.updateTag({ property: "twitter:title", content: "Home Puzzling | سياسة الخصوصية" });
    this.meta.updateTag({ property: "twitter:description", content: "- تشكل خصوصية زوارنا اهتماما كبيرا لنا في موقعنا Home Puzzling ، نلتزم بحماية خصوصية مستخدمينا ونرغب بإطلاعك عزيزي مستخدم الموقع على طبيعة البيانات والمعلومات التي نقوم بتجميعها ، وكيفية استخدامنا لها، وما حدود تحكمنا عليها، كما ستوضح طريقة استخدامنا لهذه البيانات أو المعلومات المجمعة." });
    this.meta.updateTag({ property: "twitter:url", content: "https://www.homepuzzling.com/privacy-policy" });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

}
