import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EdituserComponent } from './edituser/edituser.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'showUsers', component: TableComponent },
  { path: 'addUser', component: AddComponent },
  { path: 'editUser/:id', component: EdituserComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
