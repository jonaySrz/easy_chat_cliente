import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nuevo: boolean = false;
  passwordInconcluent: boolean = false

  hide: boolean = true;

  loginForm: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  signForm: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  usuarioError: boolean = false;
  passwordError: boolean = false;
  userRepErr: boolean = false;
  emailRepErr: boolean = false;

  user: any = {};
  newUser: any = {}

  constructor(
    private service: LoginService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('xyz')
    }
  }

  login(){
    this.user.username = this.loginForm.get('usuario')?.value;
    this.user.password = this.loginForm.get('password')?.value;

    this.service.login(this.user).subscribe(
      
      (data:any)=>{
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('xyz', data.xyz)

      window.location.href = '/menu'
      },
      (error:any)=>{

        this.passwordError = false;
        this.usuarioError = false;
        
        if (error.error.includes('contraseña')){
          this.passwordError = true;
          (<HTMLInputElement>document.getElementById("password")).value = '';
          (<HTMLInputElement>document.getElementById("password")).focus()
        }

        if (error.error.includes('usuario')){
          this.usuarioError = true;
          (<HTMLInputElement>document.getElementById("usuario")).value = '';
          (<HTMLInputElement>document.getElementById("usuario")).focus()
        }
      })
  }

  nuevoUser(){
    if (this.nuevo == true){
      (<HTMLInputElement>document.getElementById("resetSign")).click()
      this.nuevo = false
    }
    else {
      (<HTMLInputElement>document.getElementById("resetLog")).click()
      this.nuevo = true
    }
  }

  nuevaCuenta(){
    this.passwordInconcluent = false

    if(this.signForm.get('password')?.value !== this.signForm.get('password2')?.value){
      this.passwordInconcluent = true
      return 
    }

    this.newUser.username = this.signForm.get('usuario')?.value;
    this.newUser.password = this.signForm.get('password')?.value;
    this.newUser.email = this.signForm.get('email')?.value;
    
    this.service.sign(this.newUser).subscribe(
      (data)=>{ 
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('xyz', data.xyz)

        this.router.navigate(['/menu'])

        this.dialog.open(DialogsComponent, {data: {name: this.newUser.username, action: 'createAcount'}})

        setTimeout(()=>{
          this.dialog.closeAll()
        }, 2500)
      },
      (err:any)=>{
        this.userRepErr = false;
        this.emailRepErr = false;

        if (err.error.includes('usuario')){
          this.userRepErr = true;
          (<HTMLInputElement>document.getElementById("usuario")).value = '';
          (<HTMLInputElement>document.getElementById("usuario")).focus()
        }

        if (err.error.includes('email')){
          this.emailRepErr = true;
          (<HTMLInputElement>document.getElementById("email")).value = '';
          (<HTMLInputElement>document.getElementById("email")).focus()
        }
      }
    )
    return 
  }
}
