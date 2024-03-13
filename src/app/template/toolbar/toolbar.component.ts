import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import {
  getLoggedInUser,
  isAuthenticated,
  logout,
} from 'src/app/shared/store/auth/auth.action';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Observable, of } from 'rxjs';
import { selectLoggedInUser } from 'src/app/shared/store/auth/auth.selector';
import { AuthModel } from 'src/app/shared/store/auth/auth.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  user$: Observable<AuthModel> = of();
  appName: string = environment.appName;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.getLoggedInUser();
  }
  getLoggedInUser() {
    this.store.dispatch(getLoggedInUser());
    this.store.dispatch(isAuthenticated());
    this.user$ = this.store.select(selectLoggedInUser);
  }
  onLogout(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to log out?',
        cancelButton: 'Cancel',
        confirmButton: 'Yes',
      },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.store.dispatch(logout());
    });
  }
}
