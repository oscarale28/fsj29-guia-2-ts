import { validateText, validateNumber, createResult } from "../utils";

/**
 * Clase abstracta Persona
 * Ejercicio 5: Crear una clase abstracta con herencia
 */
abstract class Persona {
    protected nombre: string;
    protected apellido: string;
    protected direccion: string;
    protected telefono: string;
    protected edad: number;

    constructor(nombre: string, apellido: string, direccion: string, telefono: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.edad = edad;
    }

    /**
     * Método que verifica si es mayor de edad
     */
    verificarMayoriaEdad(): string {
        if (this.edad >= 18) {
            return `✅ ${this.nombre} ${this.apellido} es mayor de edad (${this.edad} años).`;
        } else {
            return `❌ ${this.nombre} ${this.apellido} es menor de edad (${this.edad} años).`;
        }
    }

    /**
     * Método abstracto que debe ser implementado por las clases hijas
     */
    abstract mostrarDatosPersonales(): string;

    // Getters para acceder a los datos protegidos
    get getNombre(): string {
        return this.nombre;
    }

    get getApellido(): string {
        return this.apellido;
    }

    get getDireccion(): string {
        return this.direccion;
    }

    get getTelefono(): string {
        return this.telefono;
    }

    get getEdad(): number {
        return this.edad;
    }
}

/**
 * Clase Empleado que hereda de Persona
 */
class Empleado extends Persona {
    private sueldo: number;

    constructor(nombre: string, apellido: string, direccion: string, telefono: string, edad: number) {
        super(nombre, apellido, direccion, telefono, edad);
        this.sueldo = 0;
    }

    /**
     * Método para cargar el sueldo
     */
    cargarSueldo(sueldo: number): void {
        this.sueldo = sueldo;
    }

    /**
     * Método para imprimir el sueldo
     */
    imprimirSueldo(): string {
        if (this.sueldo <= 0) {
            return "❌ No se ha asignado un sueldo al empleado.";
        }
        return `💰 El sueldo de ${this.nombre} ${this.apellido} es: $${this.sueldo.toFixed(2)}`;
    }

    /**
     * Implementación del método abstracto de la clase padre
     */
    mostrarDatosPersonales(): string {
        return `
      <h3>👤 Datos Personales del Empleado</h3>
      <div style="display: grid; gap: 0.5rem; margin: 1rem 0;">
        <div><strong>📝 Nombre Completo:</strong> ${this.nombre} ${this.apellido}</div>
        <div><strong>🏠 Dirección:</strong> ${this.direccion}</div>
        <div><strong>📞 Teléfono:</strong> ${this.telefono}</div>
        <div><strong>🎂 Edad:</strong> ${this.edad} años</div>
        <div><strong>💼 Sueldo:</strong> ${this.sueldo > 0 ? `$${this.sueldo.toFixed(2)}` : "No asignado"}</div>
      </div>
      <div style="margin-top: 1rem; padding: 1rem; background: rgba(0, 122, 204, 0.1); border-radius: 0.5rem;">
        ${this.verificarMayoriaEdad()}
      </div>
    `;
    }

    // Getter para el sueldo
    get getSueldo(): number {
        return this.sueldo;
    }
}

