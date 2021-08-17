import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-busqueda-amigos',
  templateUrl: './busqueda-amigos.component.html',
  styleUrls: ['./busqueda-amigos.component.css']
})
export class BusquedaAmigosComponent implements OnInit {

  searching:boolean = false
  listaGente: Array<any> = []
  listaAmigos: any = []

  user: any = {}
  peticiones: any = {}
  hidden:boolean = true

  constructor(
    private service: UsersServiceService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listarUno({_id: sessionStorage.getItem('xyz')}).subscribe(
      (data:any)=>{
        this.user = data
        this.listaAmigos = data.lista_amigos
      },
      (err)=>{
        console.log(err);
      }
    )

    this.service.listaPeticion({user_to: sessionStorage.getItem('xyz')}).subscribe(
      (data)=>{
        this.peticiones = data
        if (data.length > 0){
          this.hidden = false
        }
      }
    )

    this.service.listaGente().subscribe(
      (data)=>{

        data.forEach((element:any) => {
          if (this.listaAmigos.length !== 0){
            
            this.listaAmigos.forEach((item:any) => {

              if (element._id !== item && element._id !== sessionStorage.getItem('xyz')){
                this.listaGente.push({username: element.username, _id: element._id})
              }
            });
          }
          else {
            if (element._id !== sessionStorage.getItem('xyz')){
              this.listaGente.push({username: element.username, _id: element._id})
            }
          }
        });
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  addFriend(event: any){
    let adding = this.dialog.open(DialogsComponent, {data: {name: event.target.value, action: 'addFriend'}})
    
    adding.afterClosed().subscribe(
      (result)=>{
        if (result){
          this.service.nuevaPeticion({emitter: this.user._id, user_to: event.target.value}).subscribe(
            (data)=>{
              if (data.success){
                let ok = this.dialog.open(DialogsComponent, {data: {name: event.target.value, action: 'addedFriend'}})

                setTimeout(() => {
                  ok.close()
                  window.location.reload()
                }, 2500);
              }
              else {
                let ok = this.dialog.open(DialogsComponent, {data: {name: event.target.value, action: 'errorAdding'}})

                setTimeout(() => {
                  ok.close()
                  window.location.reload()
                }, 2500);
              }
            }
          )
        }
      }
    )
  }

  myProfile(){
    this.router.navigate(['/user/profile'])
  }

  myPeticiones() {
    this.router.navigate(['/peticiones/amistad'])
  }
}
