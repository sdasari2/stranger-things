import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { IOption } from '../../../_shared/models/select.model';
import { IEpisode } from '../../../_shared/models/episode.model';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  allEpisodesList: IEpisode[] = [];
  seasonsMap: any = {};
  seasonsList: IOption[] = [];
  episodesList = [];
  currentSeason = 1;

  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.displayEpisodesList();
    this.subscribeLangChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  groupSeasons(): void {
    this.seasonsMap = {};
    this.seasonsList = [];
    if (!this.allEpisodesList || this.allEpisodesList.length === 0) {
      return;
    }
    this.allEpisodesList.forEach((seasonDetail: IEpisode) => {
      if (!this.seasonsMap[seasonDetail.season]) {
        this.seasonsList.unshift({
          value: seasonDetail.season,
          text: 'Season ' + seasonDetail.season
        });
        this.seasonsMap[seasonDetail.season] = [seasonDetail];
      } else {
        this.seasonsMap[seasonDetail.season].push(seasonDetail);
      }
    });
    this.episodesList = this.seasonsMap[this.currentSeason];
  }

  onSeasonChange(ev): void {
    this.currentSeason = ev.value;
    this.episodesList = this.seasonsMap[ev.value];
  }

  private displayEpisodesList(): void {
    const episodesList = this.translate.instant('episode-list');
    this.allEpisodesList = Array.isArray(episodesList) ? episodesList : [];
    this.groupSeasons();
  }

  private subscribeLangChanges(): void {
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.displayEpisodesList();
    });
  }
}
