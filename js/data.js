/**
 * Datos oficiales del Informe Operativo - Centro de Contacto
 * Período: Septiembre 2026 | Fuente: Servicio al Cliente (Tipificaciones 0800AbaUltra)
 */

const REPORT_DATA = {
    metadata: {
        title: "Centro de Contacto",
        subtitle: "Coord. Inteligencia de Negocios · Mercadeo Hogares (GGMM)",
        periodo: "Septiembre 2026",
        totalCasos: 1826,
        diasHabiles: 22,
        promedioDiario: 83.0,
        fcrGlobal: 78.0,
        totalEjecutivos: 19,
        fuente: "Servicio al Cliente (Tipificaciones 0800AbaUltra septiembre)"
    },

    segmentos: [
        { nombre: "RESIDENCIAL", casos: 1803, porcentaje: 98.7, color: "#FF00A8" },
        { nombre: "OTROS", casos: 18, porcentaje: 1.0, color: "#66FFFF" },
        { nombre: "JURÍDICO", casos: 5, porcentaje: 0.3, color: "#FFED00" },
        { nombre: "PUBLICA", casos: 0, porcentaje: 0.0, color: "#546e7a" }
    ],

    topProductos: [
        { producto: "ABA ULTRA", casos: 1411, porcentaje: 77.3, color: "#66FFFF" },
        { producto: "ABA / VOZ (TRADICIONAL)", casos: 408, porcentaje: 22.3, color: "#FF00A8" },
        { producto: "NO CLIENTE", casos: 5, porcentaje: 0.3, color: "#FFED00" },
        { producto: "TDH", casos: 2, porcentaje: 0.1, color: "#a855f7" },
        { producto: "LLAMADA CAIDA", casos: 0, porcentaje: 0.0, color: "#475569" }
    ],

    tiposSolicitud: [
        { tipo: "INFORMACIÓN", casos: 1215, porcentaje: 66.5, color: "#66FFFF" },
        { tipo: "COMPRAS Y SOLICITUDES", casos: 442, porcentaje: 24.2, color: "#FF00A8" },
        { tipo: "FALLAS O AVERIAS", casos: 137, porcentaje: 7.5, color: "#FFED00" },
        { tipo: "RECLAMOS", casos: 32, porcentaje: 1.8, color: "#ff4444" }
    ],

    averiasFallas: [
        { nombre: "OTRO REQUERIMIENTO", casos: 1503, porcentaje: 82.3, esOtroReq: true },
        { nombre: "ABA TV GO", casos: 110, porcentaje: 6.0, esOtroReq: false },
        { nombre: "ABA / TELEFONO (TRADICIONAL)", casos: 93, porcentaje: 5.1, esOtroReq: false },
        { nombre: "ABA ULTRA LOS ROJO", casos: 42, porcentaje: 2.3, esOtroReq: false },
        { nombre: "ABA ULTRA PON FIJO", casos: 34, porcentaje: 1.9, esOtroReq: false },
        { nombre: "TELEFONÍA IP", casos: 30, porcentaje: 1.6, esOtroReq: false },
        { nombre: "ABA ULTRA NAVEGA LENTO / INTERMITENCIA", casos: 7, porcentaje: 0.4, esOtroReq: false },
        { nombre: "ABA ULTRA PON INTERMITENTE", casos: 6, porcentaje: 0.3, esOtroReq: false },
        { nombre: "TDH", casos: 1, porcentaje: 0.1, esOtroReq: false }
    ],

    otroRequerimiento: {
        total: 1503,
        subcategorias: [
            { nombre: "DETALLE DE FACTURA", casos: 250, pctOtro: 16.6, casosTotalesMes: 274, pctMes: 15.0 },
            { nombre: "CONSULTAS/LLAMADA CAIDA", casos: 186, pctOtro: 12.4, casosTotalesMes: 219, pctMes: 12.0 },
            { nombre: "PLAN DE SERVICIO/CAMBIO DE PLAN", casos: 181, pctOtro: 12.0, casosTotalesMes: 214, pctMes: 11.7 },
            { nombre: "ACTUALIZACION DE DATOS", casos: 143, pctOtro: 9.5, casosTotalesMes: 145, pctMes: 7.9 },
            { nombre: "ID DE PAGO/FECHA DE FACTURACION", casos: 119, pctOtro: 7.9, casosTotalesMes: 119, pctMes: 6.5 },
            { nombre: "RETIRO DE SERVICIO", casos: 103, pctOtro: 6.9, casosTotalesMes: 103, pctMes: 5.6 },
            { nombre: "MEDIOS DE PAGO/SALDO/SERVICIO CORTADO POR DEUDA", casos: 93, pctOtro: 6.2, casosTotalesMes: 97, pctMes: 5.3 },
            { nombre: "ESTATUS DE REPORTES", casos: 91, pctOtro: 6.1, casosTotalesMes: 135, pctMes: 7.4 },
            { nombre: "ACTIVACIÓN DE SERVICIO/RE-APROVISIONAMIENTO", casos: 77, pctOtro: 5.1, casosTotalesMes: 114, pctMes: 6.2 },
            { nombre: "Resto (18 categorías)", casos: 260, pctOtro: 17.3, casosTotalesMes: 326, pctMes: 17.9 }
        ]
    },

    comportamientoDia: [
        { dia: "Lunes", casos: 387, promedio: 96.8, dias: 4, rank: "1°", desv: "+16.6%" },
        { dia: "Martes", casos: 437, promedio: 87.4, dias: 5, rank: "2°", desv: "+5.3%" },
        { dia: "Miércoles", casos: 402, promedio: 80.4, dias: 5, rank: "3°", desv: "-3.1%" },
        { dia: "Viernes", casos: 307, promedio: 76.8, dias: 4, rank: "4°", desv: "-7.5%" },
        { dia: "Jueves", casos: 293, promedio: 73.3, dias: 4, rank: "5°", desv: "-11.7%" }
    ],

    comportamientoSemana: [
        { semana: "Semana 1", fechas: "01-sep al 04-sep", casos: 313, promedio: 78.3, obs: "Semana parcial (4 días)" },
        { semana: "Semana 2", fechas: "07-sep al 11-sep", casos: 375, promedio: 75.0, obs: "Semana baja" },
        { semana: "Semana 3", fechas: "14-sep al 18-sep", casos: 482, promedio: 96.4, obs: "PICO MÁXIMO (+16.1%)" },
        { semana: "Semana 4", fechas: "21-sep al 25-sep", casos: 372, promedio: 74.4, obs: "Semana baja" },
        { semana: "Semana 5", fechas: "28-sep al 30-sep", casos: 284, promedio: 94.7, obs: "Semana parcial alta (3 días)" }
    ],

    ejecutivos: [
        { id: 1, nombre: "Ana Gamboa", casos: 5, resueltos: 5, noResueltos: 0, fcr: 100.0, grupo: "Baja carga" },
        { id: 2, nombre: "Winifer Ledezma", casos: 1, resueltos: 1, noResueltos: 0, fcr: 100.0, grupo: "Baja carga" },
        { id: 3, nombre: "Madyuri Montilla", casos: 78, resueltos: 76, noResueltos: 2, fcr: 97.44, grupo: "Carga media" },
        { id: 4, nombre: "Armando Sánchez", casos: 184, resueltos: 163, noResueltos: 21, fcr: 88.59, grupo: "Alta carga" },
        { id: 5, nombre: "Marlene Briceño", casos: 81, resueltos: 71, noResueltos: 10, fcr: 87.65, grupo: "Carga media" },
        { id: 6, nombre: "Ligia Ramirez", casos: 310, resueltos: 269, noResueltos: 41, fcr: 86.77, grupo: "Alta carga" },
        { id: 7, nombre: "Meivys Romero", casos: 30, resueltos: 26, noResueltos: 4, fcr: 86.67, grupo: "Baja carga" },
        { id: 8, nombre: "Abel Frias", casos: 14, resueltos: 12, noResueltos: 2, fcr: 85.71, grupo: "Baja carga" },
        { id: 9, nombre: "Naireth Marchena", casos: 52, resueltos: 44, noResueltos: 8, fcr: 84.62, grupo: "Carga media" },
        { id: 10, nombre: "Jordan Melero", casos: 161, resueltos: 136, noResueltos: 25, fcr: 84.47, grupo: "Alta carga" },
        { id: 11, nombre: "Dybrams Constati", casos: 16, resueltos: 13, noResueltos: 3, fcr: 81.25, grupo: "Baja carga" },
        { id: 12, nombre: "Andres Matheus", casos: 95, resueltos: 73, noResueltos: 22, fcr: 76.84, grupo: "Carga media" },
        { id: 13, nombre: "Monica Sequera", casos: 190, resueltos: 138, noResueltos: 52, fcr: 72.63, grupo: "Alta carga" },
        { id: 14, nombre: "Pedro Marquez", casos: 218, resueltos: 158, noResueltos: 60, fcr: 72.48, grupo: "Alta carga" },
        { id: 15, nombre: "Machado Karla", casos: 172, resueltos: 119, noResueltos: 53, fcr: 69.19, grupo: "Alta carga" },
        { id: 16, nombre: "Yoscreitly Miranda", casos: 157, resueltos: 89, noResueltos: 68, fcr: 56.69, grupo: "Alta carga" },
        { id: 17, nombre: "Ibrahim Rondon", casos: 31, resueltos: 16, noResueltos: 15, fcr: 51.61, grupo: "Baja carga" },
        { id: 18, nombre: "Deivimar Blanco", casos: 30, resueltos: 15, noResueltos: 15, fcr: 50.00, grupo: "Baja carga" },
        { id: 19, nombre: "Carmen Guido", casos: 1, resueltos: 0, noResueltos: 1, fcr: 0.0, grupo: "Baja carga" }
    ],

    estadosFinales: [
        { estado: "RESUELTO (Gestión efectiva en 1er Nivel)", casos: 1424, porcentaje: 78.0, color: "#66FFFF" },
        { estado: "LLAMADA CAÍDA / INTERRUMPIDA (Sin resolución)", casos: 219, porcentaje: 12.0, color: "#FF00A8" },
        { estado: "PENDIENTE / INCIDENTE EN SACAS", casos: 157, porcentaje: 8.6, color: "#FFED00" },
        { estado: "ESCALADO / 2NDO NIVEL", casos: 26, porcentaje: 1.4, color: "#a855f7" }
    ],

    capacidadTalento: {
        totalEjecutivos: 19,
        totalCasos: 1826,
        promedioIdeal: 96.1,
        grupos: [
            {
                tipo: "Alta carga",
                cantidad: 7,
                ejecutivos: "Ligia Ramirez, Pedro Marquez, Monica Sequera, Armando Sánchez, Machado Karla, Jordan Melero, Yoscreitly Miranda",
                casos: 1392,
                pctCasos: 76.2,
                promedio: 198.9,
                desviacion: "+107%",
                color: "#FF00A8"
            },
            {
                tipo: "Carga media",
                cantidad: 4,
                ejecutivos: "Andres Matheus, Marlene Briceño, Madyuri Montilla, Naireth Marchena",
                casos: 306,
                pctCasos: 16.8,
                promedio: 76.5,
                desviacion: "-20%",
                color: "#66FFFF"
            },
            {
                tipo: "Baja carga",
                cantidad: 8,
                ejecutivos: "Ibrahim Rondon, Meivys Romero, Deivimar Blanco, Dybrams Constati, Abel Frias, Ana Gamboa, Winifer Ledezma, Carmen Guido",
                casos: 128,
                pctCasos: 7.0,
                promedio: 16.0,
                desviacion: "-83%",
                color: "#FFED00"
            }
        ],
        brecha: 182.9,
        casosPotencialesAbsorcion: 641,
        pctCapacidadExtra: 35
    },

    fcrAnalisis: {
        grupoLider: {
            nombres: ["Madyuri Montilla", "Armando Sánchez", "Marlene Briceño", "Ligia Ramirez"],
            casosAtendidos: 653,
            casosResueltos: 579,
            fcr: 88.5
        },
        restoEquipo: {
            casosAtendidos: 1173,
            casosResueltos: 845,
            fcr: 72.0
        },
        brechaPP: 16.5,
        casosAdicionalesPotenciales: 193
    },

    prioridades: [
        {
            prioridad: 1,
            hallazgo: "Concentración en 'Otro Requerimiento' y Facturación (82.3%)",
            impacto: "1,503 casos (462 de facturación/deuda y 214 cambios de plan)",
            recomendacion: "Autogestión de factura/saldo en canales digitales (IVR, SMS, Cati, Web) y reconexión automática post-pago",
            badge: "Impacto Alto (+25% capacidad)"
        },
        {
            prioridad: 2,
            hallazgo: "Llamadas caídas / Consultas agrupadas (12.0%)",
            impacto: "219 casos registrados (98 caídas explícitas verificadas en notas)",
            recomendacion: "Separar 'Consulta General' de 'Llamada Caída', revisar estabilidad de red/telefonía y aplicar protocolo de devolución",
            badge: "Calidad y Retención"
        },
        {
            prioridad: 3,
            hallazgo: "Capacidad ociosa (-83% en baja carga)",
            impacto: "8 ejecutivos atienden solo el 7.0% del volumen total (128 casos)",
            recomendacion: "Redistribución de carga round-robin del tráfico y balanceo de turnos lunes-martes",
            badge: "+641 Casos Potenciales"
        },
        {
            prioridad: 4,
            hallazgo: "Demanda de soporte en ABA TV GO (6.0% / 134 totales)",
            impacto: "110 casos directos en fallas/requerimientos + 24 en trámites",
            recomendacion: "Automatizar envío de credenciales (usuario/clave) y guía de activación interactiva por correo/SMS",
            badge: "Experiencia Digital"
        },
        {
            prioridad: 5,
            hallazgo: "Brecha de efectividad (16.5 p.p.) y SACAS (8.6%)",
            impacto: "193 casos potenciales de mejora y 157 casos vinculados a SACAS (135 consultas estatus)",
            recomendacion: "Aprendizaje entre pares (Peer-to-peer), coaching focalizado en <75% FCR y seguimiento estricto del SLA de SACAS",
            badge: "+193 Casos FCR"
        }
    ],

    dotacionRecomendada: [
        { dias: "Lunes, Martes", demanda: "Alta (87 - 97 casos/día)", dotacion: "100% del equipo", foco: "Atención pico de llamadas y chats", color: "#FF00A8" },
        { dias: "Miércoles", demanda: "Media (80 casos/día)", dotacion: "90% del equipo", foco: "Gestión continua y seguimiento SACAS", color: "#66FFFF" },
        { dias: "Jueves, Viernes", demanda: "Baja (73 - 77 casos/día, hasta -11.7%)", dotacion: "75% - 80% del equipo", foco: "Capacitación, coaching y backlog", color: "#FFED00" }
    ],

    datosClave: [
        { label: "Total de Casos Analizados", valor: "1,826", icono: "📊", highlight: "cyan" },
        { label: "Días Hábiles del Período", valor: "22 días", icono: "📅", highlight: "gold" },
        { label: "Promedio Diario de Casos", valor: "83.0 casos/día", icono: "📈", highlight: "cyan" },
        { label: "Tasa de Resolución 1er Nivel (FCR)", valor: "78.0% (1,424 casos)", icono: "🎯", highlight: "fuchsia" },
        { label: "Reportes Vinculados / SACAS", valor: "8.6% (157 casos)", icono: "⚙️", highlight: "gold" },
        { label: "Casos Escalados a 2° Nivel", valor: "1.4% (26 casos)", icono: "🚀", highlight: "cyan" },
        { label: "Segmento Predominante", valor: "Residencial (98.7%)", icono: "🏠", highlight: "fuchsia" },
        { label: "Producto Principal", valor: "ABA ULTRA (77.3%)", icono: "⚡", highlight: "cyan" },
        { label: "Categoría Principal en Fallas", valor: "OTRO REQUERIMIENTO (82.3%)", icono: "📁", highlight: "gold" },
        { label: "Subcategoría Principal", valor: "Detalle de Factura (274 tot.)", icono: "🧾", highlight: "cyan" },
        { label: "Requerimiento de Soporte Destacado", valor: "ABA TV GO (134 tot. / 7.3%)", icono: "📺", highlight: "fuchsia" },
        { label: "Avería de Fibra Óptica Principal", valor: "LOS ROJO (42) vs PON FIJO (34)", icono: "🔌", highlight: "gold" },
        { label: "Día Mayor Demanda (Promedio)", valor: "Lunes (96.8 casos/día)", icono: "🔥", highlight: "fuchsia" },
        { label: "Día Menor Demanda (Promedio)", valor: "Jueves (73.3 casos/día)", icono: "📉", highlight: "cyan" },
        { label: "Semana Mayor Demanda", valor: "Semana 3 (482 casos / +16.1%)", icono: "🏔️", highlight: "gold" },
        { label: "Días Pico Absolutos", valor: "28-sep (115) y 14-sep (114)", icono: "⚠️", highlight: "fuchsia" },
        { label: "Interacciones Consultas / Caídas", valor: "219 (12.0%) · 98 caídas netas", icono: "📞", highlight: "cyan" },
        { label: "Ejecutivo Más Efectivo (Vol ≥ 50)", valor: "Madyuri M. (97.4%) / Armando S. (88.6%)", icono: "🏆", highlight: "gold" },
        { label: "Ejecutivo Mayor Volumen", valor: "Ligia Ramirez (310 casos / 17.0%)", icono: "👑", highlight: "cyan" },
        { label: "Capacidad Ociosa Grupo Bajo", valor: "-83% vs Promedio Ideal (16 casos)", icono: "⏳", highlight: "fuchsia" }
    ]
};
