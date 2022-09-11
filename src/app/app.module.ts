import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { UserListComponent } from './user-list/user-list.component';
import { ResetPassComponent } from './reset/reset-pass/reset-pass.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { TokenInterceptor } from './services/TokenInterceptor';
import { ErrorInterceptor } from './services/ErrorInterceptor';
import { EditTweetComponent } from './edit-tweet/edit-tweet.component';
import { ReplyTweetComponent } from './reply-tweet/reply-tweet.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    TweetListComponent,
    DateAgoPipe,
    UserListComponent,
    ResetPassComponent,
    EditTweetComponent,
    ReplyTweetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
