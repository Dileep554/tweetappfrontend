import { EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  
  currentUser: User|undefined;
  
  constructor(private authService:AuthService,private router:Router,private observer: BreakpointObserver) {}

  username=sessionStorage.getItem("username");
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.currentUser = this.authService.getCurrentUser();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  doLogOut()
  {
    this.authService.setCurrentUser(null);
    this.router.navigateByUrl("/");
  }
}
