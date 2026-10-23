/**
 * Aplicación Principal - Informe Interactivo Centro de Contacto
 * Maneja navegación por pestañas de las 12 secciones,
 * renderizado dinámico de tablas y visualización interactiva.
 */

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

const App = {
    currentSection: 'sec-1',
    executiveSort: 'fcr-desc',
    executiveFilter: 'todos',
    executiveSearchQuery: '',

    // Inicialización del sistema
    init() {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        this.renderAllTables();
        this.renderKPIs();
        this.initNavigation();
        this.initSubtabs();
        
        // Inicializar gráficos tras render de DOM
        setTimeout(() => {
            AppCharts.initAll();
            window.scrollTo(0, 0);
        }, 100);
    },

    // 1. Navegación entre las 12 Secciones
    initNavigation() {
        const tabBtns = document.querySelectorAll('.nav-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetSec = btn.dataset.target;
                this.switchSection(targetSec);
            });
        });

        // Soporte para Hash URL
        if (window.location.hash) {
            const hashSec = window.location.hash.substring(1);
            if (document.getElementById(hashSec)) {
                this.switchSection(hashSec);
            }
        }
    },

    switchSection(sectionId) {
        // Actualizar pestañas activas
        document.querySelectorAll('.nav-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.target === sectionId);
        });

        // Actualizar secciones
        document.querySelectorAll('.report-section').forEach(sec => {
            sec.classList.toggle('active', sec.id === sectionId);
        });

        this.currentSection = sectionId;
        window.location.hash = sectionId;

        // Desplazar por defecto hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Ajustar redimensionamiento de gráficos activos
        window.dispatchEvent(new Event('resize'));
    },

    // Subtabs para Sección 10 (Hallazgos Críticos) y Sección 11
    initSubtabs() {
        document.querySelectorAll('.tab-pills-nav').forEach(nav => {
            const buttons = nav.querySelectorAll('.pill-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetSub = btn.dataset.subtarget;
                    const parent = btn.closest('.report-section');
                    
                    nav.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    parent.querySelectorAll('.subtab-panel').forEach(panel => {
                        panel.classList.toggle('active', panel.id === targetSub);
                    });

                    // Forzar ajuste de tamaño en gráficos que estaban ocultos
                    setTimeout(() => {
                        if (window.AppCharts && AppCharts.instances) {
                            if (AppCharts.instances.capacidad) AppCharts.instances.capacidad.resize();
                            if (AppCharts.instances.brechaFCR) AppCharts.instances.brechaFCR.resize();
                        }
                        window.dispatchEvent(new Event('resize'));
                    }, 50);
                });
            });
        });
    },

    // 4. Renderizado Dinámico de Tablas
    renderAllTables() {
        this.renderSegmentosTable();
        this.renderTopProductosTable();
        this.renderTiposSolicitudTable();
        this.renderAveriasTable();
        this.renderOtroReqTable();
        this.renderComportamientoTables();
        this.renderEjecutivosTable();
        this.renderEstadosFinalesTable();
        this.renderPrioridadesTable();
        this.renderDotacionTable();
        this.renderDatosClaveGrid();
    },

    renderSegmentosTable() {
        const tbody = document.getElementById('tbody-segmentos');
        if (!tbody) return;
        tbody.innerHTML = REPORT_DATA.segmentos.map(s => `
            <tr>
                <td><strong>${s.nombre}</strong></td>
                <td class="col-right"><strong>${s.casos.toLocaleString()}</strong></td>
                <td class="col-right">${s.porcentaje}%</td>
                <td>
                    <div class="table-bar-bg">
                        <div class="table-bar-fill" style="width: ${s.porcentaje}%; background-color: ${s.color};"></div>
                    </div>
                </td>
            </tr>
        `).join('') + `
            <tr class="row-highlight">
                <td><strong>TOTAL</strong></td>
                <td class="col-right"><strong>1,826</strong></td>
                <td class="col-right"><strong>100%</strong></td>
                <td></td>
            </tr>
        `;
    },

    renderTopProductosTable() {
        const tbody = document.getElementById('tbody-top-productos');
        if (!tbody) return;
        tbody.innerHTML = REPORT_DATA.topProductos.map(p => `
            <tr>
                <td><strong>${p.producto}</strong></td>
                <td class="col-right"><strong>${p.casos.toLocaleString()}</strong></td>
                <td class="col-right">${p.porcentaje}%</td>
                <td>
                    <div class="table-bar-bg">
                        <div class="table-bar-fill" style="width: ${p.porcentaje}%; background-color: ${p.color};"></div>
                    </div>
                </td>
            </tr>
        `).join('') + `
            <tr class="row-highlight">
                <td><strong>TOTAL</strong></td>
                <td class="col-right"><strong>1,826</strong></td>
                <td class="col-right"><strong>100%</strong></td>
                <td></td>
            </tr>
        `;
    },

    renderTiposSolicitudTable() {
        const tbody = document.getElementById('tbody-tipos-solicitud');
        if (!tbody) return;
        tbody.innerHTML = REPORT_DATA.tiposSolicitud.map(t => `
            <tr>
                <td><strong>${t.tipo}</strong></td>
                <td class="col-right"><strong>${t.casos.toLocaleString()}</strong></td>
                <td class="col-right">${t.porcentaje}%</td>
                <td>
                    <div class="table-bar-bg">
                        <div class="table-bar-fill" style="width: ${t.porcentaje}%; background-color: ${t.color};"></div>
                    </div>
                </td>
            </tr>
        `).join('') + `
            <tr class="row-highlight">
                <td><strong>TOTAL</strong></td>
                <td class="col-right"><strong>1,826</strong></td>
                <td class="col-right"><strong>100%</strong></td>
                <td></td>
            </tr>
        `;
    },

    renderAveriasTable() {
        const tbody = document.getElementById('tbody-averias');
        if (!tbody) return;
        tbody.innerHTML = REPORT_DATA.averiasFallas.map(a => `
            <tr class="${a.esOtroReq ? 'row-highlight' : ''}">
                <td><strong>${a.nombre}</strong></td>
                <td class="col-right"><strong>${a.casos.toLocaleString()}</strong></td>
                <td class="col-right">${a.porcentaje}%</td>
                <td>
                    <div class="table-bar-bg">
                        <div class="table-bar-fill" style="width: ${a.porcentaje}%; background: ${a.esOtroReq ? 'var(--neon-fuchsia)' : 'var(--neon-cyan)'};"></div>
                    </div>
                </td>
            </tr>
        `).join('') + `
            <tr class="row-highlight">
                <td><strong>TOTAL</strong></td>
                <td class="col-right"><strong>1,826</strong></td>
                <td class="col-right"><strong>100%</strong></td>
                <td></td>
            </tr>
        `;
    },

    renderOtroReqTable() {
        const tbody = document.getElementById('tbody-otro-req');
        if (!tbody) return;
        const subcats = REPORT_DATA.otroRequerimiento.subcategorias;
        tbody.innerHTML = subcats.map(s => `
            <tr>
                <td><strong>${s.nombre}</strong></td>
                <td class="col-right"><strong>${s.casos.toLocaleString()}</strong></td>
                <td class="col-right">${s.pctOtro}%</td>
                <td class="col-right" style="color: var(--neon-cyan);">${s.casosTotalesMes}</td>
                <td class="col-right" style="color: var(--neon-cyan);">${s.pctMes}%</td>
                <td>
                    <div class="table-bar-bg">
                        <div class="table-bar-fill" style="width: ${s.pctOtro}%; background: linear-gradient(90deg, var(--neon-fuchsia), var(--neon-cyan));"></div>
                    </div>
                </td>
            </tr>
        `).join('') + `
            <tr class="row-highlight">
                <td><strong>TOTAL</strong></td>
                <td class="col-right"><strong>1,503</strong></td>
                <td class="col-right"><strong>100%</strong></td>
                <td class="col-right">—</td>
                <td class="col-right">—</td>
                <td></td>
            </tr>
        `;
    },

    renderComportamientoTables() {
        const tbodyDia = document.getElementById('tbody-comp-dia');
        if (tbodyDia) {
            tbodyDia.innerHTML = REPORT_DATA.comportamientoDia.map(d => `
                <tr>
                    <td><strong>${d.dia}</strong></td>
                    <td class="col-right"><strong>${d.casos}</strong></td>
                    <td class="col-right"><span class="badge-tag badge-cyan">${d.promedio}</span></td>
                    <td class="col-center">${d.dias}</td>
                    <td class="col-center"><strong>${d.rank}</strong></td>
                    <td class="col-right" style="color: ${d.desv.startsWith('+') ? 'var(--neon-fuchsia)' : 'var(--neon-cyan)'};">
                        ${d.desv}
                    </td>
                </tr>
            `).join('');
        }

        const tbodySemana = document.getElementById('tbody-comp-semana');
        if (tbodySemana) {
            tbodySemana.innerHTML = REPORT_DATA.comportamientoSemana.map(s => `
                <tr>
                    <td><strong>${s.semana}</strong></td>
                    <td>${s.fechas}</td>
                    <td class="col-right"><strong>${s.casos}</strong></td>
                    <td class="col-right"><span class="badge-tag badge-gold">${s.promedio}</span></td>
                    <td>
                        <span class="badge-tag ${s.obs.includes('PICO') ? 'badge-fuchsia' : 'badge-cyan'}">
                            ${s.obs}
                        </span>
                    </td>
                </tr>
            `).join('');
        }
    },

    // Tabla Ejecutivos con Filtros, Búsqueda y Ordenamiento
    renderEjecutivosTable() {
        const tbody = document.getElementById('tbody-ejecutivos');
        if (!tbody) return;

        let list = [...REPORT_DATA.ejecutivos];

        // Filtro por grupo
        if (this.executiveFilter !== 'todos') {
            list = list.filter(e => e.grupo === this.executiveFilter);
        }

        // Búsqueda por texto
        if (this.executiveSearchQuery.trim() !== '') {
            const query = this.executiveSearchQuery.toLowerCase();
            list = list.filter(e => e.nombre.toLowerCase().includes(query));
        }

        // Ordenamiento
        if (this.executiveSort === 'fcr-desc') {
            list.sort((a, b) => b.fcr - a.fcr);
        } else if (this.executiveSort === 'fcr-asc') {
            list.sort((a, b) => a.fcr - b.fcr);
        } else if (this.executiveSort === 'casos-desc') {
            list.sort((a, b) => b.casos - a.casos);
        } else if (this.executiveSort === 'casos-asc') {
            list.sort((a, b) => a.casos - b.casos);
        }

        tbody.innerHTML = list.map((e, idx) => {
            const fcrColor = e.fcr >= 85 ? 'var(--neon-green)' : (e.fcr >= 75 ? 'var(--neon-cyan)' : 'var(--neon-fuchsia)');
            const grupoBadge = e.grupo === 'Alta carga' 
                ? 'badge-fuchsia' 
                : (e.grupo === 'Carga media' ? 'badge-cyan' : 'badge-gold');

            return `
                <tr>
                    <td class="col-center">#${idx + 1}</td>
                    <td><strong>${e.nombre}</strong></td>
                    <td class="col-right"><strong>${e.casos}</strong></td>
                    <td class="col-right" style="color: var(--neon-cyan);">${e.resueltos}</td>
                    <td class="col-right" style="color: var(--neon-red);">${e.noResueltos}</td>
                    <td class="col-right">
                        <span class="badge-tag" style="border-color: ${fcrColor}; color: ${fcrColor};">
                            ${e.fcr.toFixed(1)}%
                        </span>
                    </td>
                    <td class="col-center">
                        <span class="badge-tag ${grupoBadge}">${e.grupo}</span>
                    </td>
                </tr>
            `;
        }).join('') + `
            <tr class="row-highlight">
                <td class="col-center"><strong>—</strong></td>
                <td><strong>TOTAL / PROMEDIO</strong></td>
                <td class="col-right"><strong>1,826</strong></td>
                <td class="col-right"><strong>1,424</strong></td>
                <td class="col-right"><strong>402</strong></td>
                <td class="col-right"><strong>78.0%</strong></td>
                <td class="col-center"><span class="badge-tag badge-cyan">19 Ejecutivos</span></td>
            </tr>
        `;

        this.initExecutiveControls();
    },

    initExecutiveControls() {
        const searchInput = document.getElementById('search-ejecutivo');
        const filterSelect = document.getElementById('filter-grupo');
        const sortSelect = document.getElementById('sort-ejecutivos');

        searchInput?.addEventListener('input', (e) => {
            this.executiveSearchQuery = e.target.value;
            this.renderEjecutivosTable();
        });

        filterSelect?.addEventListener('change', (e) => {
            this.executiveFilter = e.target.value;
            this.renderEjecutivosTable();
        });

        sortSelect?.addEventListener('change', (e) => {
            this.executiveSort = e.target.value;
            this.renderEjecutivosTable();
        });
    },

    renderEstadosFinalesTable() {
        const tbody = document.getElementById('tbody-estados-finales');
        if (!tbody) return;
        tbody.innerHTML = REPORT_DATA.estadosFinales.map(e => `
            <tr>
                <td><strong>${e.estado}</strong></td>
                <td class="col-right"><strong>${e.casos.toLocaleString()}</strong></td>
                <td class="col-right">${e.porcentaje}%</td>
                <td>
                    <div class="table-bar-bg">
                        <div class="table-bar-fill" style="width: ${e.porcentaje}%; background-color: ${e.color};"></div>
                    </div>
                </td>
            </tr>
        `).join('') + `
            <tr class="row-highlight">
                <td><strong>TOTAL</strong></td>
                <td class="col-right"><strong>1,826</strong></td>
                <td class="col-right"><strong>100%</strong></td>
                <td></td>
            </tr>
        `;
    },

    renderPrioridadesTable() {
        const tbody = document.getElementById('tbody-prioridades');
        if (!tbody) return;
        tbody.innerHTML = REPORT_DATA.prioridades.map(p => `
            <tr>
                <td class="col-center"><span class="tab-num">${p.prioridad}</span></td>
                <td><strong>${p.hallazgo}</strong></td>
                <td style="color: var(--neon-gold);">${p.impacto}</td>
                <td>${p.recomendacion}</td>
                <td class="col-center"><span class="badge-tag badge-fuchsia">${p.badge}</span></td>
            </tr>
        `).join('');
    },

    renderDotacionTable() {
        const tbody = document.getElementById('tbody-dotacion');
        if (!tbody) return;
        tbody.innerHTML = REPORT_DATA.dotacionRecomendada.map(d => `
            <tr>
                <td><strong>${d.dias}</strong></td>
                <td><span class="badge-tag" style="border-color: ${d.color}; color: ${d.color};">${d.demanda}</span></td>
                <td><strong>${d.dotacion}</strong></td>
                <td style="color: var(--text-secondary);">${d.foco}</td>
            </tr>
        `).join('');
    },

    renderDatosClaveGrid() {
        const grid = document.getElementById('grid-datos-clave');
        if (!grid) return;
        grid.innerHTML = REPORT_DATA.datosClave.map(kpi => {
            const borderGlow = kpi.highlight === 'fuchsia' ? 'kpi-fuchsia' : (kpi.highlight === 'gold' ? 'kpi-gold' : '');
            return `
                <div class="kpi-card glass-panel ${borderGlow}">
                    <div class="kpi-header">
                        <span class="kpi-label">${kpi.label}</span>
                        <span class="kpi-icon">${kpi.icono}</span>
                    </div>
                    <div class="kpi-value" style="font-size: 1.45rem;">${kpi.valor}</div>
                </div>
            `;
        }).join('');
    },

    renderKPIs() {
        // Actualiza etiquetas generales si existen en el header
        const totalElem = document.getElementById('kpi-header-total');
        const fcrElem = document.getElementById('kpi-header-fcr');
        const promElem = document.getElementById('kpi-header-promedio');

        if (totalElem) totalElem.textContent = REPORT_DATA.metadata.totalCasos.toLocaleString();
        if (fcrElem) fcrElem.textContent = `${REPORT_DATA.metadata.fcrGlobal}%`;
        if (promElem) promElem.textContent = REPORT_DATA.metadata.promedioDiario.toFixed(1);
    }
};
