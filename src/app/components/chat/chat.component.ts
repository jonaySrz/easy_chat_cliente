import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { DialogsComponent } from '../dialogs/dialogs.component';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  destination:any = ''
  user:any = {}

  chat: Array<any> = []
  mensaje: string = ''
  typing: boolean = false
  typingUser: any;
  div: HTMLElement

  constructor(
    private socket: WebSocketService,
    private activatedRoute: ActivatedRoute,
    private service: UsersServiceService,
    private dialog:MatDialog
  ) { }

  ngAfterViewInit(){
    // this.div = document.getElementById("chat")

    // this.div.scrollTop = this.div.scrollHeight;
  }

  ngOnInit(): void {
    this.destination = this.activatedRoute.snapshot.paramMap.get('friend')

    this.service.listarUno({_id: sessionStorage.getItem('xyz')}).subscribe(
      (data)=>{
        this.user = data

        this.socket.emitEvent('clear_data', this.user.username)
        this.socket.emitEvent('starting_chat', this.user.username)

        this.service.listarMensajes({user: this.user.username}).subscribe(
          (data)=>{
            if (data.length !== 0){
              data.forEach((element:any) => {
                if(element.emitter == this.destination || element.user_to == this.destination){
                  this.chat.push(element)
                }
              });
              
            }
          }
        )
      }
    )
    
    this.socket.onEvent('chat:mensaje').subscribe(
      (data)=>{

        if (data.mensaje){
          this.chat.push(data)
          this.typing = false

          let div = (<HTMLDivElement>document.getElementById("chat"))

          div.scrollTop = div.scrollHeight;
        }
      }
    )

    this.socket.onEvent('chat:typing').subscribe(
      (data)=>{
        if (data.typing){
          this.typing = true
          this.typingUser = data.emitter
        }
      }
    )

    let div = (<HTMLDivElement>document.getElementById("chat"))

    div.scrollTop = div.scrollHeight;
  }

  enviarMensaje(){
    this.socket.emitEvent('chat:mensaje', {destination: this.destination, user: this.user.username, mensaje: this.mensaje})

    this.chat.push({mensaje: this.mensaje, emitter: this.user.username, createdAt: new Date(), user_to: this.destination});

    this.service.nuevoMensaje({mensaje: this.mensaje, emitter: this.user.username, user_to: this.destination}).subscribe(
      (data)=>{
        console.log(data);
        
      }
    )

    this.mensaje = ''
    let div = (<HTMLDivElement>document.getElementById("chat"))

    div.scrollTop = div.scrollHeight;
  }

  isTyping(){
    this.socket.emitEvent('chat:typing', {destination: this.destination, user: this.user.username, typing: 'typing'})
  }

  borrarMensajes(){
    let quest = this.dialog.open(DialogsComponent, {data: {name: this.destination, action: 'deleteMsg'}})

    quest.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.service.borrarConversacion(this.chat).subscribe(
            (data)=>{
              if(data.success){
                this.dialog.open(DialogsComponent, {data: {name: this.destination, action: 'deletedMsg'}})

                setTimeout(() => {
                  window.location.reload()
                }, 2500);
              }
              else {
                this.dialog.open(DialogsComponent, {data: {name: this.destination, action: 'errorMsg'}})
              }
            }
          )
        }
      }
    )
  }
}
