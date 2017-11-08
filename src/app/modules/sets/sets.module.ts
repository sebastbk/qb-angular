import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../../shared/shared.module';

import { SetsRoutingModule } from './sets-routing.module';

import { SetsComponent } from './sets.component';
import { SetSearchComponent } from './components/set-search/set-search.component';
import { SetDetailsComponent } from './components/set-details/set-details.component';

import { SetService } from './services/set.service';
import { TagService } from '../tags/services/tag.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SetsRoutingModule,
    SharedModule,
  ],
  declarations: [
    SetsComponent,
    SetSearchComponent,
    SetDetailsComponent,
  ],
  providers: [
    SetService,
    TagService,
  ]
})
export class SetsModule { }
