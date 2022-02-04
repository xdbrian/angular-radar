import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private http: HttpClient){

	}
	
	validateLogin(){
    return this.http.post('/api/user/login',{
      username : 'user.username',
      password : 'user.password'
    })
}

}
