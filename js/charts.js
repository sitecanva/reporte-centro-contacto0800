/**
 * Configuración de Gráficos Interactivos con estética Cyberpunk Neón Glassmorphism
 * Utiliza Chart.js con sombras de neón, gradientes dinámicos y tooltips personalizados
 */

const AppCharts = {
    instances: {},

    // Genera un gradiente de neón vertical para Canvas
    createGradient(ctx, colorStart, colorEnd) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 350);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    },

    // Genera un gradiente de neón horizontal
    createHorizontalGradient(ctx, colorStart, colorEnd) {
        const gradient = ctx.createLinearGradient(0, 0, 450, 0);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    },

    // Divide etiquetas largas en múltiples líneas para evitar recortes en ejes
    splitLabel(label, maxChars = 20) {
        if (!label) return '';
        // Normalizar barras con espacios para permitir quiebres limpios
        const normalized = label.replace(/([^\s])\/([^\s])/g, '$1 / $2');
        if (normalized.length <= maxChars) return label;
        
        const words = normalized.split(' ');
        const lines = [];
        let curLine = '';
        words.forEach(w => {
            if ((curLine ? curLine + ' ' + w : w).length <= maxChars) {
                curLine = (curLine ? curLine + ' ' + w : w);
            } else {
                if (curLine) lines.push(curLine);
                curLine = w;
            }
        });
        if (curLine) lines.push(curLine);
        return lines.length > 1 ? lines : label;
    },

    // Opciones globales de estilo Cyberpunk
    getCommonOptions(title = '') {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#9cb3d3',
                        font: { family: "'Montserrat', system-ui, sans-serif", size: 12 },
                        boxWidth: 14,
                        padding: 15
                    }
                },
                title: {
                    display: !!title,
                    text: title,
                    color: '#ffffff',
                    font: { family: "'Montserrat', system-ui, sans-serif", size: 14, weight: 'bold' },
                    padding: { bottom: 15 }
                },
                tooltip: {
                    backgroundColor: 'rgba(2, 11, 31, 0.95)',
                    titleColor: '#66FFFF',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(102, 255, 255, 0.4)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    titleFont: { family: "'Montserrat', system-ui, sans-serif", size: 12, weight: 'bold' },
                    bodyFont: { family: "'Montserrat', system-ui, sans-serif", size: 12 }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(102, 255, 255, 0.08)' },
                    ticks: { color: '#9cb3d3', font: { family: "'Montserrat', system-ui, sans-serif", size: 11 } }
                },
                y: {
                    grid: { color: 'rgba(102, 255, 255, 0.08)' },
                    ticks: { color: '#9cb3d3', font: { family: "'Montserrat', system-ui, sans-serif", size: 11 } }
                }
            }
        };
    },

    // 1. Gráfico Segmentos (Doughnut)
    initSegmentosChart() {
        const ctx = document.getElementById('chart-segmentos')?.getContext('2d');
        if (!ctx) return;

        const labels = REPORT_DATA.segmentos.map(s => s.nombre);
        const data = REPORT_DATA.segmentos.map(s => s.casos);
        const colors = REPORT_DATA.segmentos.map(s => s.color);

        this.instances.segmentos = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
                    borderColor: '#020b1f',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '68%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#9cb3d3', font: { family: "'Montserrat', system-ui, sans-serif", size: 11 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const val = context.raw;
                                const pct = ((val / total) * 100).toFixed(1);
                                return ` ${context.label}: ${val.toLocaleString()} casos (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });
    },

    // 2. Gráfico Top 5 Productos (Horizontal Bar)
    initTopProductosChart() {
        const ctx = document.getElementById('chart-top-productos')?.getContext('2d');
        if (!ctx) return;

        const labels = REPORT_DATA.topProductos.map(p => p.producto);
        const data = REPORT_DATA.topProductos.map(p => p.casos);

        const gradientAba = this.createHorizontalGradient(ctx, 'rgba(102, 255, 255, 0.9)', 'rgba(102, 255, 255, 0.3)');
        const gradientVoz = this.createHorizontalGradient(ctx, 'rgba(255, 0, 168, 0.9)', 'rgba(255, 0, 168, 0.3)');
        const gradientNoCli = this.createHorizontalGradient(ctx, 'rgba(255, 237, 0, 0.9)', 'rgba(255, 237, 0, 0.3)');

        this.instances.topProductos = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Casos Atendidos',
                    data,
                    backgroundColor: [gradientAba, gradientVoz, gradientNoCli, '#a855f7', '#475569'],
                    borderColor: ['#66FFFF', '#FF00A8', '#FFED00', '#a855f7', '#64748b'],
                    borderWidth: 1.5,
                    borderRadius: 6
                }]
            },
            options: {
                ...this.getCommonOptions(),
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(ctx) {
                                const pct = REPORT_DATA.topProductos[ctx.dataIndex].porcentaje;
                                return `Participación: ${pct}% del total`;
                            }
                        }
                    }
                }
            }
        });
    },

    // 3. Gráfico Tipos de Solicitud (Polar Area / Doughnut)
    initTiposSolicitudChart() {
        const ctx = document.getElementById('chart-tipos-solicitud')?.getContext('2d');
        if (!ctx) return;

        const labels = REPORT_DATA.tiposSolicitud.map(t => t.tipo);
        const data = REPORT_DATA.tiposSolicitud.map(t => t.casos);
        const colors = REPORT_DATA.tiposSolicitud.map(t => t.color);

        this.instances.tiposSolicitud = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
                    borderColor: '#020b1f',
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#9cb3d3', font: { family: "'Montserrat', system-ui, sans-serif", size: 11 } }
                    }
                }
            }
        });
    },

    // 4. Gráfico Averías y Fallas (Bar)
    initAveriasChart() {
        const ctx = document.getElementById('chart-averias')?.getContext('2d');
        if (!ctx) return;

        const rawItems = REPORT_DATA.averiasFallas;
        const maxChars = window.innerWidth < 640 ? 14 : 22;
        const labels = rawItems.map(a => this.splitLabel(a.nombre, maxChars));
        const data = rawItems.map(a => a.casos);
        const colors = rawItems.map(a => a.esOtroReq ? '#FF00A8' : '#66FFFF');

        this.instances.averias = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Casos Registrados',
                    data,
                    backgroundColor: colors.map(c => c === '#FF00A8' ? 'rgba(255, 0, 168, 0.75)' : 'rgba(102, 255, 255, 0.6)'),
                    borderColor: colors,
                    borderWidth: 1.5,
                    borderRadius: 6
                }]
            },
            options: {
                ...this.getCommonOptions(),
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: function(items) {
                                if (!items || !items.length) return '';
                                return rawItems[items[0].dataIndex]?.nombre || '';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(102, 255, 255, 0.08)' },
                        ticks: { color: '#9cb3d3', font: { family: "'Montserrat', system-ui, sans-serif", size: 10 } }
                    },
                    y: {
                        grid: { color: 'rgba(102, 255, 255, 0.08)' },
                        ticks: {
                            color: '#9cb3d3',
                            autoSkip: false,
                            font: { family: "'Montserrat', system-ui, sans-serif", size: window.innerWidth < 640 ? 9.5 : 11 }
                        }
                    }
                }
            }
        });
    },

    // 5. Gráfico Subcategorías "Otro Requerimiento" (Bar)
    initOtroReqChart() {
        const ctx = document.getElementById('chart-otro-req')?.getContext('2d');
        if (!ctx) return;

        const subcats = REPORT_DATA.otroRequerimiento.subcategorias;
        const maxChars = window.innerWidth < 640 ? 14 : 20;
        const labels = subcats.map(s => this.splitLabel(s.nombre, maxChars));
        const data = subcats.map(s => s.casos);

        this.instances.otroReq = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Casos en Otro Requerimiento',
                    data,
                    backgroundColor: 'rgba(255, 0, 168, 0.65)',
                    borderColor: '#FF00A8',
                    borderWidth: 1.5,
                    borderRadius: 6
                }]
            },
            options: {
                ...this.getCommonOptions(),
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: function(items) {
                                if (!items || !items.length) return '';
                                return subcats[items[0].dataIndex]?.nombre || '';
                            },
                            afterLabel: function(ctx) {
                                const item = subcats[ctx.dataIndex];
                                return [
                                    `% en Otro Req: ${item.pctOtro}%`,
                                    `Casos Totales en el Mes: ${item.casosTotalesMes} (${item.pctMes}%)`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(102, 255, 255, 0.08)' },
                        ticks: { color: '#9cb3d3', font: { family: "'Montserrat', system-ui, sans-serif", size: 10 } }
                    },
                    y: {
                        grid: { color: 'rgba(102, 255, 255, 0.08)' },
                        ticks: {
                            color: '#9cb3d3',
                            autoSkip: false,
                            font: { family: "'Montserrat', system-ui, sans-serif", size: window.innerWidth < 640 ? 9.5 : 11 }
                        }
                    }
                }
            }
        });
    },

    // 6. Gráficos de Comportamiento: Día de la Semana y Por Semana
    initComportamientoCharts() {
        const ctxDia = document.getElementById('chart-comportamiento-dia')?.getContext('2d');
        if (ctxDia) {
            const labels = REPORT_DATA.comportamientoDia.map(d => d.dia);
            const promedios = REPORT_DATA.comportamientoDia.map(d => d.promedio);
            const totales = REPORT_DATA.comportamientoDia.map(d => d.casos);

            this.instances.compDia = new Chart(ctxDia, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Promedio Casos / Día',
                            data: promedios,
                            backgroundColor: 'rgba(102, 255, 255, 0.75)',
                            borderColor: '#66FFFF',
                            borderWidth: 1.5,
                            borderRadius: 6,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Total Acumulado del Mes',
                            data: totales,
                            type: 'line',
                            borderColor: '#FF00A8',
                            backgroundColor: 'rgba(255, 0, 168, 0.15)',
                            borderWidth: 3,
                            pointBackgroundColor: '#FF00A8',
                            pointBorderColor: '#ffffff',
                            pointRadius: 6,
                            tension: 0.3,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    ...this.getCommonOptions(),
                    scales: {
                        x: {
                            grid: { color: 'rgba(102, 255, 255, 0.08)' },
                            ticks: { color: '#9cb3d3' }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: { display: true, text: 'Promedio Diario', color: '#66FFFF' },
                            grid: { color: 'rgba(102, 255, 255, 0.08)' },
                            ticks: { color: '#9cb3d3' }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: { display: true, text: 'Total Casos', color: '#FF00A8' },
                            grid: { drawOnChartArea: false },
                            ticks: { color: '#9cb3d3' }
                        }
                    }
                }
            });
        }

        const ctxSemana = document.getElementById('chart-comportamiento-semana')?.getContext('2d');
        if (ctxSemana) {
            const labels = REPORT_DATA.comportamientoSemana.map(s => `${s.semana} (${s.fechas})`);
            const casos = REPORT_DATA.comportamientoSemana.map(s => s.casos);
            const proms = REPORT_DATA.comportamientoSemana.map(s => s.promedio);

            this.instances.compSemana = new Chart(ctxSemana, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Solicitudes Totales',
                            data: casos,
                            borderColor: '#FFED00',
                            backgroundColor: 'rgba(255, 237, 0, 0.1)',
                            fill: true,
                            tension: 0.35,
                            borderWidth: 3,
                            pointBackgroundColor: '#FFED00',
                            pointBorderColor: '#020b1f',
                            pointBorderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 9
                        },
                        {
                            label: 'Promedio Diario',
                            data: proms,
                            borderColor: '#66FFFF',
                            borderDash: [5, 5],
                            borderWidth: 2,
                            pointBackgroundColor: '#66FFFF',
                            tension: 0.2
                        }
                    ]
                },
                options: this.getCommonOptions()
            });
        }
    },

    // 7. Gráfico Scatter / Bubble Matrix: Volumen vs Efectividad FCR
    initScatterFCRChart() {
        const ctx = document.getElementById('chart-scatter-fcr')?.getContext('2d');
        if (!ctx) return;

        const dataPoints = REPORT_DATA.ejecutivos.map(e => ({
            x: e.casos,
            y: e.fcr,
            nombre: e.nombre,
            resueltos: e.resueltos,
            grupo: e.grupo
        }));

        this.instances.scatterFCR = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Ejecutivos',
                    data: dataPoints,
                    backgroundColor: dataPoints.map(p => {
                        if (p.grupo === 'Alta carga') return '#FF00A8';
                        if (p.grupo === 'Carga media') return '#66FFFF';
                        return '#FFED00';
                    }),
                    borderColor: '#ffffff',
                    borderWidth: 1.5,
                    pointRadius: 8,
                    pointHoverRadius: 12
                }]
            },
            options: {
                ...this.getCommonOptions(),
                scales: {
                    x: {
                        title: { display: true, text: 'Volumen de Casos Atendidos', color: '#9cb3d3' },
                        grid: { color: 'rgba(102, 255, 255, 0.08)' },
                        ticks: { color: '#9cb3d3' },
                        min: 0,
                        max: 340
                    },
                    y: {
                        title: { display: true, text: 'Efectividad (FCR %)', color: '#9cb3d3' },
                        grid: { color: 'rgba(102, 255, 255, 0.08)' },
                        ticks: { color: '#9cb3d3' },
                        min: 0,
                        max: 105
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const raw = context.raw;
                                return [
                                    ` ${raw.nombre} (${raw.grupo})`,
                                    ` Casos Atendidos: ${raw.x}`,
                                    ` Efectividad (FCR): ${raw.y}%`,
                                    ` Resueltos: ${raw.resueltos}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    },

    // 8. Gráfico Estados Finales (Doughnut)
    initEstadosFinalesChart() {
        const ctx = document.getElementById('chart-estados-finales')?.getContext('2d');
        if (!ctx) return;

        const labels = REPORT_DATA.estadosFinales.map(e => e.estado);
        const data = REPORT_DATA.estadosFinales.map(e => e.casos);
        const colors = REPORT_DATA.estadosFinales.map(e => e.color);

        this.instances.estadosFinales = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
                    borderColor: '#020b1f',
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#9cb3d3', font: { family: "'Montserrat', system-ui, sans-serif", size: 11 } }
                    }
                }
            }
        });
    },

    // 9. Gráficos de Hallazgos Críticos (Capacidad y FCR)
    initHallazgosCharts() {
        // Capacidad Ociosa
        const ctxCapacidad = document.getElementById('chart-capacidad-talento')?.getContext('2d');
        if (ctxCapacidad) {
            const grupos = REPORT_DATA.capacidadTalento.grupos;
            const labels = grupos.map(g => [g.tipo, `(${g.cantidad} ejecutivos)`]);
            const casosReales = grupos.map(g => g.casos);
            const promedioReal = grupos.map(g => g.promedio);
            const promedioIdeal = [96.1, 96.1, 96.1];

            this.instances.capacidad = new Chart(ctxCapacidad, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Promedio Real por Ejecutivo',
                            data: promedioReal,
                            backgroundColor: ['#FF00A8', '#66FFFF', '#FFED00'],
                            borderRadius: 6
                        },
                        {
                            label: 'Promedio Ideal Homogéneo (96.1)',
                            data: promedioIdeal,
                            type: 'line',
                            borderColor: '#ffffff',
                            borderDash: [6, 6],
                            borderWidth: 2,
                            pointRadius: 4,
                            fill: false
                        }
                    ]
                },
                options: {
                    ...this.getCommonOptions('Comparación de Carga Real vs Ideal (Casos/Ejecutivo)'),
                    scales: {
                        x: {
                            grid: { color: 'rgba(102, 255, 255, 0.08)' },
                            ticks: {
                                color: '#9cb3d3',
                                autoSkip: false,
                                maxRotation: 0,
                                font: { family: "'Montserrat', system-ui, sans-serif", size: window.innerWidth < 640 ? 9.5 : 11 }
                            }
                        },
                        y: {
                            grid: { color: 'rgba(102, 255, 255, 0.08)' },
                            ticks: { color: '#9cb3d3', font: { family: "'Montserrat', system-ui, sans-serif", size: 10 } }
                        }
                    }
                }
            });
        }

        // Brecha FCR
        const ctxBrecha = document.getElementById('chart-brecha-fcr')?.getContext('2d');
        if (ctxBrecha) {
            this.instances.brechaFCR = new Chart(ctxBrecha, {
                type: 'bar',
                data: {
                    labels: ['Grupo Líder (4 ejecutivos)', 'Resto del Equipo (15)', 'Promedio Global'],
                    datasets: [{
                        label: 'Efectividad FCR (%)',
                        data: [88.5, 72.0, 78.0],
                        backgroundColor: ['#66FFFF', '#FF00A8', '#FFED00'],
                        borderRadius: 8,
                        borderWidth: 1.5,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    ...this.getCommonOptions('Brecha de Resolución al Primer Contacto (16.5 p.p.)'),
                    scales: {
                        y: {
                            min: 50,
                            max: 100,
                            ticks: { callback: v => `${v}%`, color: '#9cb3d3' },
                            grid: { color: 'rgba(102, 255, 255, 0.08)' }
                        },
                        x: {
                            ticks: { color: '#9cb3d3' },
                            grid: { color: 'rgba(102, 255, 255, 0.08)' }
                        }
                    }
                }
            });
        }
    },

    // Inicializa todos los gráficos
    initAll() {
        this.initSegmentosChart();
        this.initTopProductosChart();
        this.initTiposSolicitudChart();
        this.initAveriasChart();
        this.initOtroReqChart();
        this.initComportamientoCharts();
        this.initScatterFCRChart();
        this.initEstadosFinalesChart();
        this.initHallazgosCharts();
    }
};
