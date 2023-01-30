import { Injectable, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService implements OnInit {
  bsModalRef? : BsModalRef<ConfirmDialogComponent>;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  confirm(
    title = 'Confirmation',
    message = 'Are you sure to want to do this?',
    btnOkText = 'Ok',
    btnCancelText = 'Cancel'
  ) : Observable<boolean> {
    const config = {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText
      }
    }

    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);
    return this.bsModalRef.onHidden!.pipe(
      map(() => {
        return this.bsModalRef!.content!.result
      })
    );
  }
}
