import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  data = new BehaviorSubject('')

  socket = io('http://localhost:3000');


  emitEvent(event: any, data:any){
    this.socket.emit(event, data)
  }

  onEvent(event: any):Observable<any>{
    this.socket.on(event, (data: any)=>{
      this.data.next(data)
    })
    return this.data
  }
}
