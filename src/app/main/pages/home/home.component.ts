import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

export interface IGallery {
  src: string;
  text: string;
  reference?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  galleryList: IGallery[] = [];

  openModal = false;
  videoUrl: string;
  displayImage = '';

  @ViewChild('videoIframe') videoIframe: ElementRef;

  get safeVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  constructor(
     private sanitizer: DomSanitizer,
     private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.videoUrl = this.translate.instant('video-embed');
    this.getGalleryList();
    this.subscribeLangChanges();
  }

  onTrailerClick() {
    this.openModal = true;
  }

  closeModal() {
    this.openModal = false;
  }

  private subscribeLangChanges() {
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getGalleryList();
    });
  }

  private getGalleryList() {
    const galleryList = this.translate.instant('gallery');
    this.galleryList = Array.isArray(galleryList) ? galleryList : [];
    const displayImageObj: any = this.galleryList[1] || this.galleryList[0] || {};
    this.displayImage = displayImageObj.src;
  }
}
