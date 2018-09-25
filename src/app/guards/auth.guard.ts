import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service'
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
	constructor (private auth: LoginService, private router: Router){

	}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isLoggedIn
    	.pipe(
        	take(1),                              // {2} 
        	map((isLoggedIn: boolean) => {         // {3}
          		if (!isLoggedIn){
            		this.router.navigate(['/privado']);  // {4}
            		return false;
          		}
          		return true;
        	})
      	)

  }
}
