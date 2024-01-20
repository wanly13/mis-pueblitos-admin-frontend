import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoadingService} from 'src/app/general-functions/loading/loadings/loading-service.service';
import {BusinessService} from 'src/app/services/business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-oficinas',
  templateUrl: './add-oficinas.component.html',
  styleUrls: ['./add-oficinas.component.scss']
})
export class AddOficinasComponent {
  @Output() messageEvent = new EventEmitter<any>();
  @Input() TypeModal: InputModal = new InputModal();

  addValueForm: FormGroup
  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private businessService: BusinessService,
  ) {
    this.addValueForm = this.fb.group({
      idOficina: [{value: null, disabled: false}],
      taxId: [{value: null, disabled: false}],
      oficina: [{value: null, disabled: false}],
      direccion: [{value: null, disabled: false}],
    });
  }

  ngOnInit() {
    this.general_loads();
    console.log("TypeModal", this.TypeModal);
    this.addValueForm.patchValue(this.TypeModal.data)
  }


  CloseModal(value) {
    console.log(value);


    this.messageEvent.emit(value);
  }


  saveFormulario(forms: any) {
    this.loadingService.show()

    if (this.TypeModal.type == 'CREATE') {
      this.businessService.create_oficina({"direccion":this.addValueForm.value.direccion,"oficina":this.addValueForm.value.oficina,"taxId":this.addValueForm.value.taxId}).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Agregado!',
            text: 'Se agrego exitosamente',
            icon: 'success'
          });
          this.CloseModal({action: false})
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
      this.businessService.update_oficina(this.addValueForm.value.idOficina, this.addValueForm.value).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Editado!',
            text: 'Se editó exitosamente',
            icon: 'success'
          });
          this.CloseModal({action: false})
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

export class InputModal {
  type: string
  data: Object
}


