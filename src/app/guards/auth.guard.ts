import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor (
  private auth:LoginService,
  private router:Router
){}

  canActivate(): boolean{
    if(this.auth.logged()){
      return true
    }

    this.router.navigate(['/'])
    return false
  }
  
}

