import { Component } from '@angular/core';
import { LoadingService } from './loading-service.service';

@Component({
  selector: 'app-loadings',
  templateUrl: './loadings.component.html',
  styleUrls: ['./loadings.component.scss']
})
export class LoadingsComponent {
  constructor(public loadingService: LoadingService) {}

}
