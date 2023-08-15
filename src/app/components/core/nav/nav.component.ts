import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    RouterOutlet,
    MatListModule,
    RouterLink,
    MatButtonModule

  ]
})
export class NavComponent implements OnInit{


  constructor(private breakpointObserver :BreakpointObserver,private authService:AuthService,private router:Router) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isAuth$!:Observable<boolean>;

  ngOnInit(): void {

    this.isAuth$ = this.authService.isAuth;
  }

  onSignOut() {
    this.router.navigate(["/"]).then(r => this.authService.logout());
  }
}
