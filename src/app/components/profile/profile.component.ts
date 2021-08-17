import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  read:boolean = true
  user:any = {}
  hide: boolean = true

  userRepErr: boolean = false;
  emailRepErr: boolean = false;

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  constructor(
    private service: UsersServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.listarUno({_id: sessionStorage.getItem('xyz')}).subscribe(
      (data)=>{
        this.user = data
        this.userForm.patchValue(data)
      }
    )
  }

  editable(){
    if(this.read == true){
      this.read = false
    }
    else {
      this.read = true
    }
  }

  borrarPerfil(){
    let request = this.dialog.open(DialogsComponent, {data:{name: this.user.username, action:'deleteProfile'}})

    request.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.service.borrarPerfil({}).subscribe(
            (data)=>{
              if (data.success){
                this.dialog.open(DialogsComponent, {data:{name: this.user.username, action:'deletedProfile'}})

                setTimeout(() => {
                  window.location.href = '/'
                }, 2500);
              }
              else {
                this.dialog.open(DialogsComponent, {data:{name: this.user.username, action:'errorMsg'}})

                setTimeout(() => {
                  window.location.reload()
                }, 2500);
              }
            }
          )
        }
      }
    )
  }

  editarPerfil(){
    let password = this.userForm.get('password')?.value
    let username = this.userForm.get('username')?.value
    let email = this.userForm.get('email')?.value

    this.service.editarPerfil({password, username, email, _id: sessionStorage.getItem('xyz')}).subscribe(
      (data)=>{
        if (data.success){
          this.dialog.open(DialogsComponent, {data:{name: this.user.username, action:'editedProfile'}})

          setTimeout(() => {
            window.location.href = '/menu'
          }, 2500);
        }
        else {
          this.dialog.open(DialogsComponent, {data:{name: this.user.username, action:'errorMsg'}})

          setTimeout(() => {
            window.location.reload()
          }, 2500);
        }
      }
    )
  }
}
