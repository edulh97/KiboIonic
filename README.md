
### Un poco de información

Este proyecto es una aplicación desarrollada con Ionic y Angular que permite la gestión de usuarios y sus teléfonos asociados.
A través de una interfaz intuitiva, los usuarios pueden realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los registros de usuarios y teléfonos.

- **components**: Contiene los componentes de la aplicación.
  - `usuario-form`: Componente para crear y editar usuarios.
  - `usuario-list`: Componente para mostrar la lista de usuarios con sus respectivos datos.
  
- **model**: Define los modelos de datos, como el modelo `Telefono` en `telefono.model.ts`.

- **services**: Contiene los servicios encargados de la lógica de negocio, como `usuario.service.ts`, que gestiona las operaciones CRUD sobre los usuarios y sus telefonos asociados.

- **app.module.ts**: El módulo principal de la aplicación donde se configuran los componentes y servicios.

## Instalación

1. Clona este repositorio en tu máquina local.

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git

2. Navega al directorio del proyecto
   
   ```bash
    cd tu-repositorio
   
4. Instala las dependencias del proyecto.

   ```bash
    npm install

5. Inicia la aplicación utilizando el siguiente comando:
   
   ```bash
    ionic serve

