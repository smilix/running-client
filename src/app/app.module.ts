import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {Ng2PaginationModule} from 'ng2-pagination';

import { routing,
  appRoutingProviders }  from './app.routing';

import {OverviewComponent} from "./overview/overview.component";
import {ListRunsComponent} from "./list-runs/list-runs.component";
import {ViewRunComponent} from "./view-run/view-run.component";
import {EditRunComponent} from "./edit-run/edit-run.component";

import { AppComponent } from './app.component';
import {DatetimeInputComponent} from "./shared/datetime-input/datetime-input.component";
import {DistancePipe} from "./shared/distance.pipe";
import {DurationPipe} from "./shared/duration.pipe";

@NgModule({
  declarations: [
    AppComponent,
    EditRunComponent,
    OverviewComponent,
    ListRunsComponent,
    ViewRunComponent,

    DatetimeInputComponent,

    DistancePipe,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2PaginationModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
