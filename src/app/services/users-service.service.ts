import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(
    private http: HttpClient
  ) { }

  listaGente():Observable<any>{
    return  this.http.get('http://localhost:3000/lista/usuarios')
  }

  listarUno(body:any){
    return  this.http.post('http://localhost:3000/lista/particular', body)
  }

  addNewFriend(body: any):Observable<any>{
    return  this.http.post('http://localhost:3000/usuario/addFriend', body)
  }

  deleteFriend(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/usuario/deleteFriend', body)
  }

  nuevoMensaje(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/mensajes/guardar', body)
  }

  listarMensajes(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/mensajes/listar', body)
  }

  nuevaPeticion(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/peticion/nueva', body)
  }

  listaPeticion(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/peticiones/lista', body)
  }

  respuestaPeticion(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/peticiones/respuesta', body)
  }

  editarPerfil(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/user/edit', body)
  }

  borrarPerfil(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/user/delete', body)
  }

  borrarConversacion(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/conver/delete', body)
  }
}
