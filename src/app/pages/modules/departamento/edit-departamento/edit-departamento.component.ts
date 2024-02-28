import { DepartamentosService } from '../../../../services/departamentos.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import Swal from 'sweetalert2';
import { DtoDepartamento } from '../structure/DtoDepartamento';
import { S3Service } from 'src/app/services/S3.service';

@Component({
  selector: 'app-edit-departamento',
  templateUrl: './edit-departamento.component.html',
  styleUrls: ['./edit-departamento.component.scss'],
})
export class EditDepartamentoComponent {
  selectedFile: File;

  // --------------- Diseño Formulario --------------- \\
  input_class: any =
    'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer';
  label_class: any =
    'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';

  addValueForm: FormGroup;

  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private departamentosService: DepartamentosService,
    private s3Service: S3Service
  ) {
    this.addValueForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      nombre: [{ value: null, disabled: false }],
      descripcion: [{ value: null, disabled: false }],
      foto: [{ value: null, disabled: false }],
    });
  }

  ngOnInit() {
    this.loadLocalStorageData();
    this.bool_search_api = true;
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }

  // --------------- Loads Values --------------- \\
  general_loads() {}

  bool_search_api: boolean = false;

  ngOnDestroy() {
    localStorage.removeItem('itemSelected');
  }

  dataLocalStorage: any;

  loadLocalStorageData() {
    this.dataLocalStorage = JSON.parse(localStorage.getItem('itemSelected'));
    console.log('this.dataLocalStorage', this.dataLocalStorage);
    if (this.dataLocalStorage.option == 'EDIT') {
      this.bool_search_api = true;
      this.dataLocalStorage.data.foto_input = null;
      this.addValueForm.patchValue(this.dataLocalStorage.data);
      this.loadingService.hide();
    } else if (this.dataLocalStorage.option == 'CREATE') {
      this.loadingService.hide();
      this.bool_search_api = true;
      this.addValueForm.patchValue({});
    }
  }

  // --------- FUNCIONALIDAD TABS------------- \\
  async nextPage() {
    this.loadingService.show();

    var departamento: DtoDepartamento = this.addValueForm.value;
    try {
      if (this.selectedFile) {
        this.s3Service.setDirName(`departamento/${departamento.nombre}`);
        departamento.foto = await this.s3Service.uploadImage(this.selectedFile);
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
      delete departamento.id;
      this.departamentosService.create_departamento(departamento).subscribe(
        (response: any) => {
          console.log('response', response);
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
          this.loadingService.hide();
        },
        (err) => {
          console.log('err', err);
          Swal.fire({
            title: '¡Error!',
            text: 'Error al agregar',
            icon: 'error',
          });
          this.loadingService.hide();
        }
      );
    } else if (this.dataLocalStorage.option == 'EDIT') {
      this.departamentosService
        .update_departamento(departamento.id, departamento)
        .subscribe(
          (response: any) => {
            Swal.fire({
              title: '¡Actualizado!',
              text: 'Se actualizó exitosamente',
              icon: 'success',
            });
            const data = {
              option: 'EDIT',
              data: response,
            };
            localStorage.setItem('itemSelected', JSON.stringify(data));
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
}
