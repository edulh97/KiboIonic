import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TelefonosUsuario } from '../model/telefono.model';

export interface Usuario {
  id?: number;
  nombreCompleto: string;
  correoElectronico: string;
  direccion: string;
  contrasena: string;
  tarjeta: number;
  tipoUsuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/kibo/usuarios';
  private baseUrl = 'http://localhost:8080/kibo/';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTelefonosDeUsuario(id: number): Observable<TelefonosUsuario[]> {
    return this.http.get<TelefonosUsuario[]>(`${this.baseUrl}telefonos_usuarios/${id}`);
  }

  addTelefonoAUsuario(idUsuario: number, telefono: string): Observable<TelefonosUsuario> {
    const url = `http://localhost:8080/kibo/telefonos_usuarios/${idUsuario}`;
    const body = { idUsuario, telefono };
    return this.http.post<TelefonosUsuario>(url, body);
  }

  deleteTelefonoDeUsuario(idUsuario: number, telefono: string): Observable<string> {
    const url = `http://localhost:8080/kibo/telefonos_usuarios/${idUsuario}`;
    const body = { idUsuario, telefono };
    return this.http.delete(url, { body, responseType: 'text' }) as Observable<string>;
  }

}
