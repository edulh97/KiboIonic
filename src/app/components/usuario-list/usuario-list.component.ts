import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { ModalController, AlertController } from '@ionic/angular';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { TelefonosUsuario } from 'src/app/model/telefono.model';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];
  telefonosSeleccionados: TelefonosUsuario[] = [];
  usuarioSeleccionado?: number;
  usuarioSeleccionadoNombre?: string;
  nuevoTelefono: string = '';
  mostrarTelefonos: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  async addUsuario() {
    const modal = await this.modalController.create({
      component: UsuarioFormComponent
    });
    modal.onDidDismiss().then(() => {
      this.loadUsuarios();
    });
    return await modal.present();
  }

  async editUsuario(usuario: Usuario) {
    const modal = await this.modalController.create({
      component: UsuarioFormComponent,
      componentProps: { usuario }
    });
    modal.onDidDismiss().then(() => {
      this.loadUsuarios();
    });
    return await modal.present();
  }

  async deleteUsuario(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.usuarioService.deleteUsuario(id).subscribe(() => {
              this.loadUsuarios();
            });
          },
        },
      ],
    });

    await alert.present();

  }

  //Metodos para los telefonos

  verTelefonos(usuario: Usuario) {
    if (!usuario.id) return;
    this.usuarioSeleccionado = usuario.id;
    this.usuarioSeleccionadoNombre = usuario.nombreCompleto;

    this.usuarioService.getTelefonosDeUsuario(usuario.id).subscribe((telefonos) => {
      this.telefonosSeleccionados = telefonos;
      this.mostrarTelefonos = true;
    });
  }

  deleteTelefono(telefono: string) {
    if (!this.usuarioSeleccionado) return;
    this.usuarioService.deleteTelefonoDeUsuario(this.usuarioSeleccionado, telefono).subscribe(
      () => {
        this.telefonosSeleccionados = this.telefonosSeleccionados.filter(t => t.telefono !== telefono);
      },
      (error) => {
        console.error('Error al eliminar el teléfono:', error);
      }
    );
  }

  addTelefono() {
    if (!this.usuarioSeleccionado || !this.nuevoTelefono) return;

    this.usuarioService.addTelefonoAUsuario(this.usuarioSeleccionado, this.nuevoTelefono).subscribe(
      (telefonoCreado) => {
        this.telefonosSeleccionados.push(telefonoCreado);
        this.nuevoTelefono = '';
      },
      (error) => {
        console.error('Error al añadir el teléfono:', error);
      }
    );
  }

  async verDetalleUsuario(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: 'Detalle del Usuario',
      message: `
        Su contraseña es: ${usuario.contrasena}              y 
        la tarjeta bancaria asociada a su cuenta es: ${usuario.tarjeta}
      `,
      buttons: ['OK']
    });

    await alert.present();
  }


}