// ==========================================
        // 1. DATOS INICIALES EN MEMORIA (RESEÑAS Y CURIOSIDADES)
        // ==========================================
        let resenasHistoricas = [
            {
                id: 1,
                anio: "26 de Febrero de 1561",
                titulo: "Fundación de Santa Cruz de la Sierra",
                contenido: "Fundada por el capitán español Ñuflo de Chaves a orillas del arroyo Sutó, en la serranía de Chiquitos, bautizándola en honor a su tierra natal en Extremadura, España."
            },
            {
                id: 2,
                anio: "1592 - 1621",
                titulo: "Traslado hacia los Llanos del Grigotá",
                contenido: "Debido a conflictos con los pueblos originarios y buscando mejores tierras agrícolas, la ciudad fue trasladada progresivamente hasta ubicarse cerca del río Piraí, donde permanece hoy."
            },
            {
                id: 3,
                anio: "24 de Septiembre de 1810",
                titulo: "Grito Libertario Cruceño",
                contenido: "Los patriotas cruceños, liderados por Ignacio Warnes, José Manuel Mercado 'El Colorao' y Antonio Vicente Seoane, se levantaron contra el dominio colonial español."
            }
        ];

        const datosCuriosidades = {
            anillos: {
                titulo: "Ciudad de los Anillos",
                icono: "bi-bullseye",
                descripcion: "Santa Cruz de la Sierra es mundialmente conocida por su diseño urbanístico radial y concéntrico, inspirado en las ciudades jardín europeas. Sus avenidas principales forman anillos circulares numerados (del 1° al 8° anillo y más) que rodean el casco viejo, conectados por avenidas radiales que parten desde el centro hacia las afueras."
            },
            fundacion: {
                titulo: "Fundación",
                icono: "bi-flag-fill",
                descripcion: "Fue fundada el 26 de febrero de 1561 por el explorador español Ñuflo de Chaves tras una expedición que partió desde Asunción (Paraguay). Su primer emplazamiento estuvo cerca de la actual San José de Chiquitos, antes de mudarse definitivamente a orillas del río Piraí."
            },
            bandera: {
                titulo: "Bandera Cruceña",
                icono: "bi-bookmark-star-fill",
                descripcion: "Creada el 24 de julio de 1864 por el prefecto Tristán Roca. Está compuesta por tres franjas horizontales del mismo ancho: verde arriba, blanco al centro y verde abajo. El verde simboliza la riqueza forestal y la esperanza, mientras que el blanco representa la pureza, hidalguía y nobleza de su gente."
            },
            tajibo: {
                titulo: "El Tajibo",
                icono: "bi-flower1",
                descripcion: "Es el árbol emblemático de Santa Cruz. Entre los meses de agosto y septiembre, los tajibos pierden todas sus hojas para cubrirse por completo de flores vibrantes de color rosado, amarillo o blanco, tiñendo las calles, plazas y anillos de la ciudad con un espectáculo natural único."
            }
        };

        // ==========================================
        // 2. LÓGICA DE CURIOSIDADES (BOTÓN Y LISTA)
        // ==========================================
        const btnToggleCuriosidades = document.getElementById('btn-toggle-curiosidades');
        const listaCuriosidadesContainer = document.getElementById('lista-curiosidades-container');
        const iconoFlecha = document.getElementById('icono-flecha');

        btnToggleCuriosidades.addEventListener('click', () => {
            listaCuriosidadesContainer.classList.toggle('d-none');
            if (listaCuriosidadesContainer.classList.contains('d-none')) {
                iconoFlecha.classList.replace('bi-chevron-up', 'bi-chevron-down');
            } else {
                iconoFlecha.classList.replace('bi-chevron-down', 'bi-chevron-up');
            }
        });

        function mostrarDetalleCuriosidad(clave, elementoBoton) {
            const info = datosCuriosidades[clave];
            if (!info) return;

            // Actualizar clase activa en la lista
            document.querySelectorAll('.curiosidad-item').forEach(item => item.classList.remove('active'));
            elementoBoton.classList.add('active');

            // Actualizar tarjeta de detalle
            document.getElementById('curiosidad-titulo').textContent = info.titulo;
            document.getElementById('curiosidad-descripcion').textContent = info.descripcion;
            document.getElementById('curiosidad-icono').className = `bi ${info.icono} fs-3`;
        }

        // ==========================================
        // 3. RENDERIZADO Y CRUD DE RESEÑAS HISTÓRICAS
        // ==========================================
        function renderizarResenas() {
            const contenedor = document.getElementById('contenedor-resenas');
            const listaAdmin = document.getElementById('admin-lista-resenas');

            contenedor.innerHTML = '';
            listaAdmin.innerHTML = '';

            if (resenasHistoricas.length === 0) {
                contenedor.innerHTML = '<div class="col-12 text-center text-muted py-4">No hay reseñas históricas registradas. Usa el Panel Admin para agregar una.</div>';
                return;
            }

            resenasHistoricas.forEach(resena => {
                // Tarjeta pública en la página
                contenedor.innerHTML += `
                    <div class="col-md-4">
                        <div class="card card-custom h-100 p-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2 rounded-pill">
                                    <i class="bi bi-calendar-event me-1"></i> ${resena.anio}
                                </span>
                            </div>
                            <h5 class="fw-bold mt-2">${resena.titulo}</h5>
                            <p class="text-muted small mb-0 lh-base">${resena.contenido}</p>
                        </div>
                    </div>
                `;

                // Fila en el panel de administrador
                listaAdmin.innerHTML += `
                    <div class="list-group-item d-flex justify-content-between align-items-center gap-2">
                        <div>
                            <strong class="d-block text-success">${resena.titulo} <small class="text-muted">(${resena.anio})</small></strong>
                            <small class="text-muted text-truncate d-inline-block" style="max-width: 380px;">${resena.contenido}</small>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary" onclick="editarResena(${resena.id})" title="Modificar">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-outline-danger" onclick="eliminarResena(${resena.id})" title="Eliminar">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        // Guardar (Agregar o Modificar) Reseña
        document.getElementById('form-resena').addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('resena-id').value;
            const titulo = document.getElementById('resena-titulo').value.trim();
            const anio = document.getElementById('resena-anio').value.trim();
            const contenido = document.getElementById('resena-contenido').value.trim();

            if (id) {
                // Modificar existente
                const index = resenasHistoricas.findIndex(r => r.id == id);
                if (index !== -1) {
                    resenasHistoricas[index] = { id: Number(id), titulo, anio, contenido };
                    mostrarNotificacion("Reseña histórica modificada correctamente.");
                }
            } else {
                // Agregar nueva
                const nuevoId = resenasHistoricas.length > 0 ? Math.max(...resenasHistoricas.map(r => r.id)) + 1 : 1;
                resenasHistoricas.push({ id: nuevoId, titulo, anio, contenido });
                mostrarNotificacion("Nueva reseña histórica agregada.");
            }

            resetFormResena();
            renderizarResenas();
        });

        function editarResena(id) {
            const resena = resenasHistoricas.find(r => r.id === id);
            if (!resena) return;

            document.getElementById('resena-id').value = resena.id;
            document.getElementById('resena-titulo').value = resena.titulo;
            document.getElementById('resena-anio').value = resena.anio;
            document.getElementById('resena-contenido').value = resena.contenido;

            document.getElementById('form-resena-titulo').textContent = "Modificando Reseña Histórica";
            document.getElementById('btn-cancelar-edicion').classList.remove('d-none');
        }

        function eliminarResena(id) {
            resenasHistoricas = resenasHistoricas.filter(r => r.id !== id);
            renderizarResenas();
            mostrarNotificacion("Reseña eliminada.");
        }

        function resetFormResena() {
            document.getElementById('form-resena').reset();
            document.getElementById('resena-id').value = '';
            document.getElementById('form-resena-titulo').textContent = "Agregar Nueva Reseña Histórica";
            document.getElementById('btn-cancelar-edicion').classList.add('d-none');
        }

        // ==========================================
        // 4. CAMBIO DE COLORES (VERDE-BLANCO-VERDE)
        // ==========================================
        function aplicarTema(primario, secundario, acento, fondo) {
            document.documentElement.style.setProperty('--color-primario', primario);
            document.documentElement.style.setProperty('--color-secundario', secundario);
            document.documentElement.style.setProperty('--color-acento', acento);
            document.documentElement.style.setProperty('--color-fondo-claro', fondo);

            document.getElementById('picker-primario').value = primario;
            document.getElementById('picker-secundario').value = secundario;
            mostrarNotificacion("Colores de la página actualizados.");
        }

        function aplicarColoresPersonalizados() {
            const primario = document.getElementById('picker-primario').value;
            const secundario = document.getElementById('picker-secundario').value;
            aplicarTema(primario, secundario, primario, '#F4F9F5');
        }

        // ==========================================
        // 5. MODIFICAR NOMBRE Y NÚMERO EN PIE DE PÁGINA
        // ==========================================
        document.getElementById('form-autor').addEventListener('submit', function(e) {
            e.preventDefault();
            const nuevoNombre = document.getElementById('input-autor-nombre').value.trim();
            const nuevoTelefono = document.getElementById('input-autor-telefono').value.trim();

            document.getElementById('footer-nombre').textContent = nuevoNombre;
            document.getElementById('footer-telefono').textContent = nuevoTelefono;

            mostrarNotificacion("Datos del pie de página actualizados.");
        });

        // Utilidades de UI
        function abrirTabAdmin(tabId) {
            const triggerEl = document.querySelector(`#${tabId}-btn`);
            if (triggerEl) {
                const tab = new bootstrap.Tab(triggerEl);
                tab.show();
            }
        }

        function mostrarNotificacion(mensaje) {
            const toast = document.getElementById('notificacion-flotante');
            document.getElementById('notificacion-texto').textContent = mensaje;
            toast.style.display = 'flex';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        }

        // Inicializar al cargar la página
        window.onload = function() {
            renderizarResenas();
        };
