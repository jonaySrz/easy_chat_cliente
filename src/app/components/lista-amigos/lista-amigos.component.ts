import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-lista-amigos',
  templateUrl: './lista-amigos.component.html',
  styleUrls: ['./lista-amigos.component.css']
})
export class ListaAmigosComponent implements OnInit {
  listaAmigos: any = []
  listaGente: any = []

  constructor(
    private sercice: UsersServiceService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sercice.listaGente().subscribe(
      (data:any)=>{
        this.listaGente = data
      },
      (err)=>{
        console.log(err);
      }
    )

    this.sercice.listarUno({_id: sessionStorage.getItem('xyz')}).subscribe(
      (data:any)=>{
        data.lista_amigos.forEach((element:any) => {
          this.listaGente.forEach((item:any) => {
            if (element == item._id){
              this.listaAmigos.push({_id: item._id, username: item.username})
            }
          });
        });
        
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  deleteFriend(event:any ,friend:any){
    event.stopPropagation()

    let modal = this.dialog.open(DialogsComponent, {data: {name: friend.username, action: 'deleting'}})

    modal.afterClosed().subscribe(
      (result)=>{
        if (result){
          this.sercice.deleteFriend({friend_id: friend._id}).subscribe(
            (data)=>{
              if (data.success){
                this.dialog.open(DialogsComponent, {data: {name: friend.username, action: 'deleted'}})

                setTimeout(() => {
                  window.location.reload()
                }, 2500);
              }
            },
            (err)=>{
              console.log(err);
            }
          )
        }
      }
    )
  }

  openChat(user:any){
    this.router.navigate(['/chat/' + user])
  }
}
