import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavarComponent } from './pages/navar/navar.component';
import { RepresentantesComponent } from './pages/modules/representantes/representantes.component';
import { AddRepresentanteComponent } from './pages/modules/representantes/add-representante/add-representante.component';
import { EntidadesComponent } from './pages/modules/entidades/entidades.component';
import { HomeComponent } from './pages/modules/home/home.component';
import { EditEntitiesComponent } from './pages/modules/entidades/edit-entities/edit-entities.component';
import { DepartamentoComponent } from './pages/modules/departamento/departamento.component';
import { EditDepartamentoComponent } from './pages/modules/departamento/edit-departamento/edit-departamento.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  /*{
    path: 'login',
    component: LoginComponent
  },*/
  {
    path: 'home',
    component: NavarComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'all-departament',
        component: DepartamentoComponent,
      },
      {
        path: 'add-departament',
        component: EditDepartamentoComponent,
      },
      {
        path: 'all-lugares',
        component: EntidadesComponent,
      },
      {
        path: 'add-lugares',
        component: EditEntitiesComponent,
      },
      {
        path: 'all-eventos',
        component: RepresentantesComponent,
      },
      {
        path: 'add-eventos',
        component: AddRepresentanteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
