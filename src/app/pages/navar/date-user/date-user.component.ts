import { Component } from '@angular/core';
import { TitleService } from '../navar.service';

@Component({
  selector: 'app-date-user',
  templateUrl: './date-user.component.html',
  styleUrls: ['./date-user.component.scss']
})
export class DateUserComponent {
  title: any;
  data_user: any = {}
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    
    this.titleService.title$.subscribe((newTitle: any) => {
      this.title = newTitle.title;
    });
    this.data_user = JSON.parse(sessionStorage.getItem('AuthorizacionPortalRansa')); 
    console.log(this.data_user);
    
  }


 
}
