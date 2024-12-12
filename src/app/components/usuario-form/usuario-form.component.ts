import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit {

  @Input() usuario!: Usuario;
  usuarioForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      nombreCompleto: [this.usuario?.nombreCompleto || '', Validators.required],
      correoElectronico: [this.usuario?.correoElectronico || '', [Validators.required]],
      direccion: [this.usuario?.direccion || '', Validators.required],
      contrasena: [this.usuario?.contrasena || '', Validators.required],
      tarjeta: [this.usuario?.tarjeta || '', Validators.required],
      tipoUsuario: [this.usuario?.tipoUsuario || '', Validators.required],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  saveUsuario() {
    if (this.usuarioForm.valid) {
      const usuarioData: Usuario = { ...this.usuario, ...this.usuarioForm.value };
      if (usuarioData.id) {
        this.usuarioService.updateUsuario(usuarioData.id, usuarioData).subscribe(() => {
          this.dismiss();
        });
      } else {

        this.usuarioService.addUsuario(usuarioData).subscribe(() => {
          this.dismiss();
        });
      }
    }
  }


}
