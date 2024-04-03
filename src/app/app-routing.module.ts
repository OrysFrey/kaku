import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardPanelComponent } from './components/dashboard-panel/dashboard-panel.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login-registe', component:LoginComponent},
  {path:'dashboard-panel', component:DashboardPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
