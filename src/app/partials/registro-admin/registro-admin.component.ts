import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit{

  public admin:any = {};

  constructor(){}

  ngOnInit(): void {

  }
}
