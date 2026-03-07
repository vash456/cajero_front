import { guardarEnLocalStorage, cargarUsuariosDesdeLocalStorage, mostrarMensaje } from "./utils.js";


export function consultarSaldo(usuario) {
    mostrarMensaje("Tu saldo actual es: " + usuario.saldo)
    return usuario.saldo
}

export function retirarDinero(usuario) {
    let montoARetirar = parseFloat(prompt("¿Cuánto dinero deseas retirar?"))
    if (montoARetirar <= 0 || isNaN(montoARetirar)) {
        mostrarMensaje("Monto inválido. Por favor, ingresa un monto válido.")
        return false
    }
    if (montoARetirar > usuario.saldo) {
        mostrarMensaje("No tienes suficiente saldo para realizar este retiro.")
        return false
    }
    let saldoAnterior = usuario.saldo
    usuario.saldo = parseFloat(saldoAnterior) - montoARetirar
    mostrarMensaje("Retiro exitoso. Tu nuevo saldo es: " + usuario.saldo)
    registrarMovimiento(usuario, "Retiro", -montoARetirar, saldoAnterior)
    return true
}

export function consignarDinero(usuario) {
    let montoAConsignar = parseFloat(prompt("¿Cuánto dinero deseas consignar?"))
    if (isNaN(montoAConsignar) || montoAConsignar <= 0) {
        mostrarMensaje("Monto inválido. Por favor, ingresa un monto válido.")
        return false
    }
    let saldoAnterior = usuario.saldo
    usuario.saldo = parseFloat(saldoAnterior) + montoAConsignar
    mostrarMensaje("Consignación exitosa. Tu nuevo saldo es: " + usuario.saldo)
    registrarMovimiento(usuario, "Consignación", montoAConsignar, saldoAnterior)
    return true
}

export function consultarMovimientos(usuario) {
    if (usuario.movimientos.length === 0) {
        mostrarMensaje("No tienes movimientos registrados.")
    } else {
        let mensaje = "Tus movimientos:\n"
        usuario.movimientos.forEach((movimiento, index) => {
            mensaje += `${index + 1}. ${movimiento.fecha} - ${movimiento.concepto}: ${movimiento.valor} (Saldo anterior: ${movimiento.saldo})\n`
        })
        mostrarMensaje(mensaje)
    }
}

function registrarMovimiento(usuario, concepto, valor, saldo) {
    let fecha = new Date().toLocaleString()
    let movimiento = {
        "fecha": fecha,
        "concepto": concepto,
        "valor": valor,
        "saldo": saldo
    }
    usuario.movimientos.push(movimiento)
    guardarEnLocalStorage(cargarUsuariosDesdeLocalStorage())
}
