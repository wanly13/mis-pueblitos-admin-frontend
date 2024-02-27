import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVER } from 'src/environments/environment.prod';
import { DtoMotivosVisita } from '../pages/modules/entidades/structure/DtioEntity';

@Injectable({
    providedIn: 'root'
})
export class MotivosVisitaService {

    private API_SERVER_MOTIVOSVISITA = API_SERVER + '/motivos-visita'


    constructor(
        private http: HttpClient
    ) { }

    // -------- LISTADO DE ENTIDADES ---------- \\
    get_listado_motivosvisita(): Observable<DtoMotivosVisita[]> {
        return this.http.get<DtoMotivosVisita[]>(this.API_SERVER_MOTIVOSVISITA).pipe(
            map((response) => { return response })
        );
    }

    search_entidades(data: any): Observable<DtoMotivosVisita[]> {
        return this.http.post<DtoMotivosVisita[]>(this.API_SERVER_MOTIVOSVISITA + '/filters', data).pipe(
            map((response) => { return response })
        );
    }

    // -------- CRUD ENTIDADES ---------- \\
    get_lugar(id: any): Observable<DtoMotivosVisita> {
        return this.http.get<DtoMotivosVisita>(this.API_SERVER_MOTIVOSVISITA + '/' + id).pipe(
            map((response) => { return response })
        );
    }
    create_lugar(data: any): Observable<DtoMotivosVisita> {
        return this.http.post<DtoMotivosVisita>(this.API_SERVER_MOTIVOSVISITA, data).pipe(
            map((response) => { return response })
        );
    }

    update_lugar(id: any, data: any): Observable<DtoMotivosVisita> {
        return this.http.patch<DtoMotivosVisita>(this.API_SERVER_MOTIVOSVISITA + '/' + id, data).pipe(
            map((response) => { return response })
        );
    }

    delete_lugar(id: any): Observable<any> {
        return this.http.delete<any>(this.API_SERVER_MOTIVOSVISITA + '/' + id).pipe(
            map((response) => { return response })
        );
    }

}
