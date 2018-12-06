import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

	private userSource = new BehaviorSubject<User>(new User());
	user = this.userSource.asObservable();

	set me(user: User) {
		localStorage.setItem('account', JSON.stringify(user));
		this.userSource.next(user);
	}
}
