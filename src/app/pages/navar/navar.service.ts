import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('Listado de Firmantes');
  title$ = this.titleSubject.asObservable();

  setTitle(newTitle: string): void {
    this.titleSubject.next(newTitle);
  }
}