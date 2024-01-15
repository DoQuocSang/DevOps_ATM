import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Lấy thông tin đăng nhập từ UserService
    this.userData = this.userService.getUserData();
  }

  navigateToHomePage() {
    this.router.navigate(['/home']);
  }

}
