import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';

@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioListComponent, 
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    UsuarioFormComponent,
    UsuarioListComponent,
  ],
})
export class UsuariosModule {}
