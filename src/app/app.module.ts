import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/helpers/header/header.component';
import { FooterComponent } from './shared/helpers/footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PaginatorComponent } from './shared/helpers/paginator/paginator.component';
import { ProductosComponent } from './productos/productos.component';
import { CrearClienteFormComponent } from './clientes/crearcliente/crearclienteform.component';
import { CrearproductoformComponent } from './productos/crearproductoform/crearproductoform.component';
import { DetalleproductoComponent } from './productos/detalleproducto/detalleproducto.component';
import { QuienSoyComponent } from './quiensoy/quiensoy.component';
import { DetalleFacturaComponent } from './clientes/facturas/detalle-factura.component';
import { FacturasComponent } from './clientes/facturas/facturas.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleComponent } from './clientes/detalle/detalle.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { LoginComponent } from './auth/login/login.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ExperienciaComponent } from './quiensoy/experiencia/experiencia.component';
import { EstapaginaComponent } from './quiensoy/estapagina/estapagina.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { ProfileComponent } from './auth/settings/profile/profile.component';
import { AccountComponent } from './auth/settings/account/account.component';
import { BillingComponent } from './auth/settings/billing/billing.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { PublicacionesdetalleComponent } from './publicaciones/publicacionesdetalle/publicacionesdetalle.component';
import { CrearpublicacionComponent } from './publicaciones/crearpublicacion/crearpublicacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'quiensoy', component: QuienSoyComponent },
  { path: 'experiencia', component: ExperienciaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'estapagina', component: EstapaginaComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'publicaciones', component: PublicacionesComponent},
  { path: 'publicaciones/detalle/:publicacionId', component: PublicacionesdetalleComponent},
  { path: 'publicaciones/page/:page', component: PublicacionesComponent },
  { path: 'publicaciones/crearpublicacion', component: CrearpublicacionComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form', component: CrearClienteFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'clientes/form/:id', component: CrearClienteFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'login', component: LoginComponent },
  { path: 'facturas/:id', component: DetalleFacturaComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_USER' }},
  { path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  { path: 'productos/page/:page', component: ProductosComponent },
  { path: 'productos/form', component: CrearproductoformComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  { path: 'productos/form/:productoId', component: CrearproductoformComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }}  

  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    QuienSoyComponent,
    ClientesComponent,
    CrearClienteFormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent,
    ProductosComponent,
    CrearproductoformComponent,
    DetalleproductoComponent,
    ExperienciaComponent,
    EstapaginaComponent,
    SignupComponent,
    SettingsComponent,
    ProfileComponent,
    AccountComponent,
    BillingComponent,
    PublicacionesComponent,
    PublicacionesdetalleComponent,
    CrearpublicacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    BrowserAnimationsModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
