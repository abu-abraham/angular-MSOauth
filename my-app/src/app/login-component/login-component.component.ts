import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client"
import { HttpService } from '../shared/http.service';
import { RequestsService } from '../requests.service';
import { Configs } from '../shared/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private requestService: RequestsService) {}

  getClient(): MicrosoftGraphClient.Client
  {
    var client = MicrosoftGraphClient.Client.init({
      authProvider: (done) => {
          done(null, this.httpService.getAccessToken()); //first parameter takes an error if you can't get an access token
      }
    });
    return client;
  }

  private getSessionToken(data: any) {
    this.requestService.post(Configs.server+"login",data).then((response: any)=>{
      sessionStorage.setItem("session_id", response.session_id);
      this.router.navigate(['home']);
    }).catch (e => console.error("Failed to login"));
  }

  validateCredentials(): Promise<any> {

    var client = this.getClient();
    return new Promise ((resolve, reject)=> {
      (client.api('me').select("displayName, userPrincipalName").get().then ((result => {
        if (result.userPrincipalName.indexOf("anu.edu.au")<1) {
          reject(new Error("anu-id should be used"));
        } else {
          resolve({
            name: result.displayName, 
            email: result.userPrincipalName
          });
        }
      })).catch ((e) => reject(e))
      );
    });
    
  }

  onLogin() {
    this.authService.login().then(()=>{
      this.validateCredentials().then((result)=> {
        this.getSessionToken(result);
      }).catch((e)=>{
        console.log(e);
      });
    }).catch((e)=>{
      console.log(e);
    });
  }

  ngOnInit() {
  }

}
