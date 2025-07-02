/**
 * Función para validar números ingresados por el usuario
 * @param inputValue La cadena de números ingresados por el usuario
 * @param errorHelper Elemento donde se mostrará el mensaje de error
 * @param allowDecimals Indica si se permiten números decimales
 * @param allowNegatives Indica si se permiten números negativos
 * @returns El número validado o null si hay error
 */
export function validateNumber(
    inputValue: string,
    errorHelper: HTMLElement,
    allowDecimals: boolean = true,
    allowNegatives: boolean = true
): number | null {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
        errorHelper.textContent = "Este campo es requerido.";
        return null;
    }

    const number = Number(trimmedValue);

    if (isNaN(number)) {
        errorHelper.textContent = `"${trimmedValue}" no es un número válido.`;
        return null;
    }

    if (!allowDecimals && !Number.isInteger(number)) {
        errorHelper.textContent = `"${trimmedValue}" debe ser un número entero.`;
        return null;
    }

    if (!allowNegatives && number < 0) {
        errorHelper.textContent = `"${trimmedValue}" debe ser un número positivo.`;
        return null;
    }

    errorHelper.textContent = "";
    return number;
}

/**
 * Función para validar texto no vacío
 * @param inputValue El texto ingresado
 * @param errorHelper Elemento para mostrar errores
 * @param fieldName Nombre del campo para el mensaje de error
 * @returns El texto validado o null si hay error
 */
export function validateText(
    inputValue: string,
    errorHelper: HTMLElement,
    fieldName: string = "campo"
): string | null {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
        errorHelper.textContent = `El ${fieldName} es requerido.`;
        return null;
    }

    errorHelper.textContent = "";
    return trimmedValue;
}

/**
 * Función para limpiar todos los mensajes de error en un formulario
 * @param form El formulario a limpiar
 */
export function clearErrors(form: HTMLFormElement): void {
    const errorElements = form.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
        element.textContent = "";
    });
}

/**
 * Función para crear un elemento de resultado
 * @param content El contenido HTML del resultado
 * @returns El elemento div con el resultado
 */
export function createResult(content: string): HTMLDivElement {
    const resultDiv = document.createElement("div");
    resultDiv.className = "result";
    resultDiv.innerHTML = content;
    return resultDiv;
} 