import { DepartamentosService } from './../../../../services/departamentos.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import Swal from 'sweetalert2';
import { InputModal } from '../../representantes/add-relacion-poder/add-relacion-poder.component';
import { S3Service } from 'src/app/services/S3.service';
import { DtoCreateLugar } from '../structure/DtioEntity';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-edit-entities',
  templateUrl: './edit-entities.component.html',
  styleUrls: ['./edit-entities.component.scss'],
})
export class EditEntitiesComponent {
  selectedFoto: File;
  selectedVideo: File;

  // --------------- Diseño Formulario --------------- \\
  input_class: any =
    'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer';
  label_class: any =
    'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';

  addValueForm: FormGroup;
  addMotivosVisitaForm: FormGroup;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private departamentosService: DepartamentosService,
    private fb: FormBuilder,
    private lugarService: LugarService,
    private s3Service: S3Service
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

    this.addMotivosVisitaForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      nombre: [{ value: null, disabled: false }],
      descripcion: [{ value: null, disabled: false }],
      foto: [{ value: null, disabled: false }],
      lugarId: [{ value: null, disabled: false }],
    });
  }



  ngOnInit() {
    this.loadLocalStorageData();
    this.general_loads();
  }

  list_masDestacado: boolean[] = [true, false];

  // --------------- Loads Values --------------- \\
  general_loads() {
    this.departamentos();
  }

  bool_search_api: boolean = false;

  ngOnDestroy() {
    localStorage.removeItem('itemSelected');
  }

  dataLocalStorage: any;
  loadLocalStorageData() {
    this.dataLocalStorage = JSON.parse(localStorage.getItem('itemSelected'));
    console.log('this.dataLocalStorage', this.dataLocalStorage);
    if (this.dataLocalStorage.option == 'EDIT') {
      this.addValueForm.patchValue(this.dataLocalStorage.data);
      this.bool_search_api = true;
    } else if (this.dataLocalStorage.option == 'CREATE') {
      this.addValueForm.patchValue({});
      this.bool_search_api = true;
    }
  }

    // --------- FUNCIONALIDAD TABS------------- \\
    tab_selected: any = 'Lugar';
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

  // --------- FUNCIONALIDAD MODAL RELACION - PODER------------- \\
  boolAddSectoristas: boolean = false;
  sentMOdal: InputModal = new InputModal();
  activateRelacionPoder(value: any) {
    if (value.action == true) {
      this.sentMOdal.type = value.option;
      this.sentMOdal.data = value.obj;

      this.boolAddSectoristas = true;
    } else {
      this.boolAddSectoristas = false;
      this.loadLocalStorageData();
    }
  }

  onFotoSelected(event: Event) {
    this.selectedFoto = (event.target as HTMLInputElement).files[0];
    console.log('selectedFoto', this.selectedFoto);
  }

  onVideoSelected(event: Event) {
    this.selectedVideo = (event.target as HTMLInputElement).files[0];
    console.log('selectedVideo', this.selectedVideo);
  }

  quitarTildes(texto: string): string {
    const mapaDeTildes: {[key: string]: string} = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
        'ü': 'u', 'Ü': 'U', 'ñ': 'n', 'Ñ': 'N'
    };

    return texto.replace(/[áéíóúÁÉÍÓÚüÜñÑ]/g, letra => mapaDeTildes[letra] || letra);
  }
  departamentoNombre ={nombre:''};
  async nextPage() {
    this.loadingService.show();
    var lugar = this.addValueForm.value;
    lugar.masDestacado = lugar.masDestacado == 'true' ? true : false;

    try {
      if (this.selectedFoto) {
        this.departamentoNombre = this.list_departamentos.find(
          (departamento) => departamento.id == lugar.departamentoId
        );

        this.s3Service.setDirName(
          `departamento/${this.quitarTildes(this.departamentoNombre.nombre)}/${lugar.nombre}`
        );
        lugar.foto = await this.s3Service.uploadImage(this.selectedFoto);
      }
    } catch (err) {
      Swal.fire({
        title: '¡Error!',
        text: 'Error al agregar',
        icon: 'error',
      });
      this.loadingService.hide();
    }

    try {
      if (this.selectedVideo) {
        const departamentoNombre = this.list_departamentos.find(
          (departamento) => departamento.id == lugar.departamentoId
        );
        this.s3Service.setDirName(
          `departamento/${this.quitarTildes(departamentoNombre.nombre)}/${lugar.nombre}`
        );
        lugar.video = await this.s3Service.uploadImage(this.selectedVideo);
      }
    } catch (err) {
      Swal.fire({
        title: '¡Error!',
        text: 'Error al agregar',
        icon: 'error',
      });
      this.loadingService.hide();
    }

    if (this.dataLocalStorage.option == 'CREATE') {
      console.log('lugar', lugar);
      this.loadingService.hide();
      delete lugar.id;
      this.lugarService.create_lugar(lugar).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Creado!',
            text: 'Se creó exitosamente',
            icon: 'success',
          });
          const data = {
            option: 'EDIT',
            data: response,
          };
          localStorage.setItem('itemSelected', JSON.stringify(data));
          this.loadLocalStorageData();
          this.tab_selected = 'MotivosVisita';
          this.loadingService.hide();
        },
        (err) => {
          Swal.fire({
            title: '¡Error!',
            text: 'Error al agregar',
            icon: 'error',
          });
          this.loadingService.hide();
        }
      );
    } else if (this.dataLocalStorage.option == 'EDIT') {
      this.lugarService.update_lugar(lugar.id, lugar).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'Se actualizó exitosamente',
            icon: 'success',
          });

          this.loadLocalStorageData();
          this.loadingService.hide();
        },
        (err) => {
          Swal.fire({
            title: '¡Error!',
            text: 'Error al actualizar',
            icon: 'error',
          });
          this.loadingService.hide();
        }
      );
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

  async nextPageMotivosVisita() {
    this.loadingService.show();
    var motivosVisita = this.addMotivosVisitaForm.value;
    var lugar = this.addValueForm.value;
    try {
      if (this.selectedFoto) {
        this.s3Service.setDirName(
          `departamento/${this.quitarTildes(this.departamentoNombre.nombre)}/${lugar.nombre}`
        );
        motivosVisita.foto = await this.s3Service.uploadImage(this.selectedFoto);
      }
    } catch (err) {
      Swal.fire({
        title: '¡Error!',
        text: 'Error al agregar',
        icon: 'error',
      });
      this.loadingService.hide();
    }



  };

  deleteSectoristas(value: any) {
    this.loadingService.show();
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
    this.list_departamentos = [];
    this.departamentosService.get_listado_departamentos().subscribe(
      (response: any) => {
        this.list_departamentos = response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }
}
