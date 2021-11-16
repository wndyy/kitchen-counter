import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { StoreComponent } from './store/store.component';
import { StoreOrdersComponent } from './store-orders/store-orders.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginUserComponent,
    RegisterUserComponent,
    CreateStoreComponent,
    StoreComponent,
    StoreOrdersComponent,
    UserOrdersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'login-user', component: LoginUserComponent },
      { path: 'create-store', component: CreateStoreComponent }
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
