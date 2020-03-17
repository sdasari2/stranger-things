import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Shared Module
import { SharedModule } from '../_shared/shared.module';

// Routes
import { MainRoutingModule } from './main-routing.module';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { SeasonsComponent } from './pages/seasons/seasons.component';

@NgModule({
  declarations: [HomeComponent, SeasonsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
