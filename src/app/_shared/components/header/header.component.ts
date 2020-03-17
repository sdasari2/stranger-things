import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { IOption } from '../../models/select.model';

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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  langHeaderOptions: IOption[] = LANG_HEADER;
  isSideNavOpen = false;
  selectedLang: string = LANG_HEADER[0].value;

  constructor(
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    if (this.translate.langs.length < 2) {
      this.setLanguages();
    } else {
      this.translate.use(this.translate.currentLang);
      this.selectedLang = this.translate.currentLang;
    }
  }

  setLanguages(): void {
    const langs = [];
    LANG_HEADER.forEach((lang) => {
      langs.push(lang.value);
    });
    this.translate.addLangs(langs);
    this.translate.setDefaultLang('en_US');
    this.translate.use('en_US');
  }

  goToSeasons(): void {
    this.router.navigateByUrl('/home/seasons');
    this.isSideNavOpen = false;
  }

  goToHome(): void {
    this.router.navigateByUrl('/home');
  }

  openSideMenu() {
    this.isSideNavOpen = true;
  }

  closeSideMenu() {
    this.isSideNavOpen = false;
  }

  changeLang(ev: IOption) {
    this.selectedLang = ev.value;
    this.translate.use(ev.value);
    this.isSideNavOpen = false;
  }
}
