import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Diseño inputs formulario
  inputNormalLabel: any = "block pl-1 pb-[.1em] text-xs font-medium text-blue-900  ";
  inputNormalIn: any = "bg-white border border-gray-300 py-[2.5%] w-[60vw] md:w-[40vw]  lg:w-[20vw] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block  p-[2%]  disabled:bg-blue-100 border-blue-100 ";

  // USUARIO LOGIN
  usuario: any;
  password: any;

  verClave: boolean = false;
  verClaveTypeText: string = "password";

  constructor(
    private router: Router,
    private loginService: LoginService,
    private loadingService: LoadingService,


  ) {
    // super()
  }
  ngOnInit() {
    //console.log("estamos aqui");
    // this.login()

  }
  seleccionarVerClave() {
    this.verClave = !this.verClave;
    this.verClaveTypeText = (this.verClave) ? "text" : "password";
  }

  login() {
    this.loadingService.show();
    if (this.isEmpty(this.usuario, this.password)) {
      Swal.fire({
        icon: 'error',
        width: 400,
        title: "Complete todos los campos",
        showConfirmButton: true,
        customClass: {
          confirmButton: 'error-confirm-buttom',
          icon: 'error-icon'
        }
      })
      this.loadingService.hide();
      return;
    }
    /* const data = {
      "user": "Wanly",
      "password": "wanly2023"
    } */
    const data = {
      "userName": this.usuario,
      "password": this.password
    }
    
    this.loginService.login_service(data).subscribe(
      response => {
        this.loadingService.hide();
        sessionStorage.setItem('AuthorizacionPortalRansa', JSON.stringify(response[0]));
        this.router.navigate(['/home'])

      }, err => {
        this.loadingService.hide();
        Swal.fire({
          icon: 'error',
          width: 400,
          title: "Error de autenticación.",
          showConfirmButton: true,
          customClass: {
            confirmButton: 'error-confirm-buttom',
            icon: 'error-icon'
          }
        })
      }
    )
  }
  isEmpty(user: any, password: any): boolean {
    if (user == null || password == null) {
      return true;
    }
    if (user == undefined || password == undefined) {
      return true;
    }
    if (user.trim() === '' || password.trim() === '') {
      return true;
    }
    return false;
  }
}
