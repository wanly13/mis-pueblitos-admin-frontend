import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { RepresentantesService } from 'src/app/services/representantes.service';


@Component({
  selector: 'app-add-representante',
  templateUrl: './add-representante.component.html',
  styleUrls: ['./add-representante.component.scss']
})
export class AddRepresentanteComponent {
  // --------------- Diseño Formulario --------------- \\
  input_class: any = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  label_class: any = 'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'


  addValueForm: FormGroup;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private representantesService: RepresentantesService,
  ) {

    this.addValueForm = this.fb.group({
      nombreRepresentante: [{ value: null, disabled: false }],
      documentoIdentidad: [{ value: null, disabled: false }],
      celular: [{ value: null, disabled: false }],
      correoElectronico: [{ value: null, disabled: false }],
      idEstadoLaboral: [{ value: null, disabled: false }],
      idArea: [{ value: null, disabled: false }],
      idPais: [{ value: null, disabled: false }],
      taxId: [{ value: null, disabled: false }],
    });
  }

  ngOnInit() {
    this.general_loads()
  }

  // --------------- Loads Values --------------- \\
  general_loads() {
    this.load_estados_laborales()
    this.load_areas()
    this.load_paises()
    this.load_empresas()

  }

  list_estado_laboral: any[] = [];
  load_estados_laborales() {
    this.loadingService.show();
    this.list_estado_laboral = []
    this.representantesService.get_listado_estados_laborales().subscribe(
      (response: any) => {
        this.list_estado_laboral = response.response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }

  list_areas: any[] = [];
  load_areas() {
    this.loadingService.show();
    this.list_areas = []
    this.representantesService.get_listado_area().subscribe(
      (response: any) => {
        this.list_areas = response.response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }

  list_paises: any[] = [];
  load_paises() {
    this.loadingService.show();
    this.list_paises = []
    this.representantesService.get_listado_paises().subscribe(
      (response: any) => {
        this.list_paises = response.response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
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


  save_representante(value: any) {

  }
}
