import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {
  authenticated$: Observable<boolean> = of(false);
  constructor(private _auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authenticated$ = this._auth.isAuthenticated();
  }
  goTo(url: string) {
    this.router.navigate([`${url}`]);
  }
}
