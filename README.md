# Guía de Programación Orientada a Objetos con TypeScript

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web interactiva tipo sandbox educativo desarrollada con **Vite** y **TypeScript vanilla**, diseñada para demostrar y practicar los conceptos fundamentales de la **Programación Orientada a Objetos (POO)**.

La aplicación sigue la misma estructura arquitectónica del proyecto base en JavaScript, pero adaptada completamente para TypeScript con temática visual de TypeScript (colores azules).

## 🎯 Objetivos

- **Evaluar** el conocimiento de la programación orientada a objetos y sus pilares
- **Aplicar** los pilares de la POO utilizando TypeScript:
  - **Encapsulación**: Atributos privados y métodos de acceso
  - **Herencia**: Clases que heredan de otras clases
  - **Abstracción**: Clases abstractas y métodos abstractos
  - **Polimorfismo**: Implementación de métodos abstractos

## 🏗️ Estructura del Proyecto

```
fsj29-guia-2-ts/
├── src/
│   ├── exercises/              # Ejercicios de POO
│   │   ├── exercise1.ts        # Clase CabeceraPagina
│   │   ├── exercise2.ts        # Clase Calculadora
│   │   ├── exercise3.ts        # Clase Canción (getters/setters)
│   │   ├── exercise4.ts        # Clase Cuenta (operaciones bancarias)
│   │   └── exercise5.ts        # Clase abstracta Persona + Empleado
│   ├── main.ts                 # Punto de entrada principal
│   ├── utils.ts                # Funciones utilitarias TypeScript
│   └── style.css               # Estilos con temática TypeScript
├── public/
│   └── typescript.svg          # Logo de TypeScript
├── index.html                  # HTML base
└── package.json                # Configuración del proyecto
```

## 🚀 Ejercicios Implementados

### Ejercicio 1: Clase CabeceraPagina

**Conceptos POO:** Encapsulación básica, métodos públicos

**Características:**

- ✅ Atributos privados: `titulo`, `color`, `fuente`, `alineacion`
- ✅ Método `obtenerPropiedades()`: Configura título, color y fuente
- ✅ Método `establecerAlineacion()`: Define la alineación del título
- ✅ Método `imprimirPropiedades()`: Muestra todas las propiedades con vista previa

**Interfaz:**

- Formulario con selects para color, fuente y alineación
- Vista previa en tiempo real del título configurado

### Ejercicio 2: Clase Calculadora

**Conceptos POO:** Métodos públicos, manejo de errores

**Operaciones implementadas:**

- ✅ `sumar(a, b)`: Suma de dos números
- ✅ `restar(a, b)`: Resta de dos números
- ✅ `multiplicar(a, b)`: Multiplicación de dos números
- ✅ `dividir(a, b)`: División con validación de división por cero
- ✅ `potencia(base, exponente)`: Cálculo de potencias
- ✅ `factorial(n)`: Factorial con validaciones (enteros positivos)

**Interfaz:**

- Dos campos numéricos para operandos
- Botones para cada operación matemática
- Manejo de errores y casos especiales

### Ejercicio 3: Clase Canción

**Conceptos POO:** Atributos privados, constructor, getters/setters

**Características:**

- ✅ Constructor que recibe `titulo` y `genero`
- ✅ Atributo privado `autor` con getter y setter
- ✅ Método `mostrarDatos()`: Presenta información completa
- ✅ Validación de datos y gestión de estados

**Interfaz:**

- Creación de canción con título y género
- Asignación posterior del autor usando setter
- Botones para obtener autor (getter) y mostrar datos completos

### Ejercicio 4: Clase Cuenta

**Conceptos POO:** Encapsulación, validaciones de negocio, getters

**Funcionalidades:**

- ✅ Constructor con `nombre`, `cantidad`, `tipoCuenta`, `numeroCuenta`
- ✅ Método `depositar()`: Valida depósito mínimo de $5.00
- ✅ Método `retirar(valor)`: Validaciones de fondos y mínimo
- ✅ Método `mostrarDatos()`: Información completa de la cuenta
- ✅ Getters para acceso controlado a datos

**Interfaz:**

- Formulario completo para crear cuenta bancaria
- Operaciones de depósito y retiro con validaciones
- Manejo de saldos y estados de cuenta

### Ejercicio 5: Herencia y Abstracción

**Conceptos POO:** Clases abstractas, herencia, métodos abstractos

**Clase abstracta Persona:**

- ✅ Atributos protegidos: `nombre`, `apellido`, `direccion`, `telefono`, `edad`
- ✅ Método `verificarMayoriaEdad()`: Lógica de validación de edad
- ✅ Método abstracto `mostrarDatosPersonales()`: Debe ser implementado

**Clase Empleado (hereda de Persona):**

- ✅ Atributo privado `sueldo`
- ✅ Método `cargarSueldo(sueldo)`: Asigna sueldo al empleado
- ✅ Método `imprimirSueldo()`: Muestra información salarial
- ✅ Implementación de `mostrarDatosPersonales()`: Método abstracto

**Interfaz:**

- Formulario completo para crear empleado
- Gestión de sueldo con validaciones
- Verificación de mayoría de edad
- Visualización completa de datos personales y laborales

## 🛠️ Tecnologías Utilizadas

- **TypeScript**: Lenguaje principal con tipado estático
- **Vite**: Herramienta de construcción y servidor de desarrollo
- **HTML5**: Estructura semántica
- **CSS3**: Estilos con temática TypeScript (colores azules #007acc)
- **JavaScript ES6+**: Módulos, async/await, destructuring

## 🎨 Características de la Interfaz

### Diseño Visual

- **Tema oscuro** con acentos azules de TypeScript (#007acc)
- **Layout responsivo** adaptable a diferentes pantallas
- **Navegación horizontal** con scroll para ejercicios
- **Formularios estilizados** con validación visual en tiempo real

### Experiencia de Usuario

- **Carga dinámica** de ejercicios como módulos independientes
- **Validación en tiempo real** con mensajes de error claros
- **Feedback visual** para estados activos y hover
- **Resultados interactivos** con formato HTML enriquecido

## 🚀 Cómo Ejecutar

### Prerrequisitos

- Node.js (versión 16 o superior)
- pnpm (recomendado) o npm

### Instalación y Ejecución

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Navegar al directorio
cd fsj29-guia-2-ts

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm run dev

# Construir para producción
pnpm run build
```

## 📚 Conceptos de POO Demostrados

### 1. **Encapsulación**

- Atributos privados (`private`) en todas las clases
- Métodos públicos como interfaz de acceso
- Getters y setters para control de acceso

### 2. **Herencia**

- Clase `Empleado` hereda de clase abstracta `Persona`
- Uso de `super()` para llamar al constructor padre
- Acceso a atributos protegidos (`protected`)

### 3. **Abstracción**

- Clase abstracta `Persona` con método abstracto
- Implementación obligatoria en clases hijas
- Separación entre interfaz y implementación

### 4. **Polimorfismo**

- Implementación específica de `mostrarDatosPersonales()` en `Empleado`
- Métodos con diferentes comportamientos según el contexto

## 👨‍💻 Autor

**Oscar Alejandro Orellana Morán**  
Estudiante FSJ29 - KODIGO  
Academia de Tecnología Creativa

## 📄 Licencia

Este proyecto es de uso educativo para la Academia KODIGO.

---

_Proyecto desarrollado como parte de la Actividad 5: Guía de Programación Orientada a Objetos con TypeScript_
