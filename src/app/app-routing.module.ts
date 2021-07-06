import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './agregar/agregar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ContactosComponent } from './contactos/contactos.component';

const routes: Routes = [
  {path: 'agregar', component: AgregarComponent},
  {path: 'contactos', component: ContactosComponent},
  {path: 'contacto/:id', component: ContactoComponent},
  {path: '**', redirectTo: 'agregar'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
