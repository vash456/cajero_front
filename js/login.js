import { guardarEnLocalStorage, cargarUsuariosDesdeLocalStorage, mostrarMensaje } from "./utils.js";


export function validarUsuarioYcontraseina(usuario, password) {
    const usuarios = cargarUsuariosDesdeLocalStorage();
    const user = usuarios.find(
        u => u.username === usuario && u.clave === password
    );

    if (!user) {
        mostrarMensaje("Usuario o contraseña inválidos");
        return false;
    }

    if (user.estado === "bloqueado") {
        mostrarMensaje("Usuario bloqueado, por favor contacte al administrador");
        return false;
    }

    mostrarMensaje("Inicio de sesión exitoso");
    return true;
}

function incrementarIntentosFallidos(user) {
    mostrarMensaje("Le quedan " + (2 - user.intentos) + " intentos");
    user.intentos++;
    return user.intentos;
}

export function validarIntentosFallidos(usuarios, username) {
    usuarios.forEach(user => {
        if (user.username === username) {
            if (user.estado === "bloqueado") {
                mostrarMensaje("Usuario bloqueado, por favor contacte al administrador");
            } else {
                if (incrementarIntentosFallidos(user) >= 3) {
                    console.log(user);
                    mostrarMensaje("Usuario bloqueado, por favor contacte al administrador");
                    user.estado = "bloqueado";
                    guardarEnLocalStorage(usuarios);
                }
            }

        }
    });
}