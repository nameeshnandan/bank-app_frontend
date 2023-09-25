import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allTransactions: any[], searchKey: string,propName:string): any[] {
    // return null;
    const result:any[]=[]
    if(!allTransactions || searchKey=="" || propName==""){
      return allTransactions

    }
      allTransactions.forEach((item:any)=>{
        if(item[propName].trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
           result.push(item)
        }
        
      });
      return result
  }

}
