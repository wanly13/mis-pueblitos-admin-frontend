import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ServerResponseRepresentante } from '../pages/modules/representantes/estructure/dtoRepresentante';
import { API_SERVER } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RepresentantesService {
  private API_SERVER_REPRESENTANTE = API_SERVER + '/representante'
  private API_SERVER_ESTADO_LABORAL = API_SERVER + '/estadolaboral'
  private API_SERVER_AREA = API_SERVER + '/area'
  private API_SERVER_PAIS = API_SERVER + '/pais'
  private API_SERVER_EMPRESA = API_SERVER + '/entidad'

  constructor(
    private http: HttpClient
  ) { }

  get_listado_representantes(): Observable<ServerResponseRepresentante> {
    return this.http.get<ServerResponseRepresentante>(this.API_SERVER_REPRESENTANTE).pipe(
      map((response) => { return response })
    );
  }


  get_listado_estados_laborales(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_ESTADO_LABORAL).pipe(
      map((response) => { return response })
    );
  }

  get_listado_area(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_AREA).pipe(
      map((response) => { return response })
    );
  }

  get_listado_paises(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_PAIS).pipe(
      map((response) => { return response })
    );
  }

  get_listado_empresas(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_EMPRESA).pipe(
      map((response) => { return response })
    );
  }
}
