import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ListingControlsComponent } from '@app/core/ui';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { SearchUserForm } from '../../models/form/search-user.model';
import { UserSandbox } from '../../user.sandbox';
import { User } from '../../models';

@Component({
  templateUrl: 'user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class UserListComponent
  extends ListingControlsComponent<User, SearchUserForm>
  implements OnInit, AfterViewInit {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  selected = "all";

  constructor(injector: Injector, public _sandbox: UserSandbox) {
    super(injector);
  }

  ngOnInit(): void {
    this.criteria = new RequestCriteria<SearchUserForm>(
      new SearchUserForm()
    ).limit(2);
    this.registerEvents();
  }

  ngAfterViewInit(): void {
    this.reloadTable();
  }

  protected list(): void {
    console.log(this.dtContainer);
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    switch(this.selected) {
      case 'all':
        this._sandbox.fetchUsers(this.criteria);
        break;
      case 'admins':
        this._sandbox.fetchAdmins(this.criteria);
        break;
      case 'clients':
        this._sandbox.fetchClients(this.criteria);
        break;
    }
  }

  protected delete() {}

  protected registerEvents(): void {
    this.subscriptions.push(
      this._sandbox.users$.subscribe((data: any) => {
        this.data = data;
        this.ui.clearBusy();
        this.isTableLoading = false;
      })
    );
    this.subscriptions.push(
      this._sandbox.usersMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  }

  protected unregisterEvents(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onClickAll() {
    this.selected = "all";
    this.list();
  }

  onClickAdmins() {
    this.selected = "admins";
    this.list();
  }

  onClickClients() {
    this.selected = "clients";
    this.list();
  }
}