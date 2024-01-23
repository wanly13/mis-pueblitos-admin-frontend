import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { BusinessService } from 'src/app/services/business.service';
import Swal from 'sweetalert2';
import { InputModal } from '../add-oficinas/add-oficinas.component';

@Component({
  selector: 'app-add-cuentas-bancarias',
  templateUrl: './add-cuentas-bancarias.component.html',
  styleUrls: ['./add-cuentas-bancarias.component.scss']
})
export class AddCuentasBancariasComponent {

  @Output() messageEvent = new EventEmitter<any>();
  @Input() TypeModal: InputModal = new InputModal();

  addValueForm: FormGroup
  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private businessService: BusinessService,
  ) {
    this.addValueForm = this.fb.group({
      taxIdEmpresa: [{ value: null, disabled: false }],
      moneda: [{ value: null, disabled: false }],
      tipoCuenta: [{ value: null, disabled: false }],
      uso: [{ value: null, disabled: false }],
      notas: [{ value: null, disabled: false }],
      numeroCuenta : [{ value: null, disabled: false }],
    });
  }

  ngOnInit() {
    this.general_loads();
    console.log("TypeModal", this.TypeModal);
    this.addValueForm.get('taxIdEmpresa').setValue(this.TypeModal.data.taxId)
    this.addValueForm.patchValue(this.TypeModal.data)
  }


  CloseModal(value) {
    console.log(value);


    this.messageEvent.emit(value);
  }


  saveFormulario(forms: any) {
    this.loadingService.show()

    if (this.TypeModal.type == 'CREATE') {
      this.businessService.create_cuentas_empresa(this.addValueForm.value).subscribe(
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
      this.businessService.update_cuentas_empresa(this.addValueForm.value.numeroCuenta, this.addValueForm.value).subscribe(
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

  list_monedas: any[] = []
  list_tipo_cuenta: any[] = []
  general_loads() {
    this.load_monedas();
    this.load_tipo_cuenta()
    //this.load_entidades();
    //this.load_tipo_firmantes();
    //this.load_poder();
    //this.load_estado_poder();
  }
  load_monedas() {
    this.list_monedas = [
      {
        value : 'COLÓN',
        name : 'COLÓN'
      },
      {
        value : 'DÓLAR',
        name : 'USD'
      },
      
    ]
  }
  load_tipo_cuenta() {
    this.list_tipo_cuenta = [
      {
        value : 'CORRIENTE',
        name : 'Corriente'
      },
    ]
  }
}
