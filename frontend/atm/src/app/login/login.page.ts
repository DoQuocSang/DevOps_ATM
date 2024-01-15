import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Account, AccountService } from '../services/account.service';
import { InformationService } from '../services/information.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AccountApiService } from '../services/account.api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public AlertButtons = ['OK'];
  email: string = '';
  password: string = '';

  account: Account = {
    email: '',
    password: '',
    amount: 0
  };

  informationData: string = '';

  emailError: string = '';
  passwordError: string = '';
  accountError: string = '';

  constructor(private modalController: ModalController, private accountApiService: AccountApiService, private alertCtrl: AlertController, private informationService: InformationService, private accountService: AccountService, private router: Router, private userService: UserService) { }
  responseData: any;
  ngOnInit() {
   
  }

  login() {
    if(this.checkInput())
    {
      return;
    }

    this.accountApiService.login(this.email, this.password).subscribe(data => {
      this.responseData = data;
      if(this.responseData.success){
        const userData = this.accountService.getAccount(this.email) || new Account('', '');
        this.userService.setUserData(this.responseData.account);
        this.router.navigate(['/home']);
      }
      else {
        if (this.email.trim() !== '' && this.password.trim() !== ''){
          this.accountError = 'Email hoặc mật khẩu không đúng';
        }
      }
    });
  }

  isValidEmail(email: string): boolean {
    // Kiểm tra định dạng email bằng biểu thức chính quy
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  checkInput(): boolean {
    // reset thông báo lỗi
    this.emailError = '';
    this.passwordError = '';
    this.accountError = '';
  
    let hasError = false;
  
    if (!this.isValidEmail(this.email)) {
      this.emailError = 'Email không hợp lệ';
      hasError = true;
      this.informationService.setInformationData(`Đã xảy ra lỗi! Vui lòng kiểm tra lại các ô nhập liệu`);
    }

    if (this.password.length < 4) {
      this.passwordError = 'Mật khẩu phải có ít nhất 4 ký tự';
      hasError = true;
      this.informationService.setInformationData(`Đã xảy ra lỗi! Vui lòng kiểm tra lại các ô nhập liệu`);
    }

    if (this.email.trim() === '') {
      this.emailError = 'Vui lòng nhập email';
      hasError = true;
      this.informationService.setInformationData(`Đã xảy ra lỗi! Vui lòng kiểm tra lại các ô nhập liệu`);
    }
  
    if (this.password.trim() === '') {
      this.passwordError = 'Vui lòng nhập mật khẩu';
      hasError = true;
      this.informationService.setInformationData(`Đã xảy ra lỗi! Vui lòng kiểm tra lại các ô nhập liệu`);
    }

    this.informationData = this.informationService.getInformationData();
  
    return hasError;
  }

  addAccount() {
    if(this.checkInput())
    {
      return;
    }

    const account = new Account(this.email, this.password);
    this.accountApiService.postAccount(account).subscribe(data => {
      this.responseData = data;
      if(this.responseData.success){
        this.informationService.setInformationData(`Thêm tài khoản "${account.email}" thành công!`);
        this.informationData = this.informationService.getInformationData();
      }
      else {
        this.informationService.setInformationData(`Tài khoản "${account.email}" đã có sẵn!`);
        this.informationData = this.informationService.getInformationData();
      }
    });
  }

  deleteAccount() {
    if(this.checkInput())
    {
      return;
    }

    this.accountApiService.deleteAccount(this.email, this.password).subscribe(data => {
      this.responseData = data;
      if(this.responseData.success){
        this.informationService.setInformationData(`Tài khoản "${this.email}" đã được xóa!`);
        this.informationData = this.informationService.getInformationData();
      }
      else {
        if(this.responseData.valid){
          this.informationService.setInformationData(`Vui lòng nhập đúng mật khẩu để xóa!`);
          this.informationData = this.informationService.getInformationData();
        }else{
          this.informationService.setInformationData(`Tài khoản "${this.email}" không tồn tại!`);
          this.informationData = this.informationService.getInformationData();
        }
      } 
    });
  }

  async loadAccounts() {
    this.accountApiService.getAllAccount().subscribe(data => {
      this.responseData = data;
      if(this.responseData.success){
        // console.log(this.formatEmails(this.responseData.emails))
        this.informationService.setInformationData(this.formatEmails(this.responseData.emails));
        this.informationData = this.informationService.getInformationData();
      }
      else {
        this.informationData = "";
      }
    });
    // this.informationService.setInformationData(this.accountService.getAccountListString());
    // this.informationData = this.accountService.getAccountListString();
  }

  formatEmails(emails: string[]): string {
    return emails.map((email, index) => `${index + 1} - ${email}`).join('\n');
  }
}
