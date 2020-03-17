import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { SelectComponent } from './components/select/select.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DECLARATIONS = [
  HeaderComponent,
  SelectComponent,
  RatingStarsComponent,
  EpisodeDetailComponent,
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    TranslateModule,
    ...DECLARATIONS
  ],
})
export class SharedModule { }
