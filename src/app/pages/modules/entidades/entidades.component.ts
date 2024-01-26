import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { EntidadesService } from 'src/app/services/entidades.service';
import { DtoEntidades } from './structure/DtioEntity';
import Swal from 'sweetalert2';
import { RepresentantesService } from 'src/app/services/representantes.service';
import { TitleService } from '../../navar/navar.service';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss']
})
export class EntidadesComponent {

  // --------------- Diseño Formulario --------------- \\
  input_class: any = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  label_class: any = 'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'


  // Filter of Search
  searchValueForm: FormGroup = this.fb.group({
    pais: [{ value: null, disabled: false }],
    page: [0],
    pageSize: [10],
    /* empresa: [{ value: null, disabled: false }],
    poder: [{ value: null, disabled: false }],
    tipoFirmante: [{ value: null, disabled: false }],
    estadoPoder: [{ value: null, disabled: false }], */

  });;

  constructor(
    public router: Router,
    private entidadesService: EntidadesService,
    private representantesService: RepresentantesService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private titleService: TitleService,
  ) {
  }

  ngOnInit() {
    this.search_entidad(this.searchValueForm.value);
    this.general_loads();
    this.transferedDataToNavar({ title: 'Listado de Bancos' })
  }

  // ---------- LOADS FILTERS EN LIST ---------- \\
  general_loads() {
    this.load_paises();

  }
  // ---------- CHANGE NAVAR ---------- \\  
  transferedDataToNavar(value: any): void {
    console.log("CAMBIO");

    this.titleService.setTitle(value);
  }

  // ---------- SEARCH ---------- \\
  list_representantes: DtoEntidades[] = []
  search_entidad(form: any) {
    this.loadingService.show();
    this.list_representantes = []
    this.entidadesService.search_entidades(form).subscribe(
      (response: any) => {
        console.log("LISTA: ", response);

        this.list_representantes = response.data;
        if (this.list_representantes.length == 0) {
          Swal.fire({ text: 'No se encontraron más registros' });
          this.continuePagination('preview')
        }
        this.loadingService.hide();
      },
      err => {
        this.loadingService.hide()
      }
    )
  }

  // ----------- ACTIONS EDIT AND DELETE ------- \\ 

  goToEdit(item: any) {
    console.log("SLECCIONADO:", item);

    const data = {
      option: 'EDIT',
      data: item
    }
    console.log("GUARDAR LOCAL: ", data);

    localStorage.setItem('itemSelected', JSON.stringify(data));
    this.transferedDataToNavar({ title: 'Editar Banco' })
    this.router.navigate(['/home/add-entity'])
  }

  goToCreate() {

    const data = {
      option: 'CREATE',
      data: {}
    }
    localStorage.setItem('itemSelected', JSON.stringify(data));
    this.transferedDataToNavar({ title: 'Agregar Banco' })
    this.router.navigate(['/home/add-entity'])
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
        this.entidadesService.delete_entidad(item.taxId).subscribe(
          (response: any) => {
            swalWithBootstrapButtons.fire({
              title: "Borrado!",
              text: "Se eliminó el Banco correctamente.",
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










  // ----------- CALL LOADS ------ \\

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
}
