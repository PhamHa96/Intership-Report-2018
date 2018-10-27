import { StatesService } from './providers/state.service';
import { TokenService } from './providers/token.service';
import { UserService } from './providers/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuanAnService } from './providers/quan-an.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { LoginService } from './providers/login.service';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
// import { HomeguardService } from './providers/homeguard.service';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { QuananComponent } from './content/quanan/quanan.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MyDialogComponent } from '../app/content/my-dialog/my-dialog.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewHomeComponent } from './view-home/view-home.component';
import { ToastrModule } from 'ngx-toastr';
import { JoinDialogComponent } from './content/join-dialog/join-dialog.component';
import { FriendComponent } from './friend/friend.component';
import { ListfriendsComponent } from './friend/listfriends/listfriends.component';
import { ProfileComponent } from './friend/profile/profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './/app-routing.module';
import { GoogleMapAgmComponent } from './google-map-agm/google-map-agm.component';
import { environment } from '../environments/environment.prod';
import { InfoComponent } from './content/info/info.component';
import { UserComponent } from './user/user.component';
import { ChangepassComponent } from './user/changepass/changepass.component';
import { SignoutComponent } from './user/signout/signout.component';
import { EditComponent } from './user/edit/edit.component';
import { SignupService } from './providers/signup.service';
import { AddLocationComponent } from './add-location/add-location.component';
import { GetprofileService } from './providers/getprofile.service';
import { ContactComponent } from './contact/contact.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { TypeFoodService } from './providers/type-food.service';
import { DetailpartyComponent } from './detailparty/detailparty.component';
import { AgmDirectionModule } from 'agm-direction';
import { AdminComponent } from './admin/admin.component';
import { QuanliquananComponent } from './quanliquanan/quanliquanan.component';
import { LoaihinhquananComponent } from './loaihinhquanan/loaihinhquanan.component';
import { DetailsuaquanComponent } from './detailsuaquan/detailsuaquan.component';
// import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';


// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('393343071138921')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('432469042041-3o2vl8f34jhqhbeami16vnkc8j28o6dp.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    QuananComponent,
    MenuComponent,
    FooterComponent,
    MyDialogComponent,
    LoginComponent,
    SignupComponent,
    ViewHomeComponent,
    FriendComponent,
    ListfriendsComponent,
    ProfileComponent,
    WelcomeComponent,
    JoinDialogComponent,
    PageNotFoundComponent,
    InfoComponent,
    GoogleMapAgmComponent,
    UserComponent,
    ChangepassComponent,
    SignoutComponent,
    EditComponent,
    AddLocationComponent,
    ContactComponent,
    FavoriteComponent,
    DetailpartyComponent,
    AdminComponent,
    QuanliquananComponent,
    LoaihinhquananComponent,
    DetailsuaquanComponent
  ],
  imports: [
    AgmDirectionModule,
    BrowserModule,
    AngularFontAwesomeModule,
    [BrowserAnimationsModule],
    [AlertModule.forRoot()],
    NgbModule.forRoot(),
    MatDialogModule,
    ToastrModule.forRoot(),
    HttpModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBtHJaP8NyKmn0-sOaMS_WJ5lj8Hu2HrI0',
      libraries: ['places']
    }),
    FormsModule,
    CommonModule,
    SocialLoginModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    MyDialogComponent,
    JoinDialogComponent
  ],
  providers: [ StatesService, UserService, TokenService, QuanAnService, LoginService, SignupService, TypeFoodService, GetprofileService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
