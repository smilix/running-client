import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, XHRBackend, Http, RequestOptions} from '@angular/http';

import {Ng2PaginationModule} from 'ng2-pagination';

import {
  routing,
  appRoutingProviders
}  from './app.routing';

import {OverviewComponent} from "./overview/overview.component";
import {ListRunsComponent} from "./run/list-runs/list-runs.component";
import {ViewRunComponent} from "./run/view-run/view-run.component";
import {EditRunComponent} from "./run/edit-run/edit-run.component";

import {AppComponent} from './app.component';
import {DatetimeInputComponent} from "./shared/datetime-input/datetime-input.component";
import {DistancePipe} from "./shared/distance.pipe";
import {DurationPipe} from "./shared/duration.pipe";
import {LoginComponent} from './login/login.component';
import {Router} from "@angular/router";
import {HttpFactory} from "./shared/auth/HttpInterceptor";
import {SessionHolder} from "./shared/auth/SessionHolder";
import {Ng2Webstorage} from 'ng2-webstorage';
import {AuthService} from "./shared/auth/auth.service";
import { MonthViewComponent } from './details/month-view/month-view.component';
import { StopWatchComponent } from './run/edit-run/stop-watch/stop-watch.component';
import {UtilsService} from "./shared/utils.service";
import {AuthGuard} from "./shared/auth/auth.guard";
import { ListShoesComponent } from './list-shoes/list-shoes.component';
import {RunRepositoryService} from "./shared/run-repository.service";
import {ShoeService} from "./shared/shoe.service";
import { EditShoeComponent } from './edit-shoe/edit-shoe.component';
import { ViewShoeComponent } from './view-shoe/view-shoe.component';

@NgModule({
  declarations: [
    AppComponent,
    EditRunComponent,
    OverviewComponent,
    ListRunsComponent,
    ViewRunComponent,

    DatetimeInputComponent,

    DistancePipe,
    DurationPipe,
    LoginComponent,
    MonthViewComponent,
    StopWatchComponent,
    ListShoesComponent,
    EditShoeComponent,
    ViewShoeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2PaginationModule,
    Ng2Webstorage
  ],
  providers: [
    AuthGuard,
    appRoutingProviders,
    SessionHolder,
    {
      provide: Http,
      useFactory: HttpFactory,
      deps: [XHRBackend, RequestOptions, Router, SessionHolder]
    },
    AuthService,
    UtilsService,
    RunRepositoryService,
    ShoeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
