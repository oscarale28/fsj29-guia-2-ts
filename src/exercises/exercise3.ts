import { validateText, createResult } from "../utils";

/**
 * Clase Canción
 * Ejercicio 3: Crear una clase con atributos privados, getters/setters y métodos
 */
class Cancion {
    private titulo: string;
    private genero: string;
    private autor: string;

    constructor(titulo: string, genero: string) {
        this.titulo = titulo;
        this.genero = genero;
        this.autor = "";
    }

    // Getter para el autor
    get getAutor(): string {
        return this.autor;
    }

    // Setter para el autor
    set setAutor(autor: string) {
        this.autor = autor;
    }

    // Getters adicionales para acceder a título y género
    get getTitulo(): string {
        return this.titulo;
    }

    get getGenero(): string {
        return this.genero;
    }

    /**
     * Método para mostrar todos los datos de la canción
     */
    mostrarDatos(): string {
        return `
      <h3>Información de la Canción</h3>
      <div style="display: grid; gap: 0.5rem; margin: 1rem 0;">
        <div><strong>🎵 Título:</strong> ${this.titulo}</div>
        <div><strong>🎼 Género:</strong> ${this.genero}</div>
        <div><strong>👤 Autor:</strong> ${this.autor || "No especificado"}</div>
      </div>
      <div style="margin-top: 1rem; padding: 1rem; background: rgba(0, 122, 204, 0.1); border-radius: 0.5rem;">
        <em>"${this.titulo}" es una canción de ${this.genero}${this.autor ? ` interpretada por ${this.autor}` : ""}.</em>
      </div>
    `;
    }
}

export default function exercise3(): HTMLElement {
    const container = document.createElement("div");
    container.innerHTML = `
    <form id="exercise-3-form">
      <div class="input-group">
        <label for="titulo">Título de la canción</label>
        <input type="text" id="titulo" name="titulo" placeholder="Ingresa el título de la canción" required>
        <span class="error-message" id="titulo-error"></span>
      </div>
      
      <div class="input-group">
        <label for="genero">Género musical</label>
        <select id="genero" name="genero" required>
          <option value="">Selecciona un género</option>
          <option value="Rock">Rock</option>
          <option value="Pop">Pop</option>
          <option value="Jazz">Jazz</option>
          <option value="Blues">Blues</option>
          <option value="Reggae">Reggae</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Clásica">Clásica</option>
          <option value="Country">Country</option>
          <option value="Reggaeton">Reggaeton</option>
          <option value="Salsa">Salsa</option>
          <option value="Bachata">Bachata</option>
        </select>
        <span class="error-message" id="genero-error"></span>
      </div>
      
      <button type="submit">Crear Canción</button>
      
      <div id="song-created" style="display: none;">
        <hr style="margin: 2rem 0;">
        <h3>Canción Creada - Ahora asigna el autor</h3>
        
        <div class="input-group">
          <label for="autor">Autor/Intérprete</label>
          <input type="text" id="autor" name="autor" placeholder="Ingresa el nombre del autor o intérprete">
          <span class="error-message" id="autor-error"></span>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <button type="button" id="set-autor">Asignar Autor</button>
          <button type="button" id="get-autor">Obtener Autor</button>
          <button type="button" id="mostrar-datos">Mostrar Datos Completos</button>
        </div>
      </div>
      
      <div id="result-container"></div>
    </form>
  `;

    const form = container.querySelector("#exercise-3-form") as HTMLFormElement;
    const tituloInput = form.querySelector("#titulo") as HTMLInputElement;
    const generoSelect = form.querySelector("#genero") as HTMLSelectElement;
    const autorInput = form.querySelector("#autor") as HTMLInputElement;
    const songCreatedSection = form.querySelector("#song-created") as HTMLElement;
    const resultContainer = form.querySelector("#result-container") as HTMLElement;

    let cancion: Cancion | null = null;

    // Limpiar errores cuando el usuario escriba
    [tituloInput, generoSelect, autorInput].forEach((input) => {
        input.addEventListener("input", () => {
            const errorElement = form.querySelector(`#${input.id}-error`) as HTMLElement;
            if (errorElement) {
                errorElement.textContent = "";
            }
        });
    });

    // Crear canción inicial
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const titulo = tituloInput.value;
        const genero = generoSelect.value;

        const tituloError = form.querySelector("#titulo-error") as HTMLElement;
        const generoError = form.querySelector("#genero-error") as HTMLElement;

        let isValid = true;

        const validatedTitulo = validateText(titulo, tituloError, "título");
        if (!validatedTitulo) isValid = false;

        if (!genero) {
            generoError.textContent = "Debes seleccionar un género.";
            isValid = false;
        }

        if (!isValid) return;

        // Crear la instancia de Canción
        cancion = new Cancion(validatedTitulo!, genero);

        // Mostrar sección para asignar autor
        songCreatedSection.style.display = "block";

        // Mostrar resultado inicial
        const resultHtml = `
      <h3>¡Canción Creada Exitosamente!</h3>
      <div style="margin: 1rem 0;">
        <strong>Título:</strong> ${cancion.getTitulo}<br>
        <strong>Género:</strong> ${cancion.getGenero}<br>
        <strong>Autor:</strong> ${cancion.getAutor || "Aún no asignado"}
      </div>
      <p><em>Ahora puedes asignar un autor usando los botones de abajo.</em></p>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));
    });

    // Botón para asignar autor (setter)
    form.querySelector("#set-autor")?.addEventListener("click", () => {
        if (!cancion) return;

        const autor = autorInput.value;
        const autorError = form.querySelector("#autor-error") as HTMLElement;

        const validatedAutor = validateText(autor, autorError, "autor");
        if (!validatedAutor) return;

        cancion.setAutor = validatedAutor;

        const resultHtml = `
      <h3>✅ Autor Asignado Correctamente</h3>
      <p>El autor "<strong>${validatedAutor}</strong>" ha sido asignado a la canción.</p>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));
    });

    // Botón para obtener autor (getter)
    form.querySelector("#get-autor")?.addEventListener("click", () => {
        if (!cancion) return;

        const autor = cancion.getAutor;
        const resultHtml = `
      <h3>📖 Autor Obtenido</h3>
      <p>El autor actual de la canción es: <strong>${autor || "No hay autor asignado"}</strong></p>
    `;

        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(resultHtml));
    });

    // Botón para mostrar todos los datos
    form.querySelector("#mostrar-datos")?.addEventListener("click", () => {
        if (!cancion) return;

        const datosCompletos = cancion.mostrarDatos();
        resultContainer.innerHTML = "";
        resultContainer.appendChild(createResult(datosCompletos));
    });

    return container;
} 