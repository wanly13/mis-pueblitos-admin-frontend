import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputModal } from '../../representantes/add-relacion-poder/add-relacion-poder.component';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import Swal from 'sweetalert2';
import { EntidadesService } from 'src/app/services/entidades.service';

@Component({
  selector: 'app-add-sectoristas',
  templateUrl: './add-sectoristas.component.html',
  styleUrls: ['./add-sectoristas.component.scss']
})
export class AddSectoristasComponent {

  @Output() messageEvent = new EventEmitter<any>();
  @Input() TypeModal: InputModal = new InputModal();

  addValueForm: FormGroup
  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private entidadesServices: EntidadesService
  ) {
    this.addValueForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      taxIdBanco: [{ value: null, disabled: false }],
      nombres: [{ value: null, disabled: false }],
      apellidoPaterno: [{ value: null, disabled: false }],
      apellidoMaterno: [{ value: null, disabled: false }],
      correo: [{ value: null, disabled: false }],
      contacto: [{ value: null, disabled: false }],
      notas: [{ value: null, disabled: false }],
    });
  }

  ngOnInit() {
    this.general_loads();
    console.log("TypeModal", this.TypeModal);
    this.addValueForm.patchValue(this.TypeModal.data)
    this.addValueForm.get('taxIdBanco').setValue(this.TypeModal.data.taxId)
  }


  CloseModal(value) {
    console.log(value);


    this.messageEvent.emit(value);
  }


  saveFormulario(forms: any) {
    this.loadingService.show()

    if (this.TypeModal.type == 'CREATE') {
      const formValueWithoutId = { ...this.addValueForm.value };
      delete formValueWithoutId.id;
      this.entidadesServices.create_relacion_sectorista(formValueWithoutId).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Agregado!',
            text: 'Se agrego exitosamente',
            icon: 'success'
          });
          this.CloseModal({ action: false })
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
      );
    }
    else if (this.TypeModal.type == 'EDIT') {
      this.entidadesServices.update_relacion_sectorista(this.addValueForm.value.id, this.addValueForm.value).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Editado!',
            text: 'Se editó exitosamente',
            icon: 'success'
          });
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
  }


  general_loads() {
    //this.load_empresas();
    //this.load_entidades();
    //this.load_tipo_firmantes();
    //this.load_poder();
    //this.load_estado_poder();
  }

  /*list_empresas: any[] = [];

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
  load_oficinas_empresa(value: any) {
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
  } */
}
