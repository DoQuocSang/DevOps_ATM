import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  private apiUrl = 'http://localhost:3000'; // Thay đổi đường dẫn API của bạn

  constructor(private http: HttpClient) {}

  // Hàm gọi API GET
  getAllAccount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all-emails`);
  }

  // Hàm gọi API POST
  postAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  // Hàm gọi API DELETE
  deleteAccount(email: string, password: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-account?email=${email}&password=${password}`);
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}
