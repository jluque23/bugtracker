import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/helpers/header/header.component';
import { FooterComponent } from './shared/helpers/footer/footer.component';
import { PaginatorComponent } from './shared/helpers/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

import { LoginComponent } from './auth/login/login.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { SignupComponent } from './auth/signup/signup.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { AccountComponent } from './auth/settings/account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OpenedbugsComponent } from './openedbugs/openedbugs.component';
import { ClosedbugsComponent } from './closedbugs/closedbugs.component';
import { ManagerolesComponent } from './manageroles/manageroles.component';
import { UsermodalComponent } from './manageroles/usermodal/usermodal.component';
import { NewbugComponent } from './openedbugs/newbug/newbug.component';

import { NotificationsComponent } from './notifications/notifications.component';
import { BugdetalleComponent } from './shared/helpers/bugdetalle/bugdetalle.component';
import { BugexterminatorComponent } from './bugexterminator/bugexterminator.component';

const routes: Routes = [
  { path: '', redirectTo: '/bugexterminator', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'} },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  { path: 'openedbugs', component: OpenedbugsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'} },
  { path: 'detallebug/:bugId', component: BugdetalleComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'} },
  { path: 'closedbugs', component: ClosedbugsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'} },
  { path: 'manageroles', component: ManagerolesComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  { path: 'newbug', component: NewbugComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'} },
  { path: 'login', component: LoginComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'bugexterminator', component: BugexterminatorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PaginatorComponent,
    LoginComponent,
    SignupComponent,
    SettingsComponent,
    AccountComponent,
    DashboardComponent,
    OpenedbugsComponent,
    ClosedbugsComponent,
    ManagerolesComponent,
    UsermodalComponent,
    NewbugComponent,
    BugdetalleComponent,
    NotificationsComponent,
    BugexterminatorComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    BrowserAnimationsModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule,
    Ng2SearchPipeModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
