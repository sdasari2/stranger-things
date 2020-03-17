import { Component, Input, OnInit } from '@angular/core';
import { IEpisode } from '../../models/episode.model';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
})
export class EpisodeDetailComponent implements OnInit {

  @Input() episode: IEpisode ;

  constructor() { }

  ngOnInit(): void {
  }

}
