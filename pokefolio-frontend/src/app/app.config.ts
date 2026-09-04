import { provideHttpClient, withInterceptors, withInterceptorsFromDi, withXsrfConfiguration } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AuthConfig, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';
import { authConfig } from './app.auth';
import { routes } from './app.routes';
import { withCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { AppAuthService } from './service/app.auth.service';

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
        BrowserModule,
    ),
    { 
        provide: AuthConfig, 
        useValue: authConfig 
    },
    {
      provide: OAuthStorage,
      useFactory: storageFactory,
    },
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([withCredentialsInterceptor]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    ),
    provideOAuthClient({ 
        resourceServer: { 
            sendAccessToken: true, 
            allowedUrls: [environment.backendBaseUrl], 
        } 
    }),
    provideAppInitializer(() => inject(AppAuthService).initAuth())
  ]
};