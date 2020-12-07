import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { domain, clientId, audience, serverUrl } from '../../env.json';
import { LayoutComponent } from './layout/layout.component';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './modules/users/state/users.effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { LabsEffects } from './modules/labs/state/labs.effects';
import { MeasurementsEffects } from './modules/measurements/state/measurements.effects';
import { reducers, metaReducers } from './app.state';
import { MatCardModule } from '@angular/material/card';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    LayoutComponent
  ],
  imports: [
    AuthModule.forRoot({
      domain,
      clientId,
      audience,
      httpInterceptor: {
        allowedList: [
          `${serverUrl}/api/labs/use`,
          `${serverUrl}/api/labs/free`,
          `${serverUrl}/api/measurements`,
          `${serverUrl}/api/measurements/*`,
          `${serverUrl}/api/users`,
          `${serverUrl}/api/history`
        ]
      }
    }),
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      LabsEffects,
      MeasurementsEffects,
      UsersEffects
    ]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
