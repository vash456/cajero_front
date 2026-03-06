const admin = "admin"
const clave = "1234"

function validarUsuarioYcontraseina(usuario, password) {
    if (admin === usuario && clave === password) {
        console.log("Inicio se sesión exitoso");
        return true
    } else {
        console.log("Usuario no valido");
        return false
    }
}
function menu() {
    let opcion = prompt("1.Retirar\n2.Consultar saldo\n3.Consigar\n4.Consultar movimientos\n5.Salir")
    return opcion
}

function menuInicio() {
    let inicio = prompt("1.Iniciar\n2.Registrase\n3.Salir")
    return inicio
}

function registrarUsuario(){
    let usuario = prompt("Por favor cree un nombre de usuario")
    let contraseña = prompt ("Por favor cree una contraseña")
    let montoInicial = prompt ("Ahora ingrese su saldo inicial")
    return [usuario,contraseña,montoInicial]
}

function main() {
    let usuarios = []
    let inicio = ""
    while (inicio) {
        switch (inicio) {
            case "1":
                let usuario = prompt("Por favor ingresa tu nombre de usuario")
                let password = prompt("Ahora ingresa tu contraseña")
                if (validarUsuarioYcontraseina(usuario, password)) {
                    let opcion = ""
                    while (opcion != "5") {
                        opcion = menu()
                        switch (opcion) {
                            case "1":

                                break;
                            case "2":

                                break;
                            case "3":

                                break;
                            case "4":

                                break;

                            default:
                                break;
                        }

                    }

                }

                break;
            case "2":

                break;
            case "3":

                break;

            default:
                break;
        }


    }


}


main()