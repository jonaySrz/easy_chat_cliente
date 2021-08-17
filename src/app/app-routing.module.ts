import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { PeticionesComponent } from './components/peticiones/peticiones.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'menu', component: UserMenuComponent, canActivate: [AuthGuard]},
  {path:'chat/:friend', component: ChatComponent, canActivate: [AuthGuard]},
  {path:'peticiones/amistad', component: PeticionesComponent, canActivate: [AuthGuard]},
  {path:'user/profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
