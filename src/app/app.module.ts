import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepresentantesComponent } from './pages/modules/representantes/representantes.component';
import { NavarComponent } from './pages/navar/navar.component';
import { AddRepresentanteComponent } from './pages/modules/representantes/add-representante/add-representante.component';
import { DateUserComponent } from './pages/navar/date-user/date-user.component';
import { AddRelacionPoderComponent } from './pages/modules/representantes/add-relacion-poder/add-relacion-poder.component';
import { LoadingsComponent } from './general-functions/loading/loadings/loadings.component';
import { EntidadesComponent } from './pages/modules/entidades/entidades.component';
import { EditEntitiesComponent } from './pages/modules/entidades/edit-entities/edit-entities.component';
import { HomeComponent } from './pages/modules/home/home.component';
import { BusinessComponent } from './pages/modules/business/business.component';
import { EditBusinessComponent } from './pages/modules/business/edit-business/edit-business.component';
import { PoderesComponent } from './pages/modules/poderes/poderes.component';
import { EditPoderesComponent } from './pages/modules/poderes/edit-poderes/edit-poderes.component';
import { AddOficinasComponent } from './pages/modules/business/add-oficinas/add-oficinas.component';
import { AddSectoristasComponent } from './pages/modules/entidades/add-sectoristas/add-sectoristas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingsComponent,
    LoginComponent,
    RepresentantesComponent,
    NavarComponent,
    AddRepresentanteComponent,
    DateUserComponent,
    AddRelacionPoderComponent,
    EntidadesComponent,
    EditEntitiesComponent,
    HomeComponent,
    BusinessComponent,
    EditBusinessComponent,
    PoderesComponent,
    EditPoderesComponent,
    AddOficinasComponent,
    AddSectoristasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
