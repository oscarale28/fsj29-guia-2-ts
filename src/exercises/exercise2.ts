import { validateNumber, createResult } from "../utils";

/**
 * Clase Calculadora
 * Ejercicio 2: Crear una calculadora con operaciones básicas y avanzadas
 */
class Calculadora {

    /**
     * Método para sumar dos números
     */
    sumar(a: number, b: number): number {
        return a + b;
    }

    /**
     * Método para restar dos números
     */
    restar(a: number, b: number): number {
        return a - b;
    }

    /**
     * Método para multiplicar dos números
     */
    multiplicar(a: number, b: number): number {
        return a * b;
    }

    /**
     * Método para dividir dos números
     */
    dividir(a: number, b: number): number | string {
        if (b === 0) {
            return "Error: No se puede dividir entre cero";
        }
        return a / b;
    }

    /**
     * Método para calcular la potencia
     */
    potencia(base: number, exponente: number): number {
        return Math.pow(base, exponente);
    }

    /**
     * Método para calcular el factorial
     */
    factorial(n: number): number | string {
        if (n < 0) {
            return "Error: El factorial no está definido para números negativos";
        }
        if (!Number.isInteger(n)) {
            return "Error: El factorial solo está definido para números enteros";
        }
        if (n === 0 || n === 1) {
            return 1;
        }

        let resultado = 1;
        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    }
}

export default function exercise2(): HTMLElement {
    const container = document.createElement("div");
    container.innerHTML = `
    <form id="exercise-2-form">
      <div class="input-group">
        <label for="numero1">Primer número</label>
        <input type="number" id="numero1" name="numero1" placeholder="Ingresa el primer número" step="any" required>
        <span class="error-message" id="numero1-error"></span>
      </div>
      
      <div class="input-group">
        <label for="numero2">Segundo número</label>
        <input type="number" id="numero2" name="numero2" placeholder="Ingresa el segundo número" step="any" required>
        <span class="error-message" id="numero2-error"></span>
      </div>
      
      <div class="calculator-buttons">
        <button type="button" data-operation="sumar">Sumar (+)</button>
        <button type="button" data-operation="restar">Restar (-)</button>
        <button type="button" data-operation="multiplicar">Multiplicar (×)</button>
        <button type="button" data-operation="dividir">Dividir (÷)</button>
        <button type="button" data-operation="potencia">Potencia (^)</button>
        <button type="button" data-operation="factorial">Factorial (!)</button>
      </div>
      
      <div id="result-container"></div>
    </form>
  `;

    const form = container.querySelector("#exercise-2-form") as HTMLFormElement;
    const numero1Input = form.querySelector("#numero1") as HTMLInputElement;
    const numero2Input = form.querySelector("#numero2") as HTMLInputElement;
    const resultContainer = form.querySelector("#result-container") as HTMLElement;
    const calculadora = new Calculadora();

    // Limpiar errores cuando el usuario escriba
    [numero1Input, numero2Input].forEach((input) => {
        input.addEventListener("input", () => {
            const errorElement = form.querySelector(`#${input.id}-error`) as HTMLElement;
            if (errorElement) {
                errorElement.textContent = "";
            }
            resultContainer.innerHTML = "";
        });
    });

    // Event listeners para los botones de operación
    const operationButtons = form.querySelectorAll("[data-operation]");
    operationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const operation = (button as HTMLElement).dataset.operation!;
            realizarOperacion(operation);
        });
    });

    function realizarOperacion(operation: string): void {
        const numero1Error = form.querySelector("#numero1-error") as HTMLElement;
        const numero2Error = form.querySelector("#numero2-error") as HTMLElement;

        // Validar primer número
        const num1 = validateNumber(numero1Input.value, numero1Error);
        if (num1 === null) return;

        let resultado: number | string;
        let operacionTexto: string;

        // Para factorial solo necesitamos el primer número
        if (operation === "factorial") {
            resultado = calculadora.factorial(num1);
            operacionTexto = `${num1}!`;
        } else {
            // Para otras operaciones necesitamos el segundo número
            const num2 = validateNumber(numero2Input.value, numero2Error);
            if (num2 === null) return;

            switch (operation) {
                case "sumar":
                    resultado = calculadora.sumar(num1, num2);
                    operacionTexto = `${num1} + ${num2}`;
                    break;
                case "restar":
                    resultado = calculadora.restar(num1, num2);
                    operacionTexto = `${num1} - ${num2}`;
                    break;
                case "multiplicar":
                    resultado = calculadora.multiplicar(num1, num2);
                    operacionTexto = `${num1} × ${num2}`;
                    break;
                case "dividir":
                    resultado = calculadora.dividir(num1, num2);
                    operacionTexto = `${num1} ÷ ${num2}`;
                    break;
                case "potencia":
                    resultado = calculadora.potencia(num1, num2);
                    operacionTexto = `${num1}^${num2}`;
                    break;
                default:
                    return;
            }
        }

        // Mostrar resultado
        const isError = typeof resultado === "string" && resultado.startsWith("Error:");
        const resultadoFormateado = typeof resultado === "number" && !Number.isInteger(resultado)
            ? parseFloat(resultado.toFixed(6))
            : resultado;

        const resultHtml = `
      <h3>Resultado de la Operación</h3>
      <div style="font-size: 1.2rem; margin: 1rem 0;">
        <strong>${operacionTexto} = ${resultadoFormateado}</strong>
      </div>
      ${isError ? '<p style="color: #f85149; font-weight: bold;">⚠️ ' + resultado + '</p>' : ''}
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));
    }

    return container;
} 