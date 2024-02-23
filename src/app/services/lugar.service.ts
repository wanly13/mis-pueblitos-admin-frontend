import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_SERVER } from 'src/environments/environment.prod';
import { DtoLugar } from '../pages/modules/entidades/structure/DtioEntity';

@Injectable({
    providedIn: 'root'
})
export class LugarService {

    private API_SERVER_LUGAR = API_SERVER + '/lugar'


    constructor(
        private http: HttpClient
    ) { }

    // -------- LISTADO DE ENTIDADES ---------- \\
    get_listado_lugares(): Observable<DtoLugar[]> {
        return this.http.get<DtoLugar[]>(this.API_SERVER_LUGAR).pipe(
            map((response) => { return response })
        );
    }

    search_entidades(data: any): Observable<DtoLugar[]> {
        return this.http.post<DtoLugar[]>(this.API_SERVER_LUGAR + '/filters', data).pipe(
            map((response) => { return response })
        );
    }

    // -------- CRUD ENTIDADES ---------- \\
    get_lugar(id: any): Observable<DtoLugar> {
        return this.http.get<DtoLugar>(this.API_SERVER_LUGAR + '/' + id).pipe(
            map((response) => { return response })
        );
    }
    create_lugar(data: any): Observable<DtoLugar> {
        return this.http.post<DtoLugar>(this.API_SERVER_LUGAR, data).pipe(
            map((response) => { return response })
        );
    }

    update_lugar(id: any, data: any): Observable<DtoLugar> {
        return this.http.patch<DtoLugar>(this.API_SERVER_LUGAR + '/' + id, data).pipe(
            map((response) => { return response })
        );
    }

    delete_lugar(id: any): Observable<any> {
        return this.http.delete<any>(this.API_SERVER_LUGAR + '/' + id).pipe(
            map((response) => { return response })
        );
    }

}
