import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Account, AccountService } from '../services/account.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userData: any;
  
  constructor(private accountService: AccountService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Lấy thông tin đăng nhập từ UserService
    this.userData = this.userService.getUserData();
    console.log(this.userData)
  }

  navigateToProfilePage() {
    this.router.navigate(['/profile']);
  }

  navigateToLoginPage(){
    this.router.navigate(['/login']);
  }

  navigateToCameraPage(){
    this.router.navigate(['/camera']);
  }

  navigateToMapPage(){
    this.router.navigate(['/map']);
  }
}

