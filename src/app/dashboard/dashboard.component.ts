import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

        deleteSuccessStatus:string='';

        //delete confirm status
        deleteConfirmStatus:boolean=false;

        //for delete account
        acno:any

        // to hold loading status
        logoutStatus:boolean=false;

        isCollapse:boolean=true;

        //to hold current user name from local storage
        user:string="";

        //to hold currrent account number
        currentAcno:any;

        balance:any;


        transferError:string='';
        transferSuccess:string='';
    constructor(private fundTransferFB:FormBuilder, private api:ApiService,private dashboardRouter:Router){}

        ngOnInit(): void {
          if(!localStorage.getItem('token')){
            alert('Please Login')
            this.dashboardRouter.navigateByUrl('') //redirected to login page
          }
          if(localStorage.getItem('currentUser')){
            this.user= localStorage.getItem('currentUser') || ""; // current User
          }
          if(localStorage.getItem('currentAcno')){
            this.currentAcno= localStorage.getItem('currentAcno') || ""; // current User
          }
          // if(localStorage.getItem(this.currentAcno)){
          //   this.currentAcno= localStorage.getItem('currentAcno') || ""; // current account number
          // }
        }

        //form group creation
        fundTransferForm= this.fundTransferFB.group({
          //array creation
          acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
          password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
          amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
        })

        



        collapse(){
              this.isCollapse=!this.isCollapse;
        }

        getBalance(){
          this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
            console.log(result);
            this.balance=result.balance;
            
          },
          (result:any)=>{
            alert(result.error.message)
          })
        }
        //fund transfer
        fundtransfer(){
          if(this.fundTransferForm.valid){
            let creditAcno=this.fundTransferForm.value.acno
            let password=this.fundTransferForm.value.password
            let amount=this.fundTransferForm.value.amount
            this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
              console.log(result);
              this.transferSuccess=result.message
              setTimeout(()=>{
                this.fundTransferForm.reset()
                this.transferSuccess=""
              },2000)
              
            },(result:any)=>{
              console.log(result.error.message);
              this.transferError=result.error.message
              setTimeout(()=>{
                this.fundTransferForm.reset()
                this.transferSuccess=""
              },2000)
            })
          }
          else{
            alert('Invalid from')
          }
        }
        reset(){
          this.fundTransferForm.reset()
        }

        logout(){
          //clear local storage
          localStorage.clear()
          this.logoutStatus=true;
        
          setTimeout(()=>{
            this.dashboardRouter.navigateByUrl('')

          },2000)
        }

        deleteAccount(){
          this.acno=localStorage.getItem('currentAcno');
          this.deleteConfirmStatus=true
        }
        cancelDeleteAccount(){
          this.acno='';
          this.deleteConfirmStatus=false;
        }
        deleteFromParent(){
          this.api.deleteUserAccount().subscribe((result:any)=>{
            localStorage.clear()
              this.deleteSuccessStatus=result.message
            setTimeout(()=>{
              //navigate to login page
              this.dashboardRouter.navigateByUrl('')
            },2000)
          })
        }
    }
