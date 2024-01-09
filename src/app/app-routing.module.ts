import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavarComponent } from './pages/navar/navar.component';
import { RepresentantesComponent } from './pages/modules/representantes/representantes.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: NavarComponent,
    children: [
      {
        path: 'representantes',
        component: RepresentantesComponent,        
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
