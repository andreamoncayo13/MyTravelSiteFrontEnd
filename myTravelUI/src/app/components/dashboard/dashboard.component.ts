import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  title = 'Dashboard';
 
  constructor(private titleService:Title, private auth: AuthService) {
  }
 
  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  onLogout(){
    this.auth.logOut();
    location.pathname = ('/login');
  }

  isLoggedIn():boolean{
    return this.auth.isLoggedIn();
  }
}
