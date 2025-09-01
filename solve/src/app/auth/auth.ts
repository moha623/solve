import { Component } from '@angular/core';
import { Login } from "./login/login";
import { Register } from "./register/register";

@Component({
  selector: 'app-auth',
  imports: [  Login],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

}
