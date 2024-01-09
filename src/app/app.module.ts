import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepresentantesComponent } from './pages/modules/representantes/representantes.component';
import { NavarComponent } from './pages/navar/navar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RepresentantesComponent,
    NavarComponent
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
