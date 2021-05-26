import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoronaStatusComponent } from './components/corona-status/corona-status.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VaccinesComponent } from './components/vaccines/vaccines.component';

const routes: Routes = [
  {path:'home',component:HomeComponent, },
  {path:'vaccines',component:VaccinesComponent},  
  {path:'corona-status',component:CoronaStatusComponent},
  {path:'',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
  {path:'**',component:PageNotFoundComponent}//page 404 not found!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
