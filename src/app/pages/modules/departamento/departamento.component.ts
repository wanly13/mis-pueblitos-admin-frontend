import { DepartamentosService } from '../../../services/departamentos.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { DtoDepartamento } from './structure/DtoDepartamento';
import Swal from 'sweetalert2';
//import { BusinessService } from 'src/app/services/departamento.service';
import { TitleService } from '../../navar/navar.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss'],
})
export class DepartamentoComponent {

  // --------------- Diseño Formulario --------------- \\
  input_class: any = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  label_class: any = 'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'


  // Filter of Search
  searchValueForm: FormGroup = this.fb.group({
    pais: [{ value: 'PER', disabled: false }],
    page: [0],
    pageSize: [10],
    /* empresa: [{ value: null, disabled: false }],
    poder: [{ value: null, disabled: false }],
    tipoFirmante: [{ value: null, disabled: false }],
    estadoPoder: [{ value: null, disabled: false }], */

  });

  constructor(
    public router: Router,
    //private businessService: BusinessService,
    private departamentosService:DepartamentosService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private titleService: TitleService,
  ) {
  }

  ngOnInit() {
    this.search_entidad(this.searchValueForm.value);
    //this.general_loads();
    this.transferedDataToNavar({ title: 'Listado de Departamentos' })
  }

  // ---------- LOADS FILTERS EN LIST ---------- \\
  general_loads() {


  }
  // ---------- CHANGE NAVAR ---------- \\
  transferedDataToNavar(value: any): void {
    console.log("CAMBIO");

    this.titleService.setTitle(value);
  }


  // ---------- SEARCH ---------- \\
  list_representantes: DtoDepartamento[] = []
  search_entidad(form: any) {
    this.loadingService.show();
    this.list_representantes = []
    this.departamentosService.get_listado_departamentos().subscribe(
      (response: any) => {
        this.list_representantes = response;
        if (this.list_representantes.length == 0) {
          Swal.fire({ text: 'No se encontraron más registros' });
          this.continuePagination('preview')
        }
        console.log(this.list_representantes);
        this.loadingService.hide();
      },
      err => {
        this.loadingService.hide()
      }
    )
  }

  // ----------- ACTIONS EDIT AND DELETE ------- \\

  goToEdit(item: any) {

    const data = {
      option: 'EDIT',
      data: item
    }
    localStorage.setItem('itemSelected', JSON.stringify(data));
    this.transferedDataToNavar({ title: 'Editar Empresa' })
    this.router.navigate(['/home/add-departament'])
  }

  goToCreate() {

    const data = {
      option: 'CREATE',
      data: {}
    }
    localStorage.setItem('itemSelected', JSON.stringify(data));
    this.transferedDataToNavar({ title: 'Agregar Departamento' })
    this.router.navigate(['/home/add-departament'])
  }

  deleteItem(item: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
        cancelButton: "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "Se borrarán los datos de este elemento.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.show()
        this.departamentosService.delete_departamento(item.id).subscribe(
          (response: any) => {
            swalWithBootstrapButtons.fire({
              title: "Borrado!",
              text: "Se se elimino la empresa correctamente.",
              icon: "success"
            });

            this.search_entidad(this.searchValueForm.value)
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
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    });
  }






  // --------------- PAGINATION IMPLEMENTATION ------------- \\
  continuePagination(value: any) {
    if (value == 'preview') {
      const current = this.searchValueForm.get('page').value;
      if (current > 0) {
        this.searchValueForm.get('page').setValue(current - 1)
        this.search_entidad(this.searchValueForm.value);
      }

    } else if (value == 'next') {
      const current = this.searchValueForm.get('page').value;

      this.searchValueForm.get('page').setValue(current + 1)
      this.search_entidad(this.searchValueForm.value);

    }
  }








  list_paises: any[] = [];
}
