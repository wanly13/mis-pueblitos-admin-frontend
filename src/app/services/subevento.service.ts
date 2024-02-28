import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVER } from 'src/environments/environment.prod';
import { DtoSubEvento } from '../pages/modules/representantes/estructure/dtoRepresentante';


@Injectable({
    providedIn: 'root'
})
export class SubEventoService {
    private API_SERVER_SUBEVENTO = API_SERVER + '/sub-evento'

    constructor(
        private http: HttpClient
    ) { }

    // -------- LISTADO DE ENTIDADES ---------- \\
    get_listado_subEventos(): Observable<DtoSubEvento[]> {
        return this.http.get<DtoSubEvento[]>(this.API_SERVER_SUBEVENTO).pipe(
            map((response) => { return response })
        );
    }

    search_subEventos(data: any): Observable<DtoSubEvento[]> {
        return this.http.get<DtoSubEvento[]>(this.API_SERVER_SUBEVENTO).pipe(
            map((response) => { return response })
        );
    }

    // -------- CRUD ENTIDADES ---------- \\
    get_subEvento(id: any): Observable<DtoSubEvento> {
        return this.http.get<DtoSubEvento>(this.API_SERVER_SUBEVENTO + '/' + id).pipe(
            map((response) => { return response })
        );
    }

    get_subEventoByEvento(id: any): Observable<DtoSubEvento[]> {
        return this.http.get<DtoSubEvento[]>(this.API_SERVER_SUBEVENTO + '/evento/' + id).pipe(
            map((response) => { return response })
        );
    }

    create_subEvento(data: any): Observable<DtoSubEvento> {
        return this.http.post<DtoSubEvento>(this.API_SERVER_SUBEVENTO, data).pipe(
            map((response) => { return response })
        );
    }

    update_subEvento(id: any, data: any): Observable<DtoSubEvento> {
        return this.http.patch<DtoSubEvento>(this.API_SERVER_SUBEVENTO + '/' + id, data).pipe(
            map((response) => { return response })
        );
    }

    delete_subEvento(id: any): Observable<any> {
        return this.http.delete<any>(this.API_SERVER_SUBEVENTO + '/' + id).pipe(
            map((response) => { return response })
        );
    }


}
