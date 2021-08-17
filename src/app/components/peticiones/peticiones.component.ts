import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {
  peticiones: any = []

  constructor(
    private service: UsersServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.listaPeticion({user_to: sessionStorage.getItem('xyz')}).subscribe(
      (data)=>{
        data.forEach((element:any) => {
          this.service.listaGente().subscribe(
            (data)=>{
              data.forEach((item:any) => {
                if(element.emitter == item._id){
                  element.name = item.username
                  this.peticiones.push(element)
                }
              });
            }
          )
        });
      }
    ) 
  }

  response(peticionData:any, response:string){
    this.service.respuestaPeticion({peticionData, respuesta:response}).subscribe(
      (data)=>{
        if(data.success == true){
          let ok = this.dialog.open(DialogsComponent, {data: {name: peticionData.name, action: 'added'}})

          setTimeout(() => {
            ok.close()
            window.location.reload()
          }, 2500);
        }
      }
    )
  }
}
