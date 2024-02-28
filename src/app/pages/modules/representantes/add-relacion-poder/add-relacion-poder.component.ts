import { SubEventoService } from './../../../../services/subevento.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { S3Service } from 'src/app/services/S3.service';
//import { BusinessService } from 'src/app/services/departamento.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-relacion-poder',
  templateUrl: './add-relacion-poder.component.html',
  styleUrls: ['./add-relacion-poder.component.scss'],
})
export class AddRelacionPoderComponent {
  selectedFile: File;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() TypeModal: InputModal = new InputModal();

  addValueForm: FormGroup;

  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private subEventoService: SubEventoService,
    private s3Service: S3Service
  ) {
    this.addValueForm = this.fb.group({
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
    console.log('TypeModal', this.TypeModal);

    if (this.TypeModal.type == 'EDIT') {
      if (this.TypeModal.data.horaFin.includes('+')) {
        this.TypeModal.data.horaInicio =
          this.TypeModal.data.horaInicio.split('+')[0];
        this.TypeModal.data.horaFin = this.TypeModal.data.horaFin.split('+')[0];
      } else {
        this.TypeModal.data.horaInicio =
          this.TypeModal.data.horaInicio.split('-')[0];
        this.TypeModal.data.horaFin = this.TypeModal.data.horaFin.split('-')[0];
      }
    }

    this.addValueForm.patchValue(this.TypeModal.data);
  }

  CloseModal(value) {
    console.log(value);
    if (this.TypeModal.type == 'CREATE' && this.saved == false) {
      this.messageEvent.emit(value);
      /*if (this.ArchivosCargados.length == 0) {
        this.messageEvent.emit(value);
      } else {
        //this.deleteFile(this.ArchivosCargados);
      }*/
    } else {
      this.messageEvent.emit(value);
    }
  }

  saved: boolean = false;
  async saveFormulario(forms: any) {
    this.loadingService.show();

    if (this.TypeModal.type == 'CREATE') {
      console.log();
      var data = this.addValueForm.value;

      /*this.representantesService.create_relacion_poder(data).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Agregado!',
            text: 'Se agregó exitosamente',
            icon: 'success'
          });
          this.saved = true;
          this.CloseModal({ action: false })
          this.loadingService.hide();
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: '¡Error!',
            text: 'Error al agregar',
            icon: 'error'
          });
          this.loadingService.hide();
        }
      );*/
    } else if (this.TypeModal.type == 'EDIT') {
      var data = this.addValueForm.value;
      console.log(data);
      this.subEventoService
        .update_subEvento(this.addValueForm.value.id, data)
        .subscribe(
          (response: any) => {
            Swal.fire({
              title: '¡Editado!',
              text: 'Se editó exitosamente',
              icon: 'success',
            });
            this.saved = true;
            this.CloseModal({ action: false });
            this.loadingService.hide();
          },
          (err) => {
            Swal.fire({
              title: '¡Error!',
              text: 'Error al editar',
              icon: 'error',
            });
            this.loadingService.hide();
          }
        );
    }
  }

  // ------------------ IMPLEMENTACION DE ARCHIVOS ---------------------- \\

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}

export class InputModal {
  type: string;
  data: any;
}
