import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVER } from 'src/environments/environment.prod';
import { DtoEvento,DtoEventos } from '../pages/modules/representantes/estructure/dtoRepresentante';


@Injectable({
    providedIn: 'root'
})
export class EventoService {
    private API_SERVER_EVENTO = API_SERVER + '/evento'

    constructor(
        private http: HttpClient
    ) { }

    // -------- LISTADO DE ENTIDADES ---------- \\
    get_listado_eventos(): Observable<DtoEventos[]> {
        return this.http.get<DtoEventos[]>(this.API_SERVER_EVENTO).pipe(
            map((response) => { return response })
        );
    }

    search_eventos(data: any): Observable<DtoEventos[]> {
        return this.http.get<DtoEventos[]>(this.API_SERVER_EVENTO).pipe(
            map((response) => { return response })
        );
    }

    // -------- CRUD ENTIDADES ---------- \\
    get_evento(id: any): Observable<DtoEvento> {
        return this.http.get<DtoEvento>(this.API_SERVER_EVENTO + '/' + id).pipe(
            map((response) => { return response })
        );
    }
    create_evento(data: any): Observable<DtoEvento> {
        return this.http.post<DtoEvento>(this.API_SERVER_EVENTO, data).pipe(
            map((response) => { return response })
        );
    }

    update_evento(id: any, data: any): Observable<DtoEvento> {
        return this.http.patch<DtoEvento>(this.API_SERVER_EVENTO + '/' + id, data).pipe(
            map((response) => { return response })
        );
    }

    delete_evento(id: any): Observable<any> {
        return this.http.delete<any>(this.API_SERVER_EVENTO + '/' + id).pipe(
            map((response) => { return response })
        );
    }


}
