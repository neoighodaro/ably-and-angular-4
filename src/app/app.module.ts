import { NgModule }      		from '@angular/core';
import { BrowserModule } 		from '@angular/platform-browser';
import { FormsModule } 			from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  		from './app.component';
import { UserComponent }  		from './components/user.component';
import { AdminComponent }  		from './components/admin.component';

const appRoutes: Routes = [
   { path: '', 	component: UserComponent },
   { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports:      [ BrowserModule, FormsModule,RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent, UserComponent, AdminComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
