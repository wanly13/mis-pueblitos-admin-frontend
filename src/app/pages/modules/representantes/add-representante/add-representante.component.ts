import { SubEventoService } from './../../../../services/subevento.service';
import { EventoService } from './../../../../services/evento.service';
import { LugarService } from 'src/app/services/lugar.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { InputModal } from '../add-relacion-poder/add-relacion-poder.component';
import Swal from 'sweetalert2';
import { S3Service } from 'src/app/services/S3.service';
import {
  DtoSubEvento,
  DtoSubEventoDetalle,
} from '../estructure/dtoRepresentante';

@Component({
  selector: 'app-add-representante',
  templateUrl: './add-representante.component.html',
  styleUrls: ['./add-representante.component.scss'],
})
export class AddRepresentanteComponent {
  selectedFile: File;
  // --------------- Diseño Formulario --------------- \\
  input_class: any =
    'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer';
  label_class: any =
    'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';

  addValueForm: FormGroup;
  addValueSubEvento: FormGroup;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private lugarService: LugarService,
    private eventoService: EventoService,
    private s3Service: S3Service,
    private subEventoService: SubEventoService
  ) {
    this.addValueForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      nombre: [{ value: null, disabled: false }],
      descripcion: [{ value: null, disabled: false }],
      foto: [{ value: null, disabled: false }],
      ubicacionExacta: [{ value: null, disabled: false }],
      fechaInicio: [{ value: null, disabled: false }],
      fechaFin: [{ value: null, disabled: false }],
      lugarId: [{ value: null, disabled: false }],
    });

    this.addValueSubEvento = this.fb.group({
      id: [{ value: null, disabled: false }],
      nombre: [{ value: null, disabled: false }],
      descripcion: [{ value: null, disabled: false }],
      foto: [{ value: null, disabled: false }],
      dia: [{ value: null, disabled: false }],
      horaInicio: [{ value: null, disabled: false }],
      horaFin: [{ value: null, disabled: false }],
      eventoId: [{ value: null, disabled: false }],
    });
  }

  ngOnInit() {
    this.loadLocalStorageData();
    this.general_loads();
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }

  // --------------- Loads Values --------------- \\
  general_loads() {
    this.load_lugares();
    this.get_listado_subeventos();
  }

  bool_search_api: boolean = true;

  ngOnDestroy() {
    localStorage.removeItem('itemSelected');
  }

  dataLocalStorage: any;
  loadLocalStorageData() {
    this.dataLocalStorage = JSON.parse(localStorage.getItem('itemSelected'));
    console.log('this.dataLocalStorage', this.dataLocalStorage);
    if (this.dataLocalStorage.option == 'EDIT') {
      this.addValueForm.patchValue(this.dataLocalStorage.data);
      console.log('this.addValueForm', this.addValueForm.value);
      this.bool_search_api = true;
    } else if (this.dataLocalStorage.option == 'CREATE') {
      this.addValueForm.patchValue({});
    }
  }

  // --------- FUNCIONALIDAD TABS------------- \\
  tab_selected: any = 'Evento';
  DesignTabClassSelected: any =
    'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group';
  DesignIconClassSelected: any =
    'w-4 h-4 me-2 text-blue-600 dark:text-blue-500';
  DesignTabClassNotSelected: any =
    'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group';
  DesignIconClassNotSelected: any =
    'w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300';
  change_tabs(type: any) {
    this.tab_selected = type;
  }

  showSelectedTab(value: any, tabSelected: any) {
    if (tabSelected == value) {
      return [this.DesignTabClassSelected, this.DesignIconClassSelected];
    } else {
      return [this.DesignTabClassNotSelected, this.DesignIconClassNotSelected];
    }
  }

  Listado_subeventos: DtoSubEvento[] = [];
  Listado_subEventoDetalles: DtoSubEventoDetalle[] = [];
  get_listado_subeventos() {
    this.loadingService.show();
    this.Listado_subeventos = [];
    const id = this.addValueForm.value.id;
    this.subEventoService.get_subEventoByEvento(id).subscribe(
      (response: any) => {
        this.Listado_subeventos = response;
        this.Listado_subeventos.map((subevento) => {
          this.Listado_subEventoDetalles.push(...subevento.subEventoDetalles);
        });
        console.log(
          'this.Listado_subEventoDetalles',
          this.Listado_subEventoDetalles
        );
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }

  // --------- FUNCIONALIDAD MODAL RELACION - PODER------------- \\
  boolRelacionPoder: boolean = false;
  sentMOdal: InputModal = new InputModal();
  activateRelacionPoder(value: any) {
    if (value.action == true) {
      this.sentMOdal.type = value.option;
      value.obj.eventoId = this.addValueForm.value.id;
      this.sentMOdal.data = value.obj;
      this.boolRelacionPoder = true;
    } else {
      this.boolRelacionPoder = false;
      this.loadLocalStorageData();
      /* if (value.data) {
        console.log("this.sentMOdal.data", value);

        this.Listado_poderes.push(value.data)
      } */
    }
  }

  quitarEspacios(texto: string): string {
    return texto.replace(/\s/g, '-');
  }

  quitarTildes(texto: string): string {
    const mapaDeTildes: { [key: string]: string } = {
      á: 'a',
      é: 'e',
      í: 'i',
      ó: 'o',
      ú: 'u',
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U',
      ü: 'u',
      Ü: 'U',
      ñ: 'n',
      Ñ: 'N',
    };

    return texto.replace(
      /[áéíóúÁÉÍÓÚüÜñÑ]/g,
      (letra) => mapaDeTildes[letra] || letra
    );
  }

  async nextPage() {
    this.loadingService.show();
    var evento = this.addValueForm.value;
    var temp_lugar = this.list_lugares.find((x) => x.id == evento.lugarId);
    console.log('temp_lugar', temp_lugar);
    var departamentoNombre = temp_lugar.departamento.nombre;

    try {
      if (this.selectedFile) {
        this.s3Service.setDirName(
          `departamento/${this.quitarTildes(departamentoNombre)}/${
            temp_lugar.nombre
          }/eventos/${this.quitarEspacios(evento.nombre)}`
        );
        const file = this.selectedFile;
        evento.foto = await this.s3Service.uploadImage(file);
      }
    } catch (error) {
      Swal.fire({
        title: '¡Error!',
        text: 'Error al agregar',
        icon: 'error',
      });
      this.loadingService.hide();
    }

    if (this.dataLocalStorage.option == 'CREATE') {
      delete evento.id;
      this.eventoService.create_evento(evento).subscribe(
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
          this.change_tabs('Poderes');
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
    } else if (this.dataLocalStorage.option == 'EDIT') {
      this.eventoService.update_evento(evento.id, evento).subscribe(
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
    }
  }

  deleteSubEventoDetalle(value: any) {}

  deleteSubEvento(value: any) {
    this.loadingService.show();
    this.subEventoService.delete_subEvento(value.id).subscribe(
      (response: any) => {
        Swal.fire({
          title: '¡Borrado!',
          text: 'Se eliminó exitosamente',
          icon: 'success',
        });

        this.loadLocalStorageData();
        this.loadingService.hide();
      },
      (err) => {
        Swal.fire({
          title: '¡Error!',
          text: 'Error al eliminar',
          icon: 'error',
        });

        this.loadingService.hide();
      }
    );
  }

  save_representante(value: any) {
    console.log(this.addValueForm.value);

    if (this.dataLocalStorage.option == 'CREATE') {
      console.log('agregamos');
    } else {
      console.log('actualizamos');
    }
  }

  show_error(obj: any) {
    Swal.fire({
      title: obj.title,
      text: obj.message,
      icon: obj.icon,
    });
  }

  // ------------- CALL LOADS --------- \\

  list_lugares: any[] = [];
  load_lugares() {
    this.loadingService.show();
    this.list_lugares = [];
    this.lugarService.get_listado_lugares().subscribe(
      (response: any) => {
        this.list_lugares = response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }
}
