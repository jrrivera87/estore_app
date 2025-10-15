import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { loginToken, user, loggedInUser } from '../../types/user.type';
import { StorageService } from '../storage/storage-service';

@Injectable()
export class UserService {
  private autoLogoutTimer: any;
  private authtoken: string;
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private loggedInUserInfo: BehaviorSubject<loggedInUser> = new BehaviorSubject(<loggedInUser>{})
  
  constructor(private httpClient: HttpClient, private sessionStorageService: StorageService) {
    this.loadToken();
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get loggedInUser$(): Observable<loggedInUser> {
    return this.loggedInUserInfo.asObservable();
  }

  get loggedInUser(): loggedInUser {
    return this.loggedInUserInfo.value
  }

  get token(): string {
    return this.authtoken;
  }

  createUser(user: user): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup';
    return this.httpClient.post(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.httpClient.post(url, {email: email, password: password});
  }

  activateToken(token: loginToken): void {
    // For testing purposes set to 10 seconds.
    // token.expiresInSeconds = 10;
    this.sessionStorageService.setItem('token', token.token);
    this.sessionStorageService.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString());
    this.sessionStorageService.setItem('firstName', token.user.firstName);
    this.sessionStorageService.setItem('lastName', token.user.lastName);
    this.sessionStorageService.setItem('address', token.user.address);
    this.sessionStorageService.setItem('city', token.user.city);
    this.sessionStorageService.setItem('state', token.user.state);
    this.sessionStorageService.setItem('pin', token.user.pin);
    this.sessionStorageService.setItem('email', token.user.email);

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
    this.setAutoLogoutTimer(token.expiresInSeconds * 1000);
    this.authtoken = token.token;
  }

  logout(): void {
    this.sessionStorageService.clear();
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next(<loggedInUser> {});
    clearTimeout(this.autoLogoutTimer);
  }
  
  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  loadToken(): void {
    const token: string | null = this.sessionStorageService.getItem('token');
    const expiry: string | null = this.sessionStorageService.getItem('expiry');

    if(!token || !expiry) {
      return;
    } else {
      const expiresIn: number = new Date(expiry).getTime() - new Date().getTime();
      if (expiresIn > 0) {
        const firstName: string | null = this.sessionStorageService.getItem('firstName');
        const lastName: string | null = this.sessionStorageService.getItem('lastName');
        const address: string | null = this.sessionStorageService.getItem('address');
        const city: string | null = this.sessionStorageService.getItem('city');
        const state: string | null = this.sessionStorageService.getItem('state');
        const pin: string | null = this.sessionStorageService.getItem('pin');
        const email: string | null = this.sessionStorageService.getItem('email');

        const user: loggedInUser = {
          firstName: firstName !== null ? firstName : '',
          lastName: lastName !== null ? lastName : '',
          address: address !== null ? address : '',
          city: city !== null ? city : '',
          state: state !== null ? state : '',
          pin: pin !== null ? pin : '',
          email: email !== null ? email : '',
        }

        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(user);
        this.setAutoLogoutTimer(expiresIn);
        this.authtoken = token;
      } else {
        this.logout();
      }
    }
  }
}
