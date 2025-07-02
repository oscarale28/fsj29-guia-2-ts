import { validateText, validateNumber, createResult } from "../utils";

/**
 * Clase Cuenta
 * Ejercicio 4: Crear una clase para manejar operaciones bancarias básicas
 */
class Cuenta {
    private nombre: string;
    private cantidad: number;
    private tipoCuenta: string;
    private numeroCuenta: string;

    constructor(nombre: string, cantidad: number, tipoCuenta: string, numeroCuenta: string) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.tipoCuenta = tipoCuenta;
        this.numeroCuenta = numeroCuenta;
    }

    /**
     * Método para depositar dinero
     */
    depositar(): string {
        if (this.cantidad < 5.00) {
            return `❌ Error: El valor a depositar debe ser mayor a $5.00. Cantidad actual: $${this.cantidad.toFixed(2)}`;
        }
        return `✅ Depósito realizado correctamente. Se ha depositado $${this.cantidad.toFixed(2)} en su cuenta.`;
    }

    /**
     * Método para retirar dinero
     */
    retirar(valor: number): string {
        if (valor < 5.00) {
            return "❌ Error: El valor mínimo a retirar debe ser mayor a $5.00";
        }

        if (this.cantidad <= 0) {
            return "❌ Error: No hay fondos disponibles en la cuenta.";
        }

        if (valor > this.cantidad) {
            return `❌ Error: Fondos insuficientes. Saldo disponible: $${this.cantidad.toFixed(2)}`;
        }

        this.cantidad -= valor;
        return `✅ Retiro exitoso. Ha retirado $${valor.toFixed(2)}. Saldo restante: $${this.cantidad.toFixed(2)}`;
    }

    /**
     * Método para mostrar los datos de la cuenta
     */
    mostrarDatos(): string {
        return `
      <h3>📊 Información de la Cuenta</h3>
      <div style="display: grid; gap: 0.5rem; margin: 1rem 0;">
        <div><strong>👤 Titular:</strong> ${this.nombre}</div>
        <div><strong>🏦 Tipo de Cuenta:</strong> ${this.tipoCuenta}</div>
        <div><strong>🔢 Número de Cuenta:</strong> ${this.numeroCuenta}</div>
        <div><strong>💰 Saldo Actual:</strong> $${this.cantidad.toFixed(2)}</div>
      </div>
    `;
    }

    // Getters para acceder a los datos desde fuera de la clase
    get getSaldo(): number {
        return this.cantidad;
    }

    get getNombre(): string {
        return this.nombre;
    }

    get getTipoCuenta(): string {
        return this.tipoCuenta;
    }

    get getNumeroCuenta(): string {
        return this.numeroCuenta;
    }
}

