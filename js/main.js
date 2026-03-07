import { iniciarData, limpiarData, menu, menuInicio, mostrarMensaje } from "./utils.js";
import { registrarDatosUsuario, agregarUsuario, obtenerUsuario } from "./usuario.js";
import { retirarDinero, consultarSaldo, consignarDinero, consultarMovimientos } from "./transacciones.js";
import { validarUsuarioYcontraseina, validarIntentosFallidos } from "./login.js";


function main() {
    let usuarios = []
    let inicio = true
    iniciarData(usuarios)
    
    while (inicio) {
        inicio = menuInicio()
        switch (inicio) {
            case "1":
                let username = prompt("Por favor ingresa tu nombre de usuario")
                let password = prompt("Ahora ingresa tu contraseña")
                if (validarUsuarioYcontraseina(username, password)) {
                    const usuario = obtenerUsuario(username)
                    let opcion = ""
                    while (opcion != "5") {
                        opcion = menu()
                        switch (opcion) {
                            case "1":
                                retirarDinero(usuario)
                                break;

                            case "2":
                                consultarSaldo(usuario)
                                break;

                            case "3":
                                consignarDinero(usuario)
                                break;

                            case "4":
                                consultarMovimientos(usuario)
                                break;

                            case "5":
                                opcion = "5"
                                break;

                            default:
                                mostrarMensaje("Valor no valido");
                                break;
                        }
                    }
                } else {
                    validarIntentosFallidos(usuarios, username)
                }
                break;

            case "2":
                let nuevoUsuario = registrarDatosUsuario()
                if (obtenerUsuario(nuevoUsuario.username)) {
                    mostrarMensaje("El nombre de usuario ya existe, por favor elige otro")
                    break;
                }
                agregarUsuario(usuarios, nuevoUsuario)
                break;

            case "3":
                limpiarData()
                mostrarMensaje("Datos eliminados exitosamente")
                break;

            case "4":
                inicio = false
                mostrarMensaje("Terminando ejecucion");
                break;

            default:
                mostrarMensaje("Valor no valido");
                break;
        }
    }
}

// inicio de la aplicacion
main()