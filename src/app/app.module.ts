import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing,
  appRoutingProviders }  from './app.routing';

import {AddRunsComponent} from "./add-runs/add-runs.component";
import {OverviewComponent} from "./overview/overview.component";
import {ListRunsComponent} from "./list-runs/list-runs.component";
import {ViewRunComponent} from "./view-run/view-run.component";

import { AppComponent } from './app.component';
import {DatetimeInputComponent} from "./shared/datetime-input/datetime-input.component";
import {DistancePipe} from "./shared/distance.pipe";
import {DurationPipe} from "./shared/duration.pipe";

@NgModule({
  declarations: [
    AppComponent,
    AddRunsComponent,
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
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
