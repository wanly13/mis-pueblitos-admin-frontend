import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { RepresentantesService } from 'src/app/services/representantes.service';
import { InputModal } from '../add-relacion-poder/add-relacion-poder.component';
import Swal from 'sweetalert2'

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
      tipoDocumento: [{ value: null, disabled: false }],
      documentoIdentidad: [{ value: null, disabled: false }],
      fechaNacimiento: [{ value: null, disabled: false }],
      nombres: [{ value: null, disabled: false }],
      apellidoPaterno: [{ value: null, disabled: false }],
      apellidoMaterno: [{ value: null, disabled: false }],
      celular: [{ value: null, disabled: false }],
      correoElectronico: [{ value: null, disabled: false }],
      idCargo: [{ value: null, disabled: false }],
      idPais: [{ value: null, disabled: false }],
      idEstadoLaboral: [{ value: null, disabled: false }],
    });
  }

  ngOnInit() {
    this.loadLocalStorageData()
    this.general_loads()
  }

  // --------------- Loads Values --------------- \\
  general_loads() {
    this.load_estados_laborales()
    this.tipo_documentos()
    this.load_cargos()
    this.load_paises()
    this.load_empresas()

  }

  bool_search_api: boolean = false
  search_api_reniec() {
    this.bool_search_api = true;
    this.loadingService.show();

    this.representantesService.get_representante(this.addValueForm.value.documentoIdentidad).subscribe(
      (response: any) => {
        this.addValueForm.patchValue(response)
        this.Listado_poderes = response.relacionPoderRepresentante

        const data = {
          option: 'EDIT',
          data: this.addValueForm.value
        }
        localStorage.setItem('itemSelected', JSON.stringify(data));
        this.loadLocalStorageData()
        this.loadingService.hide();
      },
      (err) => {
        alert('Error al Buscar')
        this.loadingService.hide();
      }
    );
  }
  ngOnDestroy() {
    localStorage.removeItem('itemSelected')
  }

  dataLocalStorage: any;
  loadLocalStorageData() {

    this.dataLocalStorage = JSON.parse(localStorage.getItem('itemSelected'));
    console.log("this.dataLocalStorage", this.dataLocalStorage);
    if (this.dataLocalStorage.option == 'EDIT') {
      /* this.addValueForm.patchValue(this.dataLocalStorage.data)
      this.Listado_poderes = this.dataLocalStorage.data.relacionPoderRepresentante */
      this.bool_search_api = true
      this.getDateRepresentante(this.dataLocalStorage.data)
    } else if (this.dataLocalStorage.option == 'CREATE') {
      this.addValueForm.patchValue({})
      this.Listado_poderes = []
    }
  }

  getDateRepresentante(value: any) {
    this.representantesService.get_representante(value.documentoIdentidad).subscribe(
      (response: any) => {
        this.addValueForm.patchValue(response)
        this.Listado_poderes = response.relacionPoderRepresentante
        this.loadingService.hide();
      },
      (err) => {
        alert('Error al Buscar')
        this.loadingService.hide();
      }
    );
  }


  // --------- FUNCIONALIDAD TABS------------- \\
  tab_selected: any = 'Profile';
  DesignTabClassSelected: any = 'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group'
  DesignIconClassSelected: any = 'w-4 h-4 me-2 text-blue-600 dark:text-blue-500'
  DesignTabClassNotSelected: any = 'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group'
  DesignIconClassNotSelected: any = 'w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
  change_tabs(type: any) {
    this.tab_selected = type;
  }

  showSelectedTab(value: any, tabSelected: any) {
    if (tabSelected == value) {
      return [this.DesignTabClassSelected, this.DesignIconClassSelected]
    } else {
      return [this.DesignTabClassNotSelected, this.DesignIconClassNotSelected]
    }
  }

  Listado_poderes: any[] = []


  // --------- FUNCIONALIDAD MODAL RELACION - PODER------------- \\
  boolRelacionPoder: boolean = false;
  sentMOdal: InputModal = new InputModal();
  activateRelacionPoder(value: any) {
    if (value.action == true) {
      this.sentMOdal.type = value.option;
      this.sentMOdal.data = value.obj
      this.boolRelacionPoder = true;
    } else {
      this.boolRelacionPoder = false;
      this.loadLocalStorageData()
      /* if (value.data) {
        console.log("this.sentMOdal.data", value);

        this.Listado_poderes.push(value.data)
      } */
    }

  }


  nextPage() {
    this.loadingService.show();
    var representante = this.addValueForm.value;
    if (this.dataLocalStorage.option == 'CREATE') {

      representante.relacionPoderRepresentante = []
      this.representantesService.create_representante(representante).subscribe(
        (response: any) => {
          alert('Agregado Correctamente')
          const data = {
            option: 'EDIT',
            data: representante
          }
          localStorage.setItem('itemSelected', JSON.stringify(data));
          this.loadLocalStorageData()
          this.change_tabs('Poderes')
          this.loadingService.hide();
        },
        (err) => {
          alert('Error al agregar')
          this.loadingService.hide();
        }
      );
    } else if (this.dataLocalStorage.option == 'EDIT') {
      representante.relacionPoderRepresentante = this.Listado_poderes
      this.representantesService.update_representante(representante.documentoIdentidad, representante).subscribe(
        (response: any) => {
          alert('Actualizado Correctamente')
          this.loadLocalStorageData()
          this.loadingService.hide();
        },
        (err) => {
          alert('Error al Actualizar')
          this.loadingService.hide();
        }
      );
    }
  }

  deleteRelacion(value: any) {
    this.loadingService.show()
    this.representantesService.delete_relacion_poder(value.idRelacionPoder).subscribe(
      (response: any) => {

        Swal.fire({
          title: '¡Borrado!',
          text: 'Se eliminó exitosamente',
          icon: 'success'
        });

        this.loadLocalStorageData()
        this.loadingService.hide();
      },
      (err) => {
        Swal.fire({
          title: '¡Error!',
          text: 'Error al eliminar',
          icon: 'error'
        });

        this.loadingService.hide();
      }
    );
  }


  save_representante(value: any) {
    console.log(this.addValueForm.value);
    console.log(this.Listado_poderes);

    if (this.dataLocalStorage.option == 'CREATE') {
      console.log("agregamos");

    } else {
      console.log("actualizamos");

    }
  }



  show_error(obj: any) {
    Swal.fire({
      title: obj.title,
      text: obj.message,
      icon: obj.icon
    });
  }


  // ------------- CALL LOADS --------- \\
  list_estado_laboral: any[] = [];
  load_estados_laborales() {
    this.loadingService.show();
    this.list_estado_laboral = []
    this.representantesService.get_listado_estados_laborales().subscribe(
      (response: any) => {
        this.list_estado_laboral = response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }

  list_documentos: any[] = [];
  tipo_documentos() {
    this.list_documentos = [
      {
        name: 'DNI',
        value: 'D'
      },
      {
        name: 'C. EXTRANGERIA',
        value: 'D'
      },
      {
        name: 'PASAPORTE',
        value: 'D'
      },
    ]
  }

  list_cargos: any[] = [];
  load_cargos() {
    this.loadingService.show();
    this.list_cargos = []
    this.representantesService.get_listado_cargos().subscribe(
      (response: any) => {
        this.list_cargos = response;
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
        this.list_paises = response;
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
        this.list_empresas = response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }






}