export default function exercise5(): HTMLElement {
    const container = document.createElement("div");
    container.innerHTML = `
    <form id="exercise-5-form">
      <h3>📋 Crear Empleado</h3>
      
      <div class="input-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ingresa el nombre" required>
        <span class="error-message" id="nombre-error"></span>
      </div>
      
      <div class="input-group">
        <label for="apellido">Apellido</label>
        <input type="text" id="apellido" name="apellido" placeholder="Ingresa el apellido" required>
        <span class="error-message" id="apellido-error"></span>
      </div>
      
      <div class="input-group">
        <label for="direccion">Dirección</label>
        <input type="text" id="direccion" name="direccion" placeholder="Ingresa la dirección completa" required>
        <span class="error-message" id="direccion-error"></span>
      </div>
      
      <div class="input-group">
        <label for="telefono">Teléfono</label>
        <input type="text" id="telefono" name="telefono" placeholder="Ej: +503 1234-5678" required>
        <span class="error-message" id="telefono-error"></span>
      </div>
      
      <div class="input-group">
        <label for="edad">Edad</label>
        <input type="number" id="edad" name="edad" placeholder="Edad en años" min="1" max="120" required>
        <span class="error-message" id="edad-error"></span>
      </div>
      
      <button type="submit">Crear Empleado</button>
      
      <div id="employee-operations" style="display: none;">
        <hr style="margin: 2rem 0;">
        <h3>💼 Gestión de Sueldo</h3>
        
        <div class="input-group">
          <label for="sueldo">Sueldo mensual</label>
          <input type="number" id="sueldo" name="sueldo" placeholder="Ingresa el sueldo" step="0.01" min="0">
          <span class="error-message" id="sueldo-error"></span>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
          <button type="button" id="cargar-sueldo">Asignar Sueldo</button>
          <button type="button" id="imprimir-sueldo">Mostrar Sueldo</button>
          <button type="button" id="verificar-edad">Verificar Mayoría de Edad</button>
          <button type="button" id="mostrar-datos">Mostrar Datos Completos</button>
        </div>
      </div>
      
      <div id="result-container"></div>
    </form>
  `;

    const form = container.querySelector("#exercise-5-form") as HTMLFormElement;
    const nombreInput = form.querySelector("#nombre") as HTMLInputElement;
    const apellidoInput = form.querySelector("#apellido") as HTMLInputElement;
    const direccionInput = form.querySelector("#direccion") as HTMLInputElement;
    const telefonoInput = form.querySelector("#telefono") as HTMLInputElement;
    const edadInput = form.querySelector("#edad") as HTMLInputElement;
    const sueldoInput = form.querySelector("#sueldo") as HTMLInputElement;
    const employeeOperationsSection = form.querySelector("#employee-operations") as HTMLElement;
    const resultContainer = form.querySelector("#result-container") as HTMLElement;

    let empleado: Empleado | null = null;

    // Limpiar errores cuando el usuario escriba
    [nombreInput, apellidoInput, direccionInput, telefonoInput, edadInput, sueldoInput].forEach((input) => {
        input.addEventListener("input", () => {
            const errorElement = form.querySelector(`#${input.id}-error`) as HTMLElement;
            if (errorElement) {
                errorElement.textContent = "";
            }
        });
    });

    // Crear empleado
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;
        const direccion = direccionInput.value;
        const telefono = telefonoInput.value;
        const edad = edadInput.value;

        // Validaciones
        const nombreError = form.querySelector("#nombre-error") as HTMLElement;
        const apellidoError = form.querySelector("#apellido-error") as HTMLElement;
        const direccionError = form.querySelector("#direccion-error") as HTMLElement;
        const telefonoError = form.querySelector("#telefono-error") as HTMLElement;
        const edadError = form.querySelector("#edad-error") as HTMLElement;

        let isValid = true;

        const validatedNombre = validateText(nombre, nombreError, "nombre");
        if (!validatedNombre) isValid = false;

        const validatedApellido = validateText(apellido, apellidoError, "apellido");
        if (!validatedApellido) isValid = false;

        const validatedDireccion = validateText(direccion, direccionError, "dirección");
        if (!validatedDireccion) isValid = false;

        const validatedTelefono = validateText(telefono, telefonoError, "teléfono");
        if (!validatedTelefono) isValid = false;

        const validatedEdad = validateNumber(edad, edadError, false, false);
        if (validatedEdad === null) isValid = false;

        if (!isValid) return;

        // Crear la instancia de Empleado (que hereda de Persona)
        empleado = new Empleado(
            validatedNombre!,
            validatedApellido!,
            validatedDireccion!,
            validatedTelefono!,
            validatedEdad!
        );

        // Mostrar sección de operaciones
        employeeOperationsSection.style.display = "block";

        const resultHtml = `
      <h3>✅ Empleado Creado Exitosamente</h3>
      <div style="margin: 1rem 0;">
        <strong>Empleado:</strong> ${empleado.getNombre} ${empleado.getApellido}<br>
        <strong>Edad:</strong> ${empleado.getEdad} años<br>
        <strong>Dirección:</strong> ${empleado.getDireccion}<br>
        <strong>Teléfono:</strong> ${empleado.getTelefono}
      </div>
      <div style="margin-top: 1rem; padding: 1rem; background: rgba(0, 122, 204, 0.1); border-radius: 0.5rem;">
        ${empleado.verificarMayoriaEdad()}
      </div>
      <p><em>Ahora puedes gestionar el sueldo y ver los datos completos usando los botones de abajo.</em></p>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));
    });

    // Cargar sueldo
    form.querySelector("#cargar-sueldo")?.addEventListener("click", () => {
        if (!empleado) return;

        const sueldo = sueldoInput.value;
        const sueldoError = form.querySelector("#sueldo-error") as HTMLElement;

        const validatedSueldo = validateNumber(sueldo, sueldoError, true, false);
        if (validatedSueldo === null) return;

        empleado.cargarSueldo(validatedSueldo);

        const resultHtml = `
      <h3>💰 Sueldo Asignado Correctamente</h3>
      <p>Se ha asignado un sueldo de <strong>$${validatedSueldo.toFixed(2)}</strong> a ${empleado.getNombre} ${empleado.getApellido}.</p>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));

        // Limpiar el campo de sueldo
        sueldoInput.value = "";
    });

    // Imprimir sueldo
    form.querySelector("#imprimir-sueldo")?.addEventListener("click", () => {
        if (!empleado) return;

        const mensajeSueldo = empleado.imprimirSueldo();
        const resultHtml = `
      <h3>💼 Información de Sueldo</h3>
      <p>${mensajeSueldo}</p>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));
    });

    // Verificar mayoría de edad
    form.querySelector("#verificar-edad")?.addEventListener("click", () => {
        if (!empleado) return;

        const mensajeEdad = empleado.verificarMayoriaEdad();
        const resultHtml = `
      <h3>🎂 Verificación de Edad</h3>
      <p>${mensajeEdad}</p>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));
    });

    // Mostrar datos completos (método abstracto implementado)
    form.querySelector("#mostrar-datos")?.addEventListener("click", () => {
        if (!empleado) return;

        const datosCompletos = empleado.mostrarDatosPersonales();
        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(datosCompletos));
    });

    return container;
} 