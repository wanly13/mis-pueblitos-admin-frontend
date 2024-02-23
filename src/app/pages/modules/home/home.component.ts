import { Component } from '@angular/core';
import { TitleService } from '../../navar/navar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private titleService: TitleService) { }


  ngOnInit(){
    const dataNavar = {
      title : 'Bienvenido al admin de mis pueblitos'
    }
    this.transferedDataToNavar(dataNavar)
  }


  transferedDataToNavar(value : any): void {
    console.log("CAMBIO");

    this.titleService.setTitle(value);
  }
}
