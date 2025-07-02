import { validateText, createResult } from "../utils";

/**
 * Clase CabeceraPagina
 * Ejercicio 1: Crear una clase que maneje las propiedades de una cabecera de página
 */
class CabeceraPagina {
  private titulo: string;
  private color: string;
  private fuente: string;
  private alineacion: string;

  constructor() {
    this.titulo = "";
    this.color = "";
    this.fuente = "";
    this.alineacion = "";
  }

  /**
   * Primer método: Obtiene el título, color y fuente de la página
   */
  obtenerPropiedades(titulo: string, color: string, fuente: string): void {
    this.titulo = titulo;
    this.color = color;
    this.fuente = fuente;
  }

  /**
   * Segundo método: Establece la alineación del título
   */
  establecerAlineacion(alineacion: string): void {
    this.alineacion = alineacion;
  }

  /**
   * Tercer método: Imprime todas las propiedades
   */
  imprimirPropiedades(): string {
    return `
      <h3>Propiedades de la Cabecera:</h3>
      <ul>
        <li><strong>Título:</strong> ${this.titulo}</li>
        <li><strong>Color:</strong> ${this.color}</li>
        <li><strong>Fuente:</strong> ${this.fuente}</li>
        <li><strong>Alineación:</strong> ${this.alineacion}</li>
      </ul>
      <div style="
        margin-top: 1rem;
        padding: 1rem;
        border: 2px solid #007acc;
        border-radius: 0.5rem;
      ">
        <h2 style="color: ${this.color}; font-family: ${this.fuente}; text-align: ${this.alineacion};">${this.titulo}</h2>
      </div>
    `;
  }
}

export default function exercise1(): HTMLElement {
  const form = document.createElement("form");
  form.id = "exercise-1-form";
  form.innerHTML = `
    <div class="input-group">
      <label for="titulo">Título de la página</label>
      <input type="text" id="titulo" name="titulo" placeholder="Ingresa el título" required>
      <span class="error-message" id="titulo-error"></span>
    </div>
    
    <div class="input-group">
      <label for="color">Color del título</label>
      <select id="color" name="color" required>
        <option value="">Selecciona un color</option>
        <option value="#007acc">Azul TypeScript</option>
        <option value="#ff6b6b">Rojo</option>
        <option value="#4ecdc4">Verde Agua</option>
        <option value="#45b7d1">Azul Cielo</option>
        <option value="#96ceb4">Verde</option>
        <option value="#ffeaa7">Amarillo</option>
        <option value="#dda0dd">Violeta</option>
      </select>
      <span class="error-message" id="color-error"></span>
    </div>
    
    <div class="input-group">
      <label for="fuente">Fuente del título</label>
      <select id="fuente" name="fuente" required>
        <option value="">Selecciona una fuente</option>
        <option value="Arial, sans-serif">Arial</option>
        <option value="Georgia, serif">Georgia</option>
        <option value="'Times New Roman', serif">Times New Roman</option>
        <option value="'Courier New', monospace">Courier New</option>
        <option value="Verdana, sans-serif">Verdana</option>
        <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
        <option value="Impact, sans-serif">Impact</option>
      </select>
      <span class="error-message" id="fuente-error"></span>
    </div>
    
    <div class="input-group">
      <label for="alineacion">Alineación del título</label>
      <select id="alineacion" name="alineacion" required>
        <option value="">Selecciona la alineación</option>
        <option value="left">Izquierda</option>
        <option value="center">Centrado</option>
        <option value="right">Derecha</option>
      </select>
      <span class="error-message" id="alineacion-error"></span>
    </div>
    
    <button type="submit">Crear Cabecera</button>
    <div id="result-container"></div>
  `;

  const resultContainer = form.querySelector("#result-container") as HTMLElement;

  // Limpiar errores cuando el usuario escriba
  const inputs = form.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const errorElement = form.querySelector(`#${input.id}-error`) as HTMLElement;
      if (errorElement) {
        errorElement.textContent = "";
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const titulo = formData.get("titulo") as string;
    const color = formData.get("color") as string;
    const fuente = formData.get("fuente") as string;
    const alineacion = formData.get("alineacion") as string;

    // Validaciones
    const tituloError = form.querySelector("#titulo-error") as HTMLElement;
    const colorError = form.querySelector("#color-error") as HTMLElement;
    const fuenteError = form.querySelector("#fuente-error") as HTMLElement;
    const alineacionError = form.querySelector("#alineacion-error") as HTMLElement;

    let isValid = true;

    const validatedTitulo = validateText(titulo, tituloError, "título");
    if (!validatedTitulo) isValid = false;

    if (!color) {
      colorError.textContent = "Debes seleccionar un color.";
      isValid = false;
    }

    if (!fuente) {
      fuenteError.textContent = "Debes seleccionar una fuente.";
      isValid = false;
    }

    if (!alineacion) {
      alineacionError.textContent = "Debes seleccionar una alineación.";
      isValid = false;
    }

    if (!isValid) return;

    // Crear instancia de la clase y usar sus métodos
    const cabecera = new CabeceraPagina();
    cabecera.obtenerPropiedades(validatedTitulo!, color, fuente);
    cabecera.establecerAlineacion(alineacion);

    const resultado = cabecera.imprimirPropiedades();
    resultContainer.innerHTML = "";
    resultContainer.appendChild(createResult(resultado));
  });

  return form;
} 