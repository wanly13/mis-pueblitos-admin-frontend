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

@NgModule({
  declarations: [
    AppComponent,
    LoadingsComponent,
    LoginComponent,
    RepresentantesComponent,
    NavarComponent,
    AddRepresentanteComponent,
    DateUserComponent,
    AddRelacionPoderComponent
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
