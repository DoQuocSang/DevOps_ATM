import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

// Định nghĩa đối tượng Account
export class Account {
    email: string;
    password: string;
    amount: number;

    constructor(email: string, password: string, amount: number = 100000) {
        this.email = email;
        this.password = password;
        this.amount = 100000;
    }
}

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    public accounts: Account[] = [];

    constructor(private storageService: StorageService) {
        const defaultEmail = '2014483@dlu.edu.vn';
        const defaultPassword = '1234';
        const defaultAmount = 100000;
        const existingAccount = this.getAccount(defaultEmail);
    
        if (!existingAccount) {
          this.addAccount(defaultEmail, defaultPassword, defaultAmount);
        }
    }

    login(email: string, password: string): boolean {
        const account = this.getAccount(email);
    
        if (account && account.password === password) {
          return true;
        }
    
        return false;
    }

    addAccount(email: string, password: string, amount: number = 100000): boolean {
        const existingAccount = this.accounts.find(account => account.email === email);

        if (existingAccount) {
            return false;
        } else {
            const newAccount = new Account(email, password, amount);
            this.accounts.push(newAccount);

            this.storageService.set('accounts', this.accounts);
            return true;
        }
    }

    deleteAccount(email: string, password:string): boolean {
        const existingAccount = this.accounts.find(account => account.email === email);
        if (existingAccount) {
            const index = this.accounts.indexOf(existingAccount);
            if (index !== -1) {
                this.accounts.splice(index, 1);
                return true;
            }
        }
    
        return false;
    }
    

    getAccount(email: string): Account | undefined {
        return this.accounts.find(account => account.email === email);
    }

    getAccountCount(): number {
        return this.accounts.length;
    }

    getAllAccounts(): Account[] {
        return this.accounts;
    }

    getAccountListString(): string {
        let accountListString = '';
        this.accounts.forEach((account, index) => {
          // Dùng index + 1 để đánh số từ 1, thay vì 0
          accountListString += `${index + 1} - ${account.email} \n `;
        });
        return accountListString;
    }
}
