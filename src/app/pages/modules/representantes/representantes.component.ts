import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { RepresentantesService } from 'src/app/services/representantes.service';
import { DtoRepresenante, ServerResponseRepresentante } from './estructure/dtoRepresentante';

@Component({
  selector: 'app-representantes',
  templateUrl: './representantes.component.html',
  styleUrls: ['./representantes.component.scss']
})
export class RepresentantesComponent {
  constructor(
    public router: Router,
    private representantesService: RepresentantesService,
    private loadingService: LoadingService,
  ) {
  } 

  ngOnInit(){
    this.load_list_representantes()
  }

  list_representantes: DtoRepresenante[] = []
  load_list_representantes() {
    this.loadingService.show();
    this.list_representantes = []
    this.representantesService.get_listado_representantes().subscribe(
      (response: ServerResponseRepresentante) => {
        this.list_representantes = response.response;
        this.loadingService.hide();
      },
      err => {
        this.loadingService.hide()
      }
    )
  }


}
