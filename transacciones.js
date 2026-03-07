function consultarSaldo(usuario) {
    alert("Tu saldo actual es: " + usuario.saldo)
    console.log("Tu saldo actual es: " + usuario.saldo);
    return usuario.saldo
}

function retirarDinero(usuario) {
    let montoARetirar = parseFloat(prompt("¿Cuánto dinero deseas retirar?"))
    if (montoARetirar <= 0 || isNaN(montoARetirar)) {
        alert("Monto inválido. Por favor, ingresa un monto válido.")
        console.log("Monto inválido. Por favor, ingresa un monto válido.")
        return false
    }
    if (montoARetirar > usuario.saldo) {
        alert("No tienes suficiente saldo para realizar este retiro.")
        console.log("No tienes suficiente saldo para realizar este retiro.")
        return false
    }
    let saldoAnterior = usuario.saldo
    usuario.saldo -= montoARetirar
    alert("Retiro exitoso. Tu nuevo saldo es: " + usuario.saldo)
    console.log("Retiro exitoso. Tu nuevo saldo es: " + usuario.saldo)
    registrarMovimiento(usuario, "Retiro", -montoARetirar, saldoAnterior)
    return true
}

function consignarDinero(usuario) {
    let montoAConsignar = parseFloat(prompt("¿Cuánto dinero deseas consignar?"))
    if (isNaN(montoAConsignar) || montoAConsignar <= 0) {
        alert("Monto inválido. Por favor, ingresa un monto válido.")
        console.log("Monto inválido. Por favor, ingresa un monto válido.")
        return false
    }
    let saldoAnterior = usuario.saldo
    usuario.saldo += montoAConsignar
    alert("Consignación exitosa. Tu nuevo saldo es: " + usuario.saldo)
    console.log("Consignación exitosa. Tu nuevo saldo es: " + usuario.saldo)
    registrarMovimiento(usuario, "Consignación", montoAConsignar, saldoAnterior)
    return true
}

function consultarMovimientos(usuario) {
    if (usuario.movimientos.length === 0) {
        alert("No tienes movimientos registrados.")
        console.log("No tienes movimientos registrados.");
    } else {
        let mensaje = "Tus movimientos:\n"
        usuario.movimientos.forEach((movimiento, index) => {
            mensaje += `${index + 1}. ${movimiento.fecha} - ${movimiento.concepto}: ${movimiento.valor} (Saldo anterior: ${movimiento.saldo})\n`
        })
        alert(mensaje)
        console.log(mensaje)
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
}

export { retirarDinero, consultarSaldo, consignarDinero, consultarMovimientos };