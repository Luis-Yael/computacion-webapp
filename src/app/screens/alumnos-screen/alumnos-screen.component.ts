import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-alumnos-screen',
  templateUrl: './alumnos-screen.component.html',
  styleUrls: ['./alumnos-screen.component.scss']
})
export class AlumnosScreenComponent implements OnInit{
  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_alumnos: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['matricula', 'nombre', 'email', 'fecha_nacimiento', 'edad', 'curp', 'rfc', 'telefono', 'ocupacion', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_alumnos as DatosUsuario[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private alumnosService:AlumnosService,
    private facadeService:FacadeService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }

    this.obtenerAlumnos();
    //Para paginador
    this.initPaginator();
  }

  //Para paginación
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  //Obtener alumnos
  public obtenerAlumnos(){
    this.alumnosService.obtenerListaAlumnos().subscribe(
      (response)=>{
        this.lista_alumnos = response;
        console.log("Lista users: ", this.lista_alumnos);
        if(this.lista_alumnos.length > 0){
          //Agregar datos del nombre e email
          this.lista_alumnos.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("Otro user: ", this.lista_alumnos);

          this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_alumnos as DatosUsuario[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }

  //Funcion para editar
  public goEditar(idUser: number){
    this.router.navigate(["registro/"+idUser]);
  }

  public delete(idUser: number){

  }
}//Cierra la clase

//Esto va fuera de la llave que cierra la clase
export interface DatosUsuario {
  id: number,
  matricula: number;
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string,
  curp: string,
  rfc: string,
  edad: number,
  telefono: string,
  ocupacion: string

}
