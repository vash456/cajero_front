// constantes
export const LIST_USUARIOS = "usuarios"
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "1234"

export function menu() {
    let opcion = prompt("1. Retirar\n2. Consultar saldo\n3. Consigar\n4. Consultar movimientos\n5. Salir")
    return opcion
}

export function menuInicio() {
    let inicio = prompt("1. Iniciar sesion\n2. Registrase\n3. Limpiar datos\n4. Salir")
    return inicio
}

export function mostrarMensaje(mensaje) {
    console.log(mensaje);
    alert(mensaje)
}

export function iniciarData(usuarios) {
    if (localStorage.getItem(LIST_USUARIOS)) {
        usuarios = cargarUsuariosDesdeLocalStorage()
    }else {
        const identificacion = "0000000000"
        const correo = ""
        const admin = ADMIN_USERNAME
        const clave = ADMIN_PASSWORD
        const saldo = 0
        const intentos = 0
        const adminData = {
            "identificacion": identificacion,
            "username": admin,
            "correo": correo,
            "clave": clave,
            "saldo": saldo,
            "intentos": intentos,
            "estado": "activo", //activo o bloqueado
            "movimientos": []
        }
        usuarios.push(adminData)
        guardarEnLocalStorage(usuarios)
    }
}

export function limpiarData() {
    if (confirm("¿Estás seguro de que deseas eliminar todos los datos? Esta acción no se puede deshacer.")) {
        localStorage.removeItem(LIST_USUARIOS)
    }
}

export function guardarEnLocalStorage(usuarios) {
    localStorage.setItem(LIST_USUARIOS, JSON.stringify(usuarios))
}

export function cargarUsuariosDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem(LIST_USUARIOS)) || [];
}