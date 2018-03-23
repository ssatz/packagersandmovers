import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { BookingComponent } from './components/booking/booking.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderSigninComponent } from './components/header-signin/header-signin.component';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { HistoryBookingComponent } from './components/history-booking/history-booking.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddTackingComponent } from './components/add-tacking/add-tacking.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HttpModule } from '@angular/http'
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from './components/_guards/index';
import { JwtInterceptor } from './components/_helpers/index';
import { AlertService, LoginService } from './components/_services/index';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImagegalaryComponent } from './components/imagegalary/imagegalary.component';
import { ContactusComponent } from './components/contactus/contactus.component';

// used to create fake backend
import { fakeBackendProvider } from './components/_helpers/index';
const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile Component!!!!' } },
  { path: 'booking', component: BookingComponent, data: { title: 'Booking Component!!!!' } },
  { path: 'tracking', component: TrackingComponent, data: { title: 'Tracking Component!!!!' } },
  { path: 'signup', component: SignupComponent, data: { title: 'Tracking Component!!!!' } },
  { path: 'signin', component: SignupComponent, data: { title: 'Tracking Component!!!!' } },
  { path: '', component: HomeComponent, data: { title: 'Tracking Component!!!!' } },
  { path: 'addTracking', component: AddTackingComponent, data: { title: 'Tracking Component!!!!' } },
  { path: 'messages', component: MessagesComponent, data: { title: 'Tracking Component!!!!' } },
  { path: 'imagegalary', component: ImagegalaryComponent, data: { title: 'Tracking Component!!!!' } },
  { path: 'contactus', component: ContactusComponent, data: { title: 'Tracking Component!!!!' } }
];
@NgModule({
  declarations: [AppComponent, ProfileComponent, BookingComponent, TrackingComponent, HeaderComponent,
    FooterComponent, MenuComponent, HeaderSigninComponent, CreateBookingComponent,
    HistoryBookingComponent, SignupComponent, HomeComponent, AddTackingComponent, MessagesComponent, ContactusComponent, ImagegalaryComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true,useHash: true }),
    FormsModule, 
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }