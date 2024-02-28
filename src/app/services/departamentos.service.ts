import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVER } from 'src/environments/environment.prod';
import { DtoDepartamento } from '../pages/modules/departamento/structure/DtoDepartamento';


@Injectable({
    providedIn: 'root'
})
export class DepartamentosService {
    private API_SERVER_DEPARTAMENTO = API_SERVER + '/departamento'
    constructor(
        private http: HttpClient
    ) { }

    // -------- LISTADO DE ENTIDADES ---------- \\
    get_listado_departamentos(): Observable<DtoDepartamento[]> {
        console.log("entro", this.API_SERVER_DEPARTAMENTO);
        return this.http.get<any>(this.API_SERVER_DEPARTAMENTO).pipe(
            map((response) => { return response })
        );
    }

    search_entidades(data: any): Observable<DtoDepartamento[]> {
        return this.http.post<any>(this.API_SERVER_DEPARTAMENTO + '/filters', data).pipe(
            map((response) => { return response })
        );
    }

    // -------- CRUD ENTIDADES ---------- \\
    get_departamento(id: any): Observable<DtoDepartamento> {
        return this.http.get<any>(this.API_SERVER_DEPARTAMENTO + '/' + id).pipe(
            map((response) => { return response })
        );
    }
    create_departamento(data: any): Observable<DtoDepartamento> {
        return this.http.post<any>(this.API_SERVER_DEPARTAMENTO, data).pipe(
            map((response) => { return response })
        );
    }

    update_departamento(id: any, data: any): Observable<DtoDepartamento> {
        return this.http.patch<any>(this.API_SERVER_DEPARTAMENTO + '/' + id, data).pipe(
            map((response) => { return response })
        );
    }

    delete_departamento(id: any): Observable<any> {
        return this.http.delete<any>(this.API_SERVER_DEPARTAMENTO + '/' + id).pipe(
            map((response) => { return response })
        );
    }

}
