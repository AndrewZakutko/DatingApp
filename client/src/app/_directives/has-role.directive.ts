import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = [];
  user: User = {} as User;

  constructor(private viewConteinerRef: ViewContainerRef, private templateRef: TemplateRef<any>,
      private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user;
      }
    })
  }

  ngOnInit(): void {
    if(this.user.roles.some(r => this.appHasRole.includes(r)))
    {
      this.viewConteinerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewConteinerRef.clear();
    }
  }

}
