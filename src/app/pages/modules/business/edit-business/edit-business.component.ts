import { DepartamentosService } from './../../../../services/departamentos.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
//import { BusinessService } from 'src/app/services/business.service';
import { RepresentantesService } from 'src/app/services/representantes.service';
import Swal from 'sweetalert2';
import { InputModal } from '../../representantes/add-relacion-poder/add-relacion-poder.component';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.scss']
})
export class EditBusinessComponent {


  // --------------- Diseño Formulario --------------- \\
  input_class: any = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  label_class: any = 'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'


  addValueForm: FormGroup;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private departamentosService:DepartamentosService,
    //private businessService: BusinessService,
    private representantesService: RepresentantesService
  ) {

    this.addValueForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      nombre: [{ value: null, disabled: false }],
      descripcion: [{ value: null, disabled: false }],
      foto: [{ value: null, disabled: false }],
    });
  }

  ngOnInit() {
    this.loadLocalStorageData()
    this.general_loads()
  }

  // --------------- Loads Values --------------- \\
  general_loads() {
    //this.load_estados_laborales()
    this.tipo_documentos_entidad()
    //this.load_cargos()
    this.load_paises()
    //this.load_empresas()

  }

  bool_search_api: boolean = false
  search_api_reniec() {

    this.loadingService.show();

    /*this.businessService.get_entidad(this.addValueForm.value.taxId).subscribe(
      (response: any) => {
        this.bool_search_api = true;
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
        this.bool_search_api = true;
        this.loadingService.hide();
      }
    );*/
  }

  ngOnDestroy() {
    localStorage.removeItem('itemSelected')
  }

  dataLocalStorage: any;
  loadLocalStorageData() {

    this.dataLocalStorage = JSON.parse(localStorage.getItem('itemSelected'));
    console.log("this.dataLocalStorage", this.dataLocalStorage);
    if (this.dataLocalStorage.option == 'EDIT') {

      this.bool_search_api = true
      this.getDateRepresentante(this.dataLocalStorage.data)
    } else if (this.dataLocalStorage.option == 'CREATE') {
      this.addValueForm.patchValue({})
      this.Listado_poderes = []
    }
  }
  Listado_oficinas: any[] = [];
  ListadoCuentasBancarias: any[] = [];
  getDateRepresentante(value: any) {
    /*this.businessService.get_entidad(value.taxId).subscribe(
      (response: any) => {
        console.log("response: v", response);

        this.addValueForm.patchValue(response)
        this.Listado_oficinas = response.oficinas
        this.ListadoCuentasBancarias = response.cuentasBancarias

        this.loadingService.hide();
      },
      (err) => {
        Swal.fire({
          title: '¡Error!',
          text: 'Error al buscar',
          icon: 'error'
        });
        this.loadingService.hide();
      }
    );*/
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


  // --------- FUNCIONALIDAD MODAL RELACION - OFICINAS------------- \\
  boolRelacionPoder: boolean = false;
  sentMOdal: InputModal = new InputModal();
  activateRelacionPoder(value: any) {
    console.log('obj', value.obj);
    if (value.action == true) {
      this.sentMOdal.type = value.option;
      this.sentMOdal.data = value.obj
      this.boolRelacionPoder = true;
    } else {
      this.boolRelacionPoder = false;
      this.loadLocalStorageData()
    }

  }


  nextPage() {
    this.loadingService.show();
    var representante = this.addValueForm.value;
    if (this.dataLocalStorage.option == 'CREATE') {

      //representante.relacionPoderRepresentante = []
      /*this.businessService.create_entidad(representante).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Creado!',
            text: 'Se creó exitosamente',
            icon: 'success'
          });
          const data = {
            option: 'EDIT',
            data: representante
          }
          localStorage.setItem('itemSelected', JSON.stringify(data));
          this.loadLocalStorageData()
          this.change_tabs('Profile')
          this.loadingService.hide();
        },
        (err) => {
          Swal.fire({
            title: '¡Error!',
            text: 'Error al agregar',
            icon: 'error'
          });
          this.loadingService.hide();
        }
      );*/
    } else if (this.dataLocalStorage.option == 'EDIT') {
      //representante.relacionPoderRepresentante = this.Listado_poderes
      /*this.businessService.update_entidad(representante.taxId, representante).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'Se actualizó exitosamente',
            icon: 'success'
          });

          this.loadLocalStorageData()
          this.loadingService.hide();
        },
        (err) => {
          Swal.fire({
            title: '¡Error!',
            text: 'Error al actualizar',
            icon: 'error'
          });
          this.loadingService.hide();
        }
      );*/
    }
  }

  deleteRelacion(value: any) {
    this.loadingService.show()
    /*this.businessService.delete_oficina(value.idOficina).subscribe(
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
    );*/
  }
  // --------- FUNCIONALIDAD MODAL RELACION - CUENTAS BANCARIAS------------- \\
  boolCuentasBancarias : boolean  = false;
  activateCuentasBancarias(value: any) {
    console.log('obj', value.obj);
    if (value.action == true) {
      this.sentMOdal.type = value.option;
      this.sentMOdal.data = value.obj
      this.boolCuentasBancarias = true;
    } else {
      this.boolCuentasBancarias = false;
      this.loadLocalStorageData()
    }

  }
  deleteCuentasBancarias(value: any) {
    this.loadingService.show()
    /*this.businessService.delete_cuentas_empresa(value.numeroCuenta).subscribe(
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
    );*/
  }

  // ------------- CALL LOADS --------- \

  list_documentos: any[] = [];
  tipo_documentos_entidad() {
    this.list_documentos = [
      {
        name: 'RUC - Regitro Único del Contribuyente',
        value: 'RUC'
      },
      {
        name: 'RTN - Registro Tributario Nacional Numérico',
        value: 'RTN',
      },
      {
        name: 'CIF - Código de Identificación Fiscal',
        value: 'CIF'
      },
      {
        name: 'NIT - Número de Identificación Tributaria',
        value: 'NIT'
      },
      {
        name: 'TIN - Tax Identification Number',
        value: 'TIN'
      },
      {
        name: 'NIF - Número de Identificación Fiscal',
        value: 'NIF'
      },
      {
        name: 'RNP - Registro Nacional de Proveedores',
        value: 'RNP'
      },
      {
        name: 'NIE - Número de Identificación de Empresa',
        value: 'NIE'
      },
      {
        name: 'NRM - Número de Registro Mercantil',
        value: 'NRM'
      },
      {
        name: 'RUE - Registro Único de Empresas',
        value: 'RUE'
      },
      {
        name: 'NIC - Número de Identificación Comercial',
        value: 'NIC'
      },
      {
        name: 'CIE - Código de Identificación Empresarial',
        value: 'CIE'
      },
    ];
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


}
