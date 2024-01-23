import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVER } from 'src/environments/environment.prod';
import { DtoRepresenante } from '../pages/modules/representantes/estructure/dtoRepresentante';
import { DtoEntidades } from '../pages/modules/entidades/structure/DtioEntity';

@Injectable({
    providedIn: 'root'
})
export class EntidadesService {
    
    private API_SERVER_SECTORISTAS = API_SERVER + '/sectoristas'
    
    private API_SERVER_ENTIDAD = API_SERVER + '/entidad'
   

    constructor(
        private http: HttpClient
    ) { }

    // -------- LISTADO DE ENTIDADES ---------- \\
    get_listado_entidades(): Observable<any> {
        return this.http.get<any>(this.API_SERVER_ENTIDAD).pipe(
            map((response) => { return response })
        );
    }

    search_entidades(data: any): Observable<DtoEntidades[]> {
        return this.http.post<DtoEntidades[]>(this.API_SERVER_ENTIDAD + '/filters', data).pipe(
            map((response) => { return response })
        );
    }

    // -------- CRUD ENTIDADES ---------- \\
    get_entidad(id: any): Observable<any> {
        return this.http.get<any>(this.API_SERVER_ENTIDAD + '/' + id).pipe(
            map((response) => { return response })
        );
    }
    create_entidad(data: any): Observable<any> {
        return this.http.post<any>(this.API_SERVER_ENTIDAD, data).pipe(
            map((response) => { return response })
        );
    }

    update_entidad(id: any, data: any): Observable<any> {
        return this.http.put<any>(this.API_SERVER_ENTIDAD + '/' + id, data).pipe(
            map((response) => { return response })
        );
    }

    delete_entidad(id: any): Observable<any> {
        return this.http.delete<any>(this.API_SERVER_ENTIDAD + '/' + id).pipe(
            map((response) => { return response })
        );
    }

    // -------- RELACION BANCO SECTORISTA ---------- \\
    create_relacion_sectorista(data: any): Observable<any> {
        return this.http.post<any>(this.API_SERVER_SECTORISTAS, data).pipe(
            map((response) => { return response })
        );
    }
    update_relacion_sectorista(id: any, data: any): Observable<any> {
        return this.http.put<any>(this.API_SERVER_SECTORISTAS + '/' + id, data).pipe(
            map((response) => { return response })
        );
    }
    delete_relacion_sectorista(id: any): Observable<any> {
        return this.http.delete<any>(this.API_SERVER_SECTORISTAS + '/' + id).pipe(
            map((response) => { return response })
        );
    }
}
