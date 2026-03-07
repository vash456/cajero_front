import * as tr from "./transacciones.js"

function iniciarData(usuarios) {
    //localStorage.removeItem(LIST_USUARIOS);
    const identificacion = "0000000000"
    const correo = ""
    const admin = "admin"
    const clave = "1234"
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
    localStorage.setItem(LIST_USUARIOS, JSON.stringify(usuarios))
}
function obtenerUsuario(username) {
    const usuarios = JSON.parse(localStorage.getItem(LIST_USUARIOS)) || [];
    return usuarios.find(u => u.username === username);
}

function validarUsuarioYcontraseina(usuario, password) {
    const usuarios = JSON.parse(localStorage.getItem(LIST_USUARIOS)) || [];
    const user = usuarios.find(
        u => u.username === usuario && u.clave === password
    );

    if (!user) {
        console.log("Usuario o contraseña inválidos");
        return false;
    }

    if (user.estado === "bloqueado") {
        alert("Usuario bloqueado, por favor contacte al administrador");
        console.log("Usuario bloqueado, por favor contacte al administrador");
        return false;
    }

    alert("Inicio de sesión exitoso");
    console.log("Inicio de sesión exitoso");
    return true;
}

function incrementarIntentosFallidos(user) {
    alert("Le quedan " + (2 - user.intentos) + " intentos");
    console.log("Le quedan " + (2 - user.intentos) + " intentos");
    user.intentos++;
    return user.intentos;
}

function menu() {
    let opcion = prompt("1.Retirar\n2.Consultar saldo\n3.Consigar\n4.Consultar movimientos\n5.Salir")
    return opcion
}

function menuInicio() {
    let inicio = prompt("1.Iniciar sesion\n2.Registrase\n3.Salir")
    return inicio
}

function registrarUsuario() {
    let identificacion = prompt("Por favor ingrese su numero de identificacion")
    let username = prompt("Por favor cree un nombre de usuario")
    let correo = prompt("Ahora ingrese su correo electronico")
    let clave = prompt("Por favor cree una clave de acceso")
    while (true) {
        let confirmarClave = prompt("Confirme su clave de acceso")
        if (confirmarClave === clave) {
            break
        } else {
            console.log("Las claves no coinciden, por favor intente de nuevo")
        }
    }
    let montoInicial = 0
    while (true) {
        montoInicial = prompt("Ahora ingrese su saldo inicial")
        if (!isNaN(montoInicial) && montoInicial >= 0) {
            break
        } else {
            console.log("El monto inicial no es válido, por favor intente de nuevo")
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

function main() {
    let usuarios = []
    iniciarData(usuarios)
    let inicio = true
    while (inicio) {
        inicio = menuInicio()
        switch (inicio) {
            case "1":
                let userName = prompt("Por favor ingresa tu nombre de usuario")
                let password = prompt("Ahora ingresa tu contraseña")
                console.log("aqui es");
                if (validarUsuarioYcontraseina(userName, password)) {
                    const usuario = obtenerUsuario(userName)
                    let opcion = ""
                    while (opcion != "5") {
                        opcion = menu()
                        switch (opcion) {
                            case "1":
                                tr.retirarDinero(usuario)

                                break;
                            case "2":
                                tr.consultarSaldo(usuario)

                                break;
                            case "3":
                                tr.consignarDinero(usuario)

                                break;
                            case "4":
                                tr.consultarMovimientos(usuario)

                                break;
                            case "5":
                                opcion = "5"

                                break;

                            default:
                                console.log("Valor no valido");
                                break;
                        }

                    }

                } else {
                    usuarios.forEach(user => {
                        if (user.username === usuario) {
                            if (user.estado === "bloqueado") {
                                alert("Usuario bloqueado, por favor contacte al administrador");
                                console.log("Usuario bloqueado, por favor contacte al administrador");
                            }else{
                                if (incrementarIntentosFallidos(user) >= 3) {
                                    console.log(user);
                                    alert("Usuario bloqueado, por favor contacte al administrador");
                                    console.log("Usuario bloqueado, por favor contacte al administrador");
                                    user.estado = "bloqueado";
                                    localStorage.setItem(LIST_USUARIOS, JSON.stringify(usuarios));
                                }
                            }

                        }
                    });
                }

                break;
            case "2":
                let nuevoUsuario = registrarUsuario()
                usuarios.push(nuevoUsuario)
                localStorage.setItem(LIST_USUARIOS, JSON.stringify(usuarios))
                break;
            case "3":
                inicio = false
                console.log("Terminando ejecucion");
                break;

            default:
                console.log("Valor no valido");
                break;
        }


    }


}


const LIST_USUARIOS = "usuarios"
main()