import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OverviewComponent} from "./overview/overview.component";
import {ListRunsComponent} from "./run/list-runs/list-runs.component";
import {ViewRunComponent} from "./run/view-run/view-run.component";
import {EditRunComponent} from "./run/edit-run/edit-run.component";
import {LoginComponent} from "./login/login.component";
import {MonthViewComponent} from "./details/month-view/month-view.component";
import {AuthGuard} from "./shared/auth/auth.guard";
import {ListShoesComponent} from "./shoe/list-shoes/list-shoes.component";
import {ViewShoeComponent} from "./shoe/view-shoe/view-shoe.component";
import {EditShoeComponent} from "./shoe/edit-shoe/edit-shoe.component";

const routes: Routes = [
  {path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
  {path: 'runs', component: ListRunsComponent, canActivate: [AuthGuard]},
  {path: 'runs/:id', component: ViewRunComponent, canActivate: [AuthGuard]},
  {path: 'editRun/:id', component: EditRunComponent, canActivate: [AuthGuard]},
  {path: 'newRun', component: EditRunComponent, canActivate: [AuthGuard]},
  {path: 'shoes', component: ListShoesComponent, canActivate: [AuthGuard]},
  {path: 'shoes/:id', component: ViewShoeComponent, canActivate: [AuthGuard]},
  {path: 'editShoe/:id', component: EditShoeComponent, canActivate: [AuthGuard]},
  {path: 'newShoe', component: EditShoeComponent, canActivate: [AuthGuard]},
  {path: 'details/month', component: MonthViewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
