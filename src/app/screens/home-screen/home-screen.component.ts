import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit{

  public rol: string = "";
  public token:string = "";

  constructor(
    private facadeService: FacadeService,
    private router:Router
  ){}

  ngOnInit(): void {
     //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }

    this.rol = this.facadeService.getUserGroup();
    console.log("Rol: ", this.rol);

  }
}
