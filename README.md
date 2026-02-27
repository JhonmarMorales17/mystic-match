# MYSTIC MATCH: El Recuerdo de los Elementos / The Memory of the Elements

Version 1.0.0 | HTML5 | CSS3 | JavaScript

---

## Descripción del Proyecto

Mystic Match es un juego de memoria interactivo que desarrollé como proyecto para el curso "Desarrollo de Lenguajes para Clientes Web" del Ing. Victor Kneider.

El juego presenta una tematica mistica y elemental, donde los jugadores deben encontrar pares de elementos de la naturaleza y el cosmos mientras ponen a prueba su memoria y concentracion.

### Tematica Elegida

Decidi crear una tematica basada en elementos místicos y magicos por varias razones:
- **Elementos celestiales**: Luna, Estrellas, Sol, Galaxias
- **Elementos naturales**: Tierra, Agua, Fuego, Viento
- **Elementos cosmicos**: Planetas, Meteoros, Energia
- **Elementos etéreos**: Magia, Naturaleza, Espiritus

**Por que elegi esta tematica?**
- Los simbolos son universalmente reconocibles
- Los colores variados ayudan a la memoria visual
- Crea una atmosfera magica que hace el juego mas atractivo
- Permite una paleta de colores coherente (purpuras, dorados, azules)

---

## Caracteristicas Principales

### Jugabilidad
- **3 niveles de dificultad**:
  - Facil: Tablero 4x4 (16 cartas, 8 pares)
  - Intermedio: Tablero 6x6 (36 cartas, 18 pares)
  - Dificil: Tablero 8x8 (64 cartas, 32 pares)
- **Sistema de puntuacion**: Contador de movimientos
- **Feedback visual**: Animaciones para aciertos y errores
- **Modal de victoria**: Mensaje personalizado con estadisticas

### Diseño Visual
- **Efecto flip 3D** en cartas (transiciones CSS)
- **Animaciones**: Shake en errores, Glow en aciertos
- **Diseño responsivo**: Adaptable a desktop, tablet y movil
- **Paleta de colores**: Purpuras y dorados misticos

### Caracteristicas Tecnicas
- **Sin alert()**: Todo mediante modales y elementos DOM
- **Generacion dinamica**: Tablero creado desde JavaScript
- **Algoritmo de mezcla**: Fisher-Yates para aleatoriedad
- **Bloqueo temporal**: Tras errores para mejor experiencia

---

## Instalacion y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Git (opcional, para clonar)

### Pasos para Instalar

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TU-USUARIO/mystic-match.git