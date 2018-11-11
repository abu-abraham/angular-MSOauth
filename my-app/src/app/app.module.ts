import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HttpClientModule } from '@angular/common/http';

import { HttpService } from './shared/http.service';
import { AuthService } from './auth/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'home', component: HomeComponentComponent },
  { path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpService,
    AuthService],
  bootstrap: [AppComponent]
})


export class AppModule { }
