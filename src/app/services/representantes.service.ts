import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVER } from 'src/environments/environment.prod';
import { DtoRepresenante } from '../pages/modules/representantes/estructure/dtoRepresentante';

@Injectable({
  providedIn: 'root'
})
export class RepresentantesService {
  private API_SERVER_REPRESENTANTE = API_SERVER + '/representante'
  private API_SERVER_REPRESENTANTE_PODER = API_SERVER + '/poder-representante'
  private API_SERVER_ESTADO_LABORAL = API_SERVER + '/estadolaboral'
  private API_SERVER_AREA = API_SERVER + '/area'
  private API_SERVER_PAIS = API_SERVER + '/pais'
  private API_SERVER_ENTIDAD = API_SERVER + '/entidad'
  private API_SERVER_EMPRESA = API_SERVER + '/empresa'
  private API_SERVER_TIPO_REPRESENTANTE = API_SERVER + '/tipo-representante'
  private API_SERVER_PODER = API_SERVER + '/poder'
  private API_SERVER_ESTADO_PODER = API_SERVER + '/estadopoder'
  private API_SERVER_CARGOS = API_SERVER + '/cargo'

  constructor(
    private http: HttpClient
  ) { }

  get_listado_representantes(): Observable<DtoRepresenante[]> {
    return this.http.get<DtoRepresenante[]>(this.API_SERVER_REPRESENTANTE).pipe(
      map((response) => { return response })
    );
  }

  search_listado_representantes(form: any): Observable<DtoRepresenante[]> {
    return this.http.post<DtoRepresenante[]>(this.API_SERVER_REPRESENTANTE + '/filters', form).pipe(
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
  get_listado_cargos(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_CARGOS).pipe(
      map((response) => { return response })
    );
  }
  get_listado_empresas(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_EMPRESA).pipe(
      map((response) => { return response })
    );
  }
  get_listado_entidades(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_ENTIDAD).pipe(
      map((response) => { return response })
    );
  }
  get_listado_tipo_firmantes(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_TIPO_REPRESENTANTE).pipe(
      map((response) => { return response })
    );
  }
  get_listado_poder(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_PODER).pipe(
      map((response) => { return response })
    );
  }
  get_listado_estado_poder(): Observable<any> {
    return this.http.get<any>(this.API_SERVER_ESTADO_PODER).pipe(
      map((response) => { return response })
    );
  }


  // --------- REPRESENTANTE ------ \\
  create_representante(data : any): Observable<any> {
    return this.http.post<any>(this.API_SERVER_REPRESENTANTE , data).pipe(
      map((response) => { return response })
    );
  }
  get_representante(id : any): Observable<any> {
    return this.http.get<any>(this.API_SERVER_REPRESENTANTE + '/' + id).pipe(
      map((response) => { return response })
    );
  }
  update_representante(id: any , data : any): Observable<any> {
    return this.http.put<any>(this.API_SERVER_REPRESENTANTE + '/' + id , data).pipe(
      map((response) => { return response })
    );
  }

  create_relacion_poder(data : any): Observable<any> {
    return this.http.post<any>(this.API_SERVER_REPRESENTANTE_PODER , data).pipe(
      map((response) => { return response })
    );
  }
  update_relacion_poder(id: any , data : any): Observable<any> {
    return this.http.put<any>(this.API_SERVER_REPRESENTANTE_PODER + '/' + id, data).pipe(
      map((response) => { return response })
    );
  }
}
