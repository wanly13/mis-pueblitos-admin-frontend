import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavarComponent } from './pages/navar/navar.component';
import { RepresentantesComponent } from './pages/modules/representantes/representantes.component';
import { AddRepresentanteComponent } from './pages/modules/representantes/add-representante/add-representante.component';
import { EntidadesComponent } from './pages/modules/entidades/entidades.component';
import { HomeComponent } from './pages/modules/home/home.component';
import { EditEntitiesComponent } from './pages/modules/entidades/edit-entities/edit-entities.component';
import { BusinessComponent } from './pages/modules/business/business.component';
import { EditBusinessComponent } from './pages/modules/business/edit-business/edit-business.component';
import { PoderesComponent } from './pages/modules/poderes/poderes.component';
import { EditPoderesComponent } from './pages/modules/poderes/edit-poderes/edit-poderes.component';

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
      {
        path: 'all-business',
        component: BusinessComponent,
      },
      {
        path: 'add-business',
        component: EditBusinessComponent,
      },
      {
        path: 'all-poderes',
        component: PoderesComponent,
      },
      {
        path: 'add-poderes',
        component: EditPoderesComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
