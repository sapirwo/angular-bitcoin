import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactAddComponent } from './pages/contact-add/contact-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModalComponent } from './cmps/alert-modal/alert-modal.component';
import { LastMovesUserComponent } from './cmps/last-moves-user/last-moves-user.component';
import { LastMovesContactComponent } from './cmps/last-moves-contact/last-moves-contact.component';
import { ExchangeChartComponent } from './cmps/exchange-chart/exchange-chart.component';
import { MobileSideNavComponent } from './cmps/mobile-side-nav/mobile-side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFilterComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactDetailsPageComponent,
    ContactEditPageComponent,
    ContactPageComponent,
    HomePageComponent,
    ContactAddComponent,
    AlertModalComponent,
    LastMovesUserComponent,
    LastMovesContactComponent,
    ExchangeChartComponent,
    MobileSideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleChartsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSidenavModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
