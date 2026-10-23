# 📊 Centro de Contacto · Reporte Estadístico Interactivo

**Coordinación de Inteligencia de Negocios · Mercadeo Hogares (GGMM)**  
**Período:** Septiembre 2026 | **Fuente de Datos:** Servicio al Cliente (Tipificaciones 0800AbaUltra)

---

## 🚀 Descripción del Proyecto

Aplicación web responsive e informe interactivo desarrollado con estética **Cyberpunk Neón Dark Glassmorphism**, diseñado para analizar el rendimiento operativo, distribución de solicitudes, capacidad del talento humano y hallazgos críticos del Centro de Contacto.

---

## 🎨 Características de Diseño y Estética

- **Paleta Cyberpunk Neón**:
  - **Fondo Oscuro:** `#020b1f` con iluminación ambiental y gradientes sutiles.
  - **Fucsia Neón (`#FF00A8`):** Alertas, picos de demanda y grupos de alta carga.
  - **Cyan Neón (`#66FFFF`):** Datos principales, tecnología de fibra óptica y bordes luminosos.
  - **Dorado Neón (`#FFED00`):** Indicadores FCR, hitos de efectividad y oportunidades de optimización.
- **Efectos Glassmorphism**: Paneles translúcidos con `backdrop-filter: blur(16px)` y resplandores neón interactivos.
- **Tipografía Unificada**: Familia **Montserrat** (Google Fonts).
- **Menú de Navegación en 2 Filas (6 Secciones por Fila)**: Cuadrícula simétrica sin barra de desplazamiento que permite acceso instantáneo a las 12 secciones del informe.
- **Posicionamiento Automático Superior**: Desplazamiento automático al inicio al cargar la página y al alternar entre secciones.

---

## 📑 Estructura de las 12 Secciones

1. **Resumen General**: Visión consolidada (1,826 casos, 22 días hábiles, 83.0 casos/día prom., FCR 78.0%).
2. **Volumen de Casos por Segmento**: Concentración del 98.7% Residencial (1,803 casos) con gráfico interactivo tipo Donut.
3. **Top 5 de Productos con Mayor Demanda**: Liderazgo de ABA ULTRA (77.3% / 1,411 casos) frente a Cobre Tradicional (22.3% / 408 casos).
4. **Distribución por Tipo de Solicitud**: 66.5% Información y 24.2% Compras y Solicitudes.
5. **Análisis de Averías y Fallas más Frecuentes**: 82.3% en "Otro Requerimiento" y baja incidencia de fallas físicas (LOS ROJO 2.3% vs PON FIJO 1.9%).
6. **Análisis Detallado de "OTRO REQUERIMIENTO" (1,503 casos)**: Detalle de Factura (274 mes), Consultas/Llamadas Caídas (219 mes), Cambio de Plan (214 mes), etc.
7. **Análisis de Comportamiento del Servicio por Día**:
   - *Por Día de la Semana:* Concentración pico Lunes (96.8 casos/día) y Martes (87.4 casos/día).
   - *Por Semana:* Semana 3 pico máximo (+16.1% / 482 casos) y días pico (28-sep y 14-sep).
8. **Ranking de Efectividad y Volumen de Ejecutivos**:
   - Matriz cuadrante interactiva (Scatter Plot) de los 19 ejecutivos en Volumen vs Efectividad FCR.
   - Búsqueda en vivo por nombre, filtro por grupo de carga y ordenamiento dinámico.
9. **Estado Final de los Casos**: 78.0% Resuelto en 1er nivel, 12.0% Llamadas caídas, 8.6% SACAS y 1.4% Escalado.
10. **Hallazgos Críticos**: Pestañas interactivas de diagnóstico sobre desvío de demanda, fallas de fibra, auditoría de llamadas caídas, capacidad ociosa (-83% en baja carga) y brecha de FCR (16.5 p.p.).
11. **Conclusiones y Recomendaciones Operativas**: Matriz de prioridades 1 a 5 y esquema de dotación recomendada por día.
12. **Datos Clave del Período**: Tablero de 20 KPIs consolidados con sugerencias técnicas de captura de datos en Excel/SACAS.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico**: Estructura limpia y accesible.
- **CSS3 Moderno**: CSS Grid, Flexbox, variables CSS, Glassmorphism, animaciones y diseño responsive.
- **JavaScript (ES6+)**: Lógica reactiva de pestañas, ordenamiento, filtrado y renderizado dinámico.
- **Chart.js v4**: Gráficos interactivos con gradientes personalizados y temas neón.
- **Google Fonts**: Tipografía Montserrat.

---

## 📂 Estructura del Repositorio

```text
reporte-centro-contacto/
├── index.html          # Interfaz principal de la aplicación
├── README.md           # Documentación del proyecto
├── assets/
│   └── ipulso_logo.png # Logotipo oficial iPulso
├── css/
│   └── styles.css      # Sistema de diseño Cyberpunk Glassmorphism
└── js/
    ├── app.js          # Control de navegación, tablas y eventos
    ├── charts.js       # Gráficos Chart.js configurados
    └── data.js         # Dataset oficial estructurado del período
```

---

## 💻 Instalación y Uso Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/sitecanva/reporte-centro-contacto0800.git
   ```
2. Accede a la carpeta del proyecto:
   ```bash
   cd reporte-centro-contacto0800
   ```
3. Abre el archivo `index.html` en tu navegador web preferido (o utiliza la extensión Live Server en VS Code).

---

## 🔗 Documentación y Referencia Oficial

- 📖 **Documentación Completa y Galería Visual:** [DOCUMENTACION_Y_GALERIA.md](DOCUMENTACION_Y_GALERIA.md)
- 🖨️ **Presentación en Canva (Botón Exportar):** [Presentación en Canva](https://canva.link/vjscbjd41ubd24b)
- 📄 **Documento de Trabajo de Referencia:** [Informe Operativo en Google Docs](https://docs.google.com/document/d/1x3r3bTbMh5RCe4ckTuUSEXqVJm4i6YnuiOlVqdtpgj0/edit?usp=sharing)
