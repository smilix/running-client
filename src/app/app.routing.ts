import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";
import {ListRunsComponent} from "./list-runs/list-runs.component";
import {ViewRunComponent} from "./view-run/view-run.component";
import {EditRunComponent} from "./edit-run/edit-run.component";
import {LoginComponent} from "./login/login.component";
import {MonthViewComponent} from "./details/month-view/month-view.component";
import {AuthGuard} from "./shared/auth/auth.guard";

const appRoutes:Routes = [
  {path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
  {path: 'runs', component: ListRunsComponent, canActivate: [AuthGuard]},
  {path: 'runs/:id', component: ViewRunComponent, canActivate: [AuthGuard]},
  {path: 'editRun/:id', component: EditRunComponent, canActivate: [AuthGuard]},
  {path: 'newRun', component: EditRunComponent, canActivate: [AuthGuard]},
  {path: 'details/month', component: MonthViewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/login'}
];


export const appRoutingProviders:any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
