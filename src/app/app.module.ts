import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UsuariosModule } from './components/usuarios.module';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), UsuariosModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
