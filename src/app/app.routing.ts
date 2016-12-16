import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";
import {ListRunsComponent} from "./list-runs/list-runs.component";
import {ViewRunComponent} from "./view-run/view-run.component";
import {EditRunComponent} from "./edit-run/edit-run.component";
import {LoginComponent} from "./login/login.component";
import {MonthViewComponent} from "./details/month-view/month-view.component";

const appRoutes:Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'runs', component: ListRunsComponent},
  {path: 'runs/:id', component: ViewRunComponent},
  {path: 'editRun/:id', component: EditRunComponent},
  {path: 'newRun', component: EditRunComponent},
  {path: 'login', component: LoginComponent},
  {path: 'details/month', component: MonthViewComponent},
  {path: '**', redirectTo: '/login'}
];


export const appRoutingProviders:any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
