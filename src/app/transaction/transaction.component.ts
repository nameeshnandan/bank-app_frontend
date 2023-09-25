import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import  jspdf from 'jspdf'
import 'jspdf-autotable'
import {  Router } from '@angular/router';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  // to hold loading status
  logoutStatus:boolean=false;

  searchKey:string=''
  allTransactions:any=[];
  constructor(private api:ApiService,private transactionRouter:Router){}

    ngOnInit(): void {
      if(!localStorage.getItem('token')){
        alert('Please Login')
        this.transactionRouter.navigateByUrl('') //redirected to login page
      }
      this.api.getTransaction().subscribe((result:any)=>{
        console.log(result);
        this.allTransactions=result.transaction
      },
      (result:any)=>{
        console.log(result.error.message);
        
      })
    }

  

    exportPdf(){
      //1. create an objrct for jspdf
      var pdf = new jspdf();

      //2. setup title row for table
      let thead = ['Type', 'Feom Account', 'To Account', 'Amount'];
      let tbody = []; //transaction details

      //3. setup properties for the pdf
      pdf.setFontSize(16)
      pdf.text('Mini Statements',15,10)

      //4. to display as table, need to convert array of objects to nested array
      for(let item of this.allTransactions){
        let temp = [item.type,item.fromAcno,item.toAcno,item.amount];
        tbody.push(temp);
      }

      //5. convert nested array to table sturuture using jspdf-autotale
      (pdf as any).autoTable(thead,tbody)

      //6. to open pdf in another tab
      pdf.output('dataurlnewwindow')

      //7. to download or save pdf
      pdf.save('Transaction History.pdf')
    }
    
    logout(){
      //clear local storage
      localStorage.clear()
      this.logoutStatus=true;
    
    setTimeout(()=>{
      this.transactionRouter.navigateByUrl('')

    },2000)
  }
}
