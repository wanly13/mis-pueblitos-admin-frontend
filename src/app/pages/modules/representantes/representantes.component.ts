import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { RepresentantesService } from 'src/app/services/representantes.service';
import { DtoRepresenante } from './estructure/dtoRepresentante';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-representantes',
  templateUrl: './representantes.component.html',
  styleUrls: ['./representantes.component.scss']
})
export class RepresentantesComponent {
  // --------------- Diseño Formulario --------------- \\
  input_class: any = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  label_class: any = 'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'


  // Filter of Search
  searchValueForm: FormGroup = this.fb.group({
    banco: [{ value: null, disabled: false }],
    empresa: [{ value: null, disabled: false }],
    poder: [{ value: null, disabled: false }],
    tipoFirmante: [{ value: null, disabled: false }],
    estadoPoder: [{ value: null, disabled: false }],
    
  });;

  constructor(
    public router: Router,
    private representantesService: RepresentantesService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit() {
    this.search_representante(this.searchValueForm.value);
    this.general_loads();
  }

  // ---------- LOADS FILTERS EN LIST ---------- \\
  general_loads (){
    this.load_empresas();
    this.load_entidades();
    this.load_tipo_firmantes();
    this.load_poder();
    this.load_estado_poder();
  }

  list_representantes: DtoRepresenante[] = []
  load_list_representantes() {
    this.loadingService.show();
    this.list_representantes = []
    this.representantesService.get_listado_representantes().subscribe(
      (response: DtoRepresenante[]) => {
        this.list_representantes = response;
        this.loadingService.hide();
      },
      err => {
        this.loadingService.hide()
      }
    )
  }

  list_empresas: any[] = [];
  load_empresas() {
    this.loadingService.show();
    this.list_empresas = []
    this.representantesService.get_listado_empresas().subscribe(
      (response: any) => {
        this.list_empresas = response.response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }
  list_entidades: any[] = [];
  load_entidades() {
    this.loadingService.show();
    this.list_entidades = []
    this.representantesService.get_listado_entidades().subscribe(
      (response: any) => {
        this.list_entidades = response.response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }
  list_tipo_firmantes: any[] = [];
  load_tipo_firmantes() {
    this.loadingService.show();
    this.list_tipo_firmantes = []
    this.representantesService.get_listado_tipo_firmantes().subscribe(
      (response: any) => {
        this.list_tipo_firmantes = response.response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }
  list_poder: any[] = [];
  load_poder() {
    this.loadingService.show();
    this.list_poder = []
    this.representantesService.get_listado_poder().subscribe(
      (response: any) => {
        this.list_poder = response.response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }
  list_estado_poder: any[] = [];
  load_estado_poder() {
    this.loadingService.show();
    this.list_estado_poder = []
    this.representantesService.get_listado_estado_poder().subscribe(
      (response: any) => {
        this.list_estado_poder = response.response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }
  // ---------- SEARCH ---------- \\
  search_representante(form: any) {
    this.loadingService.show();
    this.list_representantes = []
    this.representantesService.search_listado_representantes(form).subscribe(
      (response: DtoRepresenante[]) => {
        this.list_representantes = response;
        this.loadingService.hide();
      },
      err => {
        this.loadingService.hide()
      }
    )
  }
}
