import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //register success loading
  regSuccessLoading:string='';

  //register error message
  regErrorMsg: string='';

  constructor(private registerFB:FormBuilder, private api:ApiService,private registerRoute:Router){}

  //form group creation
  registerForm= this.registerFB.group({
    //array creation
    username:['',[Validators.required,Validators.pattern('[a-zA-Z\\s]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  //control pass to html
  register(){
    console.log(this.registerForm.value);
    if(this.registerForm.valid){
      
      let username=this.registerForm.value.username;
      let acno=this.registerForm.value.acno;
      let password=this.registerForm.value.password;
      this.api.register(acno,username,password).subscribe((result:any)=>{
        alert(result.message)
        this.regSuccessLoading=result.message //successfully registered

        setTimeout(()=>{
           //redirect to login page
          this.registerRoute.navigateByUrl('')
        },3000)
        },((result:any)=>{
          this.regErrorMsg=result.error.message
        }))

      //to reset the form when try to register in already registered acno
      setTimeout(()=>{
        this.registerForm.reset() // to reset the form to empty
        this.regErrorMsg="" // to hide the error msg after 2seconds
      },2000)
      // alert('Registered Successfuly')

    }
    else{
      alert('Invalid Form')
    }
  }
}
