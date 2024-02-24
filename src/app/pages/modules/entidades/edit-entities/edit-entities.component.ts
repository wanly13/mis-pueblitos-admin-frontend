import { DepartamentosService } from './../../../../services/departamentos.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import Swal from 'sweetalert2';
import { InputModal } from '../../representantes/add-relacion-poder/add-relacion-poder.component';
import { RepresentantesService } from 'src/app/services/representantes.service';

@Component({
  selector: 'app-edit-entities',
  templateUrl: './edit-entities.component.html',
  styleUrls: ['./edit-entities.component.scss']
})
export class EditEntitiesComponent {

  // --------------- Diseño Formulario --------------- \\
  input_class: any = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  label_class: any = 'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'


  addValueForm: FormGroup;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private departamentosService:DepartamentosService,
    private fb: FormBuilder,
    //private entidadesService: EntidadesService,
    private representantesService: RepresentantesService
  ) {

    this.addValueForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      nombre: [{ value: null, disabled: false }],
      descripcion: [{ value: null, disabled: false }],
      foto: [{ value: null, disabled: false }],
      video: [{ value: null, disabled: false }],
      masDestacado: [{ value: null, disabled: false }],
      departamentoId: [{ value: null, disabled: false }],
    });
  }

  ngOnInit() {
    this.loadLocalStorageData()
    this.general_loads()
  }

  list_masDestacado: boolean[] = [true, false];

  // --------------- Loads Values --------------- \\
  general_loads() {
    this.departamentos()

  }

  bool_search_api: boolean = false

  ngOnDestroy() {
    localStorage.removeItem('itemSelected')
  }

  dataLocalStorage: any;
  loadLocalStorageData() {

    this.dataLocalStorage = JSON.parse(localStorage.getItem('itemSelected'));
    console.log("this.dataLocalStorage", this.dataLocalStorage);
    if (this.dataLocalStorage.option == 'EDIT') {
      this.addValueForm.patchValue(this.dataLocalStorage.data)
      //this.ListadoSectoristas = this.dataLocalStorage.data.sectoristas
      console.log("LISTADO SECTORISTRAS>: ", this.ListadoSectoristas);

      this.bool_search_api = true
      //this.getDateRepresentante(this.dataLocalStorage.data)
    } else if (this.dataLocalStorage.option == 'CREATE') {
      this.addValueForm.patchValue({})
      this.ListadoSectoristas = []
      this.bool_search_api = true
    }
  }

  /*getDateRepresentante(value: any) {
    this.entidadesService.get_entidad(value.taxId).subscribe(
      (response: any) => {
        this.addValueForm.patchValue(response)
        this.ListadoSectoristas = response.sectoristas
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
    );
  }*/


  // --------- FUNCIONALIDAD TABS------------- \\
  ListadoSectoristas: any[] = []


  // --------- FUNCIONALIDAD MODAL RELACION - PODER------------- \\
  boolAddSectoristas: boolean = false;
  sentMOdal: InputModal = new InputModal();
  activateRelacionPoder(value: any) {

    if (value.action == true) {

      this.sentMOdal.type = value.option;
      this.sentMOdal.data = value.obj

      this.boolAddSectoristas = true;
    } else {
      this.boolAddSectoristas = false;
      this.loadLocalStorageData()

    }

  }


  nextPage() {
    this.loadingService.show();
    var representante = this.addValueForm.value;
    if (this.dataLocalStorage.option == 'CREATE') {
      console.log("representante", representante);
      this.loadingService.hide();
      //representante.relacionPoderRepresentante = []
      /*this.entidadesService.create_entidad(representante).subscribe(
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
      representante.relacionPoderRepresentante = this.ListadoSectoristas
      /*this.entidadesService.update_entidad(representante.taxId, representante).subscribe(
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

  deleteSectoristas(value: any) {
    this.loadingService.show()
    /*this.entidadesService.delete_relacion_sectorista(value.id).subscribe(
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
        console.log(err);

        Swal.fire({
          title: '¡Error!',
          text: err.error.message,
          icon: 'error'
        });

        this.loadingService.hide();
      }
    );*/
  }


  // ------------- CALL LOADS --------- \\
  list_departamentos: any[] = [];
  departamentos() {
    this.loadingService.show();
    this.list_departamentos = []
    this.departamentosService.get_listado_departamentos().subscribe(
      (response: any) => {
        this.list_departamentos = response;
        this.list_departamentos.push({ id: null, nombre: 'Madre de Dios' })
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );

  }

  /* list_estado_laboral: any[] = [];
  load_estados_laborales() {
    this.loadingService.show();
    this.list_estado_laboral = []
    this.ent.get_listado_estados_laborales().subscribe(
      (response: any) => {
        this.list_estado_laboral = response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  } */


  /* list_cargos: any[] = [];
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
  } */

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

  /*  list_empresas: any[] = [];
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
   } */

}
