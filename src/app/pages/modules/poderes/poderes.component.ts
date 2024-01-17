import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import { RepresentantesService } from 'src/app/services/representantes.service';
import { DtoEmpresa } from '../business/structure/DtoEmpresa';
import Swal from 'sweetalert2';
import { PoderesService } from 'src/app/services/poderes.service';
import { DtoPoderes } from './structure/DtoPoderes';
import { TitleService } from '../../navar/navar.service';

@Component({
  selector: 'app-poderes',
  templateUrl: './poderes.component.html',
  styleUrls: ['./poderes.component.scss']
})
export class PoderesComponent {


  // --------------- Diseño Formulario --------------- \\
  input_class: any = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  label_class: any = 'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'


  // Filter of Search
  searchValueForm: FormGroup = this.fb.group({
    pais: [{ value: 'PER', disabled: false }],
    /* empresa: [{ value: null, disabled: false }],
    poder: [{ value: null, disabled: false }],
    tipoFirmante: [{ value: null, disabled: false }],
    estadoPoder: [{ value: null, disabled: false }], */

  });;

  constructor(
    public router: Router,
    private poderesService: PoderesService,
    private representantesService: RepresentantesService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private titleService: TitleService,
  ) {
  }

  ngOnInit() {
    this.search_entidad(this.searchValueForm.value);
    this.general_loads();
    this.transferedDataToNavar({ title: 'Listado de Poderes' })
  }

  // ---------- LOADS FILTERS EN LIST ---------- \\
  general_loads() {
    //this.load_paises();

  }
  // ---------- CHANGE NAVAR ---------- \\  
  transferedDataToNavar(value: any): void {
    console.log("CAMBIO");

    this.titleService.setTitle(value);
  }


  // ---------- SEARCH ---------- \\
  list_representantes: DtoPoderes[] = []
  search_entidad(form: any) {
    this.loadingService.show();
    this.list_representantes = []
    this.poderesService.search_entidades(form).subscribe(
      (response: DtoPoderes[]) => {

        this.list_representantes = response;
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
    this.transferedDataToNavar({ title: 'Editar Poder' })
    this.router.navigate(['/home/add-poderes'])
  }

  goToCreate() {

    const data = {
      option: 'CREATE',
      data: {}
    }
    localStorage.setItem('itemSelected', JSON.stringify(data));
    this.transferedDataToNavar({ title: 'Agregar Poder' })
    this.router.navigate(['/home/add-poderes'])
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
      title: "Está seguro?",
      text: "Se eliminarán todos los datos del poder!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.show()
        this.poderesService.delete_entidad(item.idPoder).subscribe(
          (response: any) => {
            swalWithBootstrapButtons.fire({
              title: "Borrado!",
              text: "Se eliminó correctamente.",
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













  // ----------- CALL LOADS ------ \\
  /* list_representantes: DtoRepresenante[] = []
  load_list_representantes() {
    this.loadingService.show();
    this.list_representantes = []
    this.representantesService.get_listado_representantes().subscribe(
      (response: DtoRepresenante[]) => {
        this.list_representantes = response;
        this.loadingService.hide();
      },
      err => {
        this.loadingService.hide()
      }
    )
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
  } */
  /* list_paises: any[] = [];
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
  } */

}
