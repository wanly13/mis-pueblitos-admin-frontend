import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoadingService } from 'src/app/general-functions/loading/loadings/loading-service.service';

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
     /*this.loadingService.show();
     if (this.isEmpty(this.usuario, this.password)) {
       this.error_function("Debe completar todos los campos");
       this.loadingService.hide();
       return;
     } */
    const data = {
      "user": "Wanly",
      "password": "wanly2023"
    }
    const data1 = {
      "user": this.usuario,
      "password": this.password
    }
    this.router.navigate(['/home'])
    /* this.loginService.login_service(data).subscribe(
      response => {
        this.loadingService.hide();
        console.log(response);

        sessionStorage.setItem('AuthorizacionPortalRepaglas', JSON.stringify(response.detail.usuario));
        //this.succes_function("Credenciales validados");
        this.router.navigate(['/home'])

      }, err => {
        //this.error_function("Error de Logeo")
      }
    ) */
  }

}
