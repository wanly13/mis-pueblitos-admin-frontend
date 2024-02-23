import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
//import { BusinessService } from 'src/app/services/business.service';
import { RepresentantesService } from 'src/app/services/representantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-relacion-poder',
  templateUrl: './add-relacion-poder.component.html',
  styleUrls: ['./add-relacion-poder.component.scss']
})


export class AddRelacionPoderComponent {
  @Output() messageEvent = new EventEmitter<any>();
  @Input() TypeModal: InputModal = new InputModal();


  addValueForm: FormGroup
  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private representantesService: RepresentantesService,
    //private businessService: BusinessService,
  ) {
    this.addValueForm = this.fb.group({

      documentoIdentidad: [{ value: null, disabled: false }],
      idEstadoPoder: [{ value: null, disabled: false }],
      idPoder: [{ value: null, disabled: false }],
      idRelacionPoder: [{ value: null, disabled: false }],
      idTipoRepresentante: [{ value: null, disabled: false }],
      nota: [{ value: null, disabled: false }],
      taxIdEmpresa: [{ value: null, disabled: false }],
      taxIdEntidad: [{ value: null, disabled: false }],
      idOficina: [{ value: null, disabled: false }],
    });
  }
  ngOnInit() {
    this.general_loads();
    console.log("TypeModal", this.TypeModal);
    this.addValueForm.patchValue(this.TypeModal.data)
    this.ArchivosCargados = this.TypeModal.data.archivo ? this.TypeModal.data.archivo : []
    this.load_oficinas_empresa(this.addValueForm.value.taxIdEmpresa)
  }


  CloseModal(value) {
    console.log(value);
    if (this.TypeModal.type == 'CREATE' && this.saved == false) {
      if (this.ArchivosCargados.length == 0) {
        this.messageEvent.emit(value);
      } else {
        this.deleteFile(this.ArchivosCargados)
      }
    } else {
      this.messageEvent.emit(value);
    }

  }

  saved: boolean = false
  async saveFormulario(forms: any) {
    this.loadingService.show();

    if (this.TypeModal.type == 'CREATE') {
      console.log();
      var data = this.addValueForm.value
      data.archivo = this.ArchivosCargados

      this.representantesService.create_relacion_poder(data).subscribe(
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
      );
    } else if (this.TypeModal.type == 'EDIT') {
      var data = this.addValueForm.value
      data.archivo = this.ArchivosCargados


      this.representantesService.update_relacion_poder(this.addValueForm.value.idRelacionPoder, data).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Editado!',
            text: 'Se editó exitosamente',
            icon: 'success'
          });
          this.saved = true;
          this.CloseModal({ action: false })
          this.loadingService.hide();
        },
        (err) => {
          Swal.fire({
            title: '¡Error!',
            text: 'Error al editar',
            icon: 'error'
          });
          this.loadingService.hide();
        }
      );
    }
    console.log("LISTA IMAGENES: ", this.ArchivosCargados);
  }

  // ------------------ IMPLEMENTACION DE ARCHIVOS ---------------------- \\
  ArchivosCargados: any[] = [];

  onFileSelected(event: any): void {
    console.log("event.target.files:", event.target.files);
    const file = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File): any {
    this.loadingService.show()
    this.representantesService.uploadFile(file).subscribe(
      (response) => {
        console.log("RESPUESTA: ", response);

        this.ArchivosCargados.push(response);
        this.loadingService.hide()
      },
      (error) => {
        this.loadingService.hide()
        console.error('Error uploading file:', error)
      }
    );
  }

  deleteFile(file: any[]): any {
    this.loadingService.show()

    this.representantesService.deleteFile(file).subscribe(
      (response) => {
        console.log("RESPUESTA: ", response);
        this.saved = true;
        this.CloseModal({ action: false })
        this.loadingService.hide()
      },
      (error) => {
        console.error('Error uploading file:', error)
        this.loadingService.hide()
      }
    );
  }

  deleteImage(item: any) {
    this.loadingService.show()
    var listDelete = []
    listDelete.push(item)
    this.representantesService.deleteFile(listDelete).subscribe(
      (response) => {
        response.response.forEach(element => {
          this.ArchivosCargados = this.ArchivosCargados.filter(archivo => archivo.nombre !== element.name);
        });
        const data = this.addValueForm.value;
        data.archivo = this.ArchivosCargados
        this.representantesService.update_relacion_poder(this.addValueForm.value.idRelacionPoder, data).subscribe(
          (response: any) => {
            this.loadingService.hide()
          },
          (err) => {
            this.loadingService.hide()
          }
        );
      },
      (error) => {
        console.error('Error uploading file:', error)
        this.loadingService.hide()
      }
    );
  }
  imagenSeleccionada: any = null;
  viewImage(item: any) {
    this.imagenSeleccionada = item;
  }
  closeImageView(): void {
    // Cierra la vista de la imagen
    this.imagenSeleccionada = null;
  }

  general_loads() {
    this.load_empresas();
    this.load_entidades();
    this.load_tipo_firmantes();
    this.load_poder();
    this.load_estado_poder();
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
  list_entidades: any[] = [];
  load_entidades() {
    this.loadingService.show();
    this.list_entidades = []
    this.representantesService.get_listado_entidades().subscribe(
      (response: any) => {
        this.list_entidades = response;
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
        this.list_poder = response;
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
        this.list_estado_poder = response;
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
        this.list_tipo_firmantes = response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }
  list_oficinas: any[] = [];
  load_oficinas_empresa(value: any){
    return this.list_oficinas;
  }
  /*load_oficinas_empresa(value: any) {
    this.loadingService.show();
    this.list_oficinas = []
    this.businessService.get_oficinas_empresa(value).subscribe(
      (response: any) => {
        this.list_oficinas = response;
        this.loadingService.hide();
      },
      (err) => {
        this.loadingService.hide();
      }
    );
  }*/


}

export class InputModal {
  type: string
  data: any
}
