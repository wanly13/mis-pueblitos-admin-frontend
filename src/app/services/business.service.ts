import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVER } from 'src/environments/environment.prod';
import { DtoRepresenante } from '../pages/modules/representantes/estructure/dtoRepresentante';
import { DtoEmpresa } from '../pages/modules/business/structure/DtoEmpresa';


@Injectable({
    providedIn: 'root'
})
export class BusinessService {
    private API_SERVER_EMPRESA = API_SERVER + '/empresa'
    private API_SERVER_OFICINA = API_SERVER + '/oficina'
    
    constructor(
        private http: HttpClient
    ) { }

    // -------- LISTADO DE ENTIDADES ---------- \\
    get_listado_entidades(): Observable<any> {
        return this.http.get<any>(this.API_SERVER_EMPRESA).pipe(
            map((response) => { return response })
        );
    }

    search_entidades(data: any): Observable<DtoEmpresa[]> {
        return this.http.post<DtoEmpresa[]>(this.API_SERVER_EMPRESA + '/filters', data).pipe(
            map((response) => { return response })
        );
    }

    // -------- CRUD ENTIDADES ---------- \\
    get_entidad(id: any): Observable<any> {
        return this.http.get<any>(this.API_SERVER_EMPRESA + '/' + id).pipe(
            map((response) => { return response })
        );
    }
    create_entidad(data: any): Observable<any> {
        return this.http.post<any>(this.API_SERVER_EMPRESA, data).pipe(
            map((response) => { return response })
        );
    }

    update_entidad(id: any, data: any): Observable<any> {
        return this.http.put<any>(this.API_SERVER_EMPRESA + '/' + id, data).pipe(
            map((response) => { return response })
        );
    }

    delete_entidad(id: any): Observable<any> {
        return this.http.delete<any>(this.API_SERVER_EMPRESA + '/' + id).pipe(
            map((response) => { return response })
        );
    }
    // -------- LISTADO OFICINAS ---------- \\
    get_oficinas_empresa(taxIdEmpresa : any) {
        return this.http.get<any>(this.API_SERVER_OFICINA + '/empresa/' + taxIdEmpresa).pipe(
            map((response) => { return response })
        );
    }


    // -------- RELACION BANCO SECTORISTA ---------- \\
    /* create_relacion_sectorista(data: any): Observable<any> {
        return this.http.post<any>(this.API_SERVER_REPRESENTANTE_PODER, data).pipe(
            map((response) => { return response })
        );
    }
    update_relacion_sectorista(id: any, data: any): Observable<any> {
        return this.http.put<any>(this.API_SERVER_REPRESENTANTE_PODER + '/' + id, data).pipe(
            map((response) => { return response })
        );
    }
    delete_relacion_sectorista(id: any): Observable<any> {
        return this.http.delete<any>(this.API_SERVER_REPRESENTANTE_PODER + '/' + id).pipe(
            map((response) => { return response })
        );
    } */
}
