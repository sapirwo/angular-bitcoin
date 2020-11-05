import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactAddComponent } from './pages/contact-add/contact-add.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: 'contact/edit/:id', component: ContactEditPageComponent },
  { path: 'contact/add', component: ContactAddComponent },
  { path: 'contact/:id', component: ContactDetailsPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
