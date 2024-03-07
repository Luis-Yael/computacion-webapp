import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//Variables para las cookies
const session_cookie_name = 'computacion-token';
const user_email_cookie_name = 'computacion-email';
const user_id_cookie_name = 'computacion-user_id';
const user_complete_name_cookie_name = 'computacion-user_complete_name';
const group_name_cookie_name = 'computacion-group_name';
const codigo_cookie_name = 'computacion-codigo';


@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private cookieService: CookieService,
  ) { }

  //Funcion para validar login
  public validarLogin(username: String, password: String){
    var data = {
      "username": username,
      "password": password
    }
    console.log("Validando login... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["username"])){
      error["username"] = this.errorService.required;
    }else if(!this.validatorService.max(data["username"], 40)){
      error["username"] = this.errorService.max(40);
    }
    else if (!this.validatorService.email(data['username'])) {
      error['username'] = this.errorService.email;
    }

    if(!this.validatorService.required(data["password"])){
      error["password"] = this.errorService.required;
    }

    return error;
  }
  //Servicios para login y para cerrar sesión
  //Iniciar sesión
  login(username:String, password:String): Observable<any> {
    var data={
      username: username,
      password: password
    }
    return this.http.post<any>(`${environment.url_api}/token/`,data);
  }

  //Cerrar sesión
  logout(): Observable<any> {
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/logout/`, {headers: headers});
  }


  //Funciones para las cookies y almacenar datos de inicio de sesión
  //Funciones para utilizar las cookies en web
  retrieveSignedUser(){
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/me/`,{headers:headers});
  }

  getCookieValue(key:string){
    return this.cookieService.get(key);
  }

  saveCookieValue(key:string, value:string){
    var secure = environment.url_api.indexOf("https")!=-1;
    this.cookieService.set(key, value, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }

  getSessionToken(){
    return this.cookieService.get(session_cookie_name);
  }


  saveUserData(user_data:any){
    var secure = environment.url_api.indexOf("https")!=-1;
    if(user_data.rol == "administrador"){
      this.cookieService.set(user_id_cookie_name, user_data.id, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_email_cookie_name, user_data.email, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_complete_name_cookie_name, user_data.first_name + " " + user_data.last_name, undefined, undefined, undefined, secure, secure?"None":"Lax");
    }else{
      this.cookieService.set(user_id_cookie_name, user_data.user.id, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_email_cookie_name, user_data.user.email, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_complete_name_cookie_name, user_data.user.first_name + " " + user_data.user.last_name, undefined, undefined, undefined, secure, secure?"None":"Lax");
    }
    this.cookieService.set(session_cookie_name, user_data.token, undefined, undefined, undefined, secure, secure?"None":"Lax");
    this.cookieService.set(group_name_cookie_name, user_data.rol, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }

  destroyUser(){
    this.cookieService.deleteAll();
  }

  getUserEmail(){
    return this.cookieService.get(user_email_cookie_name);
  }

  getUserCompleteName(){
    return this.cookieService.get(user_complete_name_cookie_name);
  }

  getUserId(){
    return this.cookieService.get(user_id_cookie_name);
  }

  getUserGroup(){
    return this.cookieService.get(group_name_cookie_name);
  }


}
