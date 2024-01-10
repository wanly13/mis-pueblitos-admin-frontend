import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { API_SERVER } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private SERVER = API_SERVER ;
  private user = this.SERVER + '/users';
 
  constructor(
    private http: HttpClient,
    
  ) { }
  

  getUsers( data : any): Observable<any> {       
    return this.http.get<any>(this.user + '/login/3');
  }

  login_service(data : any): Observable<any> {       
    return this.http.post<any>(this.user + '/login' , data);
  }

}
