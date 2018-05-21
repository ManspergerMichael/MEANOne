import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsComponent } from './pets/pets.component';
import {NewComponent} from './new/new.component';
import {EditComponent} from './edit/edit.component';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [
  {path: '', pathMatch:'full', component: PetsComponent},
  {path: 'pets', component: PetsComponent},
  {path: 'new', component: NewComponent},
  {path: 'edit/:id', component:EditComponent},
  {path: 'details/:id', component:DetailsComponent}
]
@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
  
})
export class AppRoutingModule { }
