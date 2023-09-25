import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

    

    @Input() deleteAcno:any

    @Output() onCancel = new EventEmitter();   //cancel button
    @Output() onDelete = new EventEmitter();   //confirm button

    cancel(){
      this.onCancel.emit()
    }

    deleteFromChild(){
      this.onDelete.emit()
    }
}
