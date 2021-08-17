import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private auth:LoginService
  ) { }

  intercept(req:any, next:any){
    const tokenizeReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${this.auth.getToken()}`
      }
    })

    return next.handle(tokenizeReq)
  }
}
