import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //to hold login errror message
  loginErrorMsg:string='';

  //to hold spinner data
  loginSuccessStatus:boolean=false;

  constructor(private loginFB:FormBuilder,private api:ApiService,private loginRoute:Router){}

  loginForm=this.loginFB.group({

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

    login(){
      console.log(this.loginForm.value);

      if(this.loginForm.valid){
        let acno=this.loginForm.value.acno;
        let password=this.loginForm.value.password;
        this.api.login(acno,password).subscribe((result:any)=>{
            // login success 200
            this.loginSuccessStatus=true;
            //to store current user in local storage
            localStorage.setItem("currentUser",result.currentUser)
            //store token in local storage
            localStorage.setItem("token",result.token)
            //store currentacno in localstorage
            localStorage.setItem("currentAcno",result.currentAcno)

            setTimeout(()=>{
                //redirected to dashboard
                this.loginRoute.navigateByUrl('/dashboard')
            },2000)
           
        },
        (result:any)=>{
          this.loginErrorMsg=result.error.message
          setTimeout(()=>{
            this.loginForm.reset();
            this.loginErrorMsg="";
          },2000)
        }
        )
        // alert('Login Succesfully')
      }
      else{
        alert('Inavalid data')
      }
    }



}
