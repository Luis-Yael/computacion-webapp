import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/services/administrador.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})
export class AdminScreenComponent implements OnInit{

  public name_user:string = "";
  public lista_admins:any[]= [];

  constructor(
    public facadeService: FacadeService,
    private administradoresService: AdministradorService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();

    this.obtenerAdmins();
  }

  //Obtener la lista de administradores
  //Obtener lista de usuarios
  public obtenerAdmins(){
    this.administradoresService.obtenerListaAdmins().subscribe(
      (response)=>{
        this.lista_admins = response;
        console.log("Lista users: ", this.lista_admins);
      }, (error)=>{
        alert("No se pudo obtener la lista de admins");
      }
    );
  }

  //Funcion para editar
  public goEditar(idUser: number){
    this.router.navigate(["registro/"+idUser]);
  }

  public delete(idUser: number){

  }
}
