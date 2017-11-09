import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';


import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path:'', component: HomeComponent },
      { path:'login', component: LoginComponent },
      { path:'admin/products', component: AdminProductsComponent, canActivate:[AuthGuard] },
      { path:'admin/orders', component: AdminOrdersComponent, canActivate:[AuthGuard] }
      
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
