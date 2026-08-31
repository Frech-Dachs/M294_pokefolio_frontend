import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthConfig, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private oauthService = inject(OAuthService);
  private authConfig = inject(AuthConfig);
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly usernameObservable: Observable<string> = this.usernameSubject.asObservable();
  private useraliasSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly useraliasObservable: Observable<string> = this.useraliasSubject.asObservable();
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly accessTokenObservable: Observable<string> = this.accessTokenSubject.asObservable();

  constructor() {
    this.handleEvents(null);
  }

  private _decodedAccessToken: Record<string, any> | null | undefined;

  get decodedAccessToken() {
    return this._decodedAccessToken;
  }

  private _accessToken = '';

  get accessToken() {
    return this._accessToken;
  }

  async initAuth(): Promise<void> {
    return new Promise<void>(resolve => {
      this.oauthService.configure(this.authConfig);
      this.oauthService.events.subscribe(e => this.handleEvents(e));
      this.oauthService.loadDiscoveryDocumentAndTryLogin().finally(() => {
        this.oauthService.setupAutomaticSilentRefresh();
        resolve();
      });
    });
  }

  public getRoles(): Observable<Array<string>> {
    const clientRoles = this._decodedAccessToken?.['resource_access']?.[this.authConfig.clientId ?? '']?.roles;
    if (!clientRoles) {
      return of([]);
    }
    const roles: string[] = Array.isArray(clientRoles) ? clientRoles : [clientRoles];
    return of(roles.map(r => r.replace('ROLE_', '')));
  }

  public getIdentityClaims(): Record<string, any> {
    return this.oauthService.getIdentityClaims();
  }

  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public logout(): void {
    this.oauthService.logOut();
    this.useraliasSubject.next('');
    this.usernameSubject.next('');
  }

  public login(): void {
    this.oauthService.initLoginFlow();
  }

  private handleEvents(event: unknown): void {
    if (event instanceof OAuthErrorEvent) {
      return;
    }

    this._accessToken = this.oauthService.getAccessToken();
    this.accessTokenSubject.next(this._accessToken);
    this._decodedAccessToken = this._accessToken ? this.jwtHelper.decodeToken(this._accessToken) : undefined;

    if (this._decodedAccessToken?.['family_name'] && this._decodedAccessToken?.['given_name']) {
      const username = this._decodedAccessToken['given_name'] + ' ' + this._decodedAccessToken['family_name'];
      this.usernameSubject.next(username);
    }

    const claims = this.getIdentityClaims();
    if (claims?.['preferred_username']) {
      this.useraliasSubject.next(claims['preferred_username']);
    }
  }
}
