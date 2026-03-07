import { guardarEnLocalStorage, cargarUsuariosDesdeLocalStorage, mostrarMensaje } from "./utils.js";


export function registrarDatosUsuario() {
    let identificacion = prompt("Por favor ingrese su numero de identificacion")
    let username = prompt("Por favor cree un nombre de usuario")
    let correo = prompt("Ahora ingrese su correo electronico")
    let clave = prompt("Por favor cree una clave de acceso")
    while (true) {
        let confirmarClave = prompt("Confirme su clave de acceso")
        if (confirmarClave === clave) {
            break
        } else {
            mostrarMensaje("Las claves no coinciden, por favor intente de nuevo")
        }
    }
    let montoInicial = 0
    while (true) {
        montoInicial = prompt("Ahora ingrese su saldo inicial")
        if (!isNaN(montoInicial) && montoInicial >= 0) {
            break
        } else {
            mostrarMensaje("El monto inicial no es válido, por favor intente de nuevo")
        }
    }
    return {
        "identificacion": identificacion,
        "username": username,
        "correo": correo,
        "clave": clave,
        "saldo": montoInicial,
        "intentos": 0,
        "estado": "activo", //activo o bloqueado
        "movimientos": []
    }
}

export function agregarUsuario(usuarios, nuevoUsuario) {
    usuarios.push(nuevoUsuario)
    guardarEnLocalStorage(usuarios)
}

export function obtenerUsuario(username) {
    const usuarios = cargarUsuariosDesdeLocalStorage()
    return usuarios.find(u => u.username === username);
}