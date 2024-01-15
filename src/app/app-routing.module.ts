import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavarComponent } from './pages/navar/navar.component';
import { RepresentantesComponent } from './pages/modules/representantes/representantes.component';
import { AddRepresentanteComponent } from './pages/modules/representantes/add-representante/add-representante.component';
import { EntidadesComponent } from './pages/modules/entidades/entidades.component';
import { HomeComponent } from './pages/modules/home/home.component';
import { EditEntitiesComponent } from './pages/modules/entidades/edit-entities/edit-entities.component';

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
        path: '',
        component: HomeComponent,  
      },
      {
        path: 'all-rep',
        component: RepresentantesComponent,  
      },
      {
        path: 'add-rep',
        component: AddRepresentanteComponent,  
      },
      
      {
        path: 'all-entity',
        component: EntidadesComponent,  
      },
      {
        path: 'add-entity',
        component: EditEntitiesComponent,  
      },
     
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
