import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IOption } from './_shared/models/select.model';

const LANG_HEADER: IOption[] = [
  {
    value: 'en_US',
    text: 'English',
  },
  {
    value: 'la_PG',
    text: 'Pig Latin',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stranger-things';

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    const langs = [];
    LANG_HEADER.forEach((lang) => {
      langs.push(lang.value);
    });
    this.translate.addLangs(langs);
    this.translate.setDefaultLang('en_US');
    this.translate.use('en_US');
  }
}
