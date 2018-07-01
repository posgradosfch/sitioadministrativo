import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../servicios/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../servicios/global.service';

@Component({
  selector: 'app-nav-settings',
  templateUrl: './nav-settings.component.html',
  styleUrls: ['./nav-settings.component.css']
})
export class NavSettingsComponent implements OnInit {
	
  account: User = new User();
  userSub: Subscription;

  constructor(private global: GlobalService, private router: Router) {}

  ngOnInit() {
  	this.userSub = this.global.user.subscribe(
  		me => {this.account = me;
  		});
  }
  private logoutClicked() {
  	this.global.me = new User();
  	localStorage.removeItem('token');
  	localStorage.removeItem('account');
  	this.router.navigate(['/home']);
  }

}