export default function exercise4(): HTMLElement {
    const container = document.createElement("div");
    container.innerHTML = `
    <form id="exercise-4-form">
      <div class="input-group">
        <label for="nombre">Nombre del titular</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ingresa el nombre completo" required>
        <span class="error-message" id="nombre-error"></span>
      </div>
      
      <div class="input-group">
        <label for="cantidad">Cantidad inicial (depósito)</label>
        <input type="number" id="cantidad" name="cantidad" placeholder="Monto inicial" step="0.01" min="0" required>
        <span class="error-message" id="cantidad-error"></span>
      </div>
      
      <div class="input-group">
        <label for="tipoCuenta">Tipo de cuenta</label>
        <select id="tipoCuenta" name="tipoCuenta" required>
          <option value="">Selecciona el tipo de cuenta</option>
          <option value="Cuenta de Ahorros">Cuenta de Ahorros</option>
          <option value="Cuenta Corriente">Cuenta Corriente</option>
          <option value="Cuenta de Nómina">Cuenta de Nómina</option>
          <option value="Cuenta Empresarial">Cuenta Empresarial</option>
        </select>
        <span class="error-message" id="tipoCuenta-error"></span>
      </div>
      
      <div class="input-group">
        <label for="numeroCuenta">Número de cuenta</label>
        <input type="text" id="numeroCuenta" name="numeroCuenta" placeholder="Ej: 1234-5678-9012" required>
        <span class="error-message" id="numeroCuenta-error"></span>
      </div>
      
      <button type="submit">Crear Cuenta</button>
      
      <div id="account-operations" style="display: none;">
        <hr style="margin: 2rem 0;">
        <h3>Operaciones Bancarias</h3>
        
        <div class="input-group">
          <label for="valorRetiro">Cantidad a retirar</label>
          <input type="number" id="valorRetiro" name="valorRetiro" placeholder="Monto a retirar" step="0.01" min="5">
          <span class="error-message" id="valorRetiro-error"></span>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
          <button type="button" id="verificar-deposito">Verificar Depósito Inicial</button>
          <button type="button" id="realizar-retiro">Realizar Retiro</button>
          <button type="button" id="mostrar-datos">Mostrar Datos de Cuenta</button>
        </div>
      </div>
      
      <div id="result-container"></div>
    </form>
  `;

    const form = container.querySelector("#exercise-4-form") as HTMLFormElement;
    const nombreInput = form.querySelector("#nombre") as HTMLInputElement;
    const cantidadInput = form.querySelector("#cantidad") as HTMLInputElement;
    const tipoCuentaSelect = form.querySelector("#tipoCuenta") as HTMLSelectElement;
    const numeroCuentaInput = form.querySelector("#numeroCuenta") as HTMLInputElement;
    const valorRetiroInput = form.querySelector("#valorRetiro") as HTMLInputElement;
    const accountOperationsSection = form.querySelector("#account-operations") as HTMLElement;
    const resultContainer = form.querySelector("#result-container") as HTMLElement;

    let cuenta: Cuenta | null = null;

    // Limpiar errores cuando el usuario escriba
    [nombreInput, cantidadInput, tipoCuentaSelect, numeroCuentaInput, valorRetiroInput].forEach((input) => {
        input.addEventListener("input", () => {
            const errorElement = form.querySelector(`#${input.id}-error`) as HTMLElement;
            if (errorElement) {
                errorElement.textContent = "";
            }
        });
    });

    // Crear cuenta
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = nombreInput.value;
        const cantidad = cantidadInput.value;
        const tipoCuenta = tipoCuentaSelect.value;
        const numeroCuenta = numeroCuentaInput.value;

        // Validaciones
        const nombreError = form.querySelector("#nombre-error") as HTMLElement;
        const cantidadError = form.querySelector("#cantidad-error") as HTMLElement;
        const tipoCuentaError = form.querySelector("#tipoCuenta-error") as HTMLElement;
        const numeroCuentaError = form.querySelector("#numeroCuenta-error") as HTMLElement;

        let isValid = true;

        const validatedNombre = validateText(nombre, nombreError, "nombre");
        if (!validatedNombre) isValid = false;

        const validatedCantidad = validateNumber(cantidad, cantidadError, true, false);
        if (validatedCantidad === null) isValid = false;

        if (!tipoCuenta) {
            tipoCuentaError.textContent = "Debes seleccionar un tipo de cuenta.";
            isValid = false;
        }

        const validatedNumeroCuenta = validateText(numeroCuenta, numeroCuentaError, "número de cuenta");
        if (!validatedNumeroCuenta) isValid = false;

        if (!isValid) return;

        // Crear la instancia de Cuenta
        cuenta = new Cuenta(validatedNombre!, validatedCantidad!, tipoCuenta, validatedNumeroCuenta!);

        // Mostrar sección de operaciones
        accountOperationsSection.style.display = "block";

        // Verificar depósito inicial automáticamente
        const mensajeDeposito = cuenta.depositar();

        const resultHtml = `
      <h3>🏦 Cuenta Creada Exitosamente</h3>
      <div style="margin: 1rem 0;">
        ${cuenta.mostrarDatos()}
      </div>
      <div style="margin-top: 1rem; padding: 1rem; background: rgba(0, 122, 204, 0.1); border-radius: 0.5rem;">
        <strong>Estado del Depósito Inicial:</strong><br>
        ${mensajeDeposito}
      </div>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));
    });

    // Verificar depósito
    form.querySelector("#verificar-deposito")?.addEventListener("click", () => {
        if (!cuenta) return;

        const mensajeDeposito = cuenta.depositar();
        const resultHtml = `
      <h3>💳 Verificación de Depósito</h3>
      <p>${mensajeDeposito}</p>
      <div style="margin-top: 1rem;">
        <strong>Saldo actual:</strong> $${cuenta.getSaldo.toFixed(2)}
      </div>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));
    });

    // Realizar retiro
    form.querySelector("#realizar-retiro")?.addEventListener("click", () => {
        if (!cuenta) return;

        const valorRetiro = valorRetiroInput.value;
        const valorRetiroError = form.querySelector("#valorRetiro-error") as HTMLElement;

        const validatedValor = validateNumber(valorRetiro, valorRetiroError, true, false);
        if (validatedValor === null) return;

        const mensajeRetiro = cuenta.retirar(validatedValor);
        const resultHtml = `
      <h3>💸 Operación de Retiro</h3>
      <p>${mensajeRetiro}</p>
      <div style="margin-top: 1rem;">
        <strong>Saldo actual:</strong> $${cuenta.getSaldo.toFixed(2)}
      </div>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));

        // Limpiar el campo de retiro
        valorRetiroInput.value = "";
    });

    // Mostrar datos de la cuenta
    form.querySelector("#mostrar-datos")?.addEventListener("click", () => {
        if (!cuenta) return;

        const datosCompletos = cuenta.mostrarDatos();
        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(datosCompletos));
    });

    return container;
} 