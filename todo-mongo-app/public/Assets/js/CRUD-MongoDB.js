    const formulario = document.getElementById('formulario-tarea');
    const inputTitulo = document.getElementById('input-titulo');
    const listaTareas = document.getElementById('lista-tareas');

    // 1. Cargar y mostrar las tareas al abrir la página (GET)
    async function obtenerTareas() {
        listaTareas.innerHTML = ''; // Limpiar la lista
        const respuesta = await fetch('/tareas');
        const tareas = await respuesta.json();
        
        tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${tarea.titulo}</span>
                <button onclick="eliminarTarea('${tarea._id}')" style="background:red; margin-left:10px;">Eliminar</button>
            `;
            listaTareas.appendChild(li);
        });
    }

    // 2. Crear una nueva tarea desde el formulario (POST)
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const titulo = inputTitulo.value;

        await fetch('/tareas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo })
        });

        inputTitulo.value = '';
        obtenerTareas(); // Recargar la lista
    });

    // 3. Eliminar una tarea (DELETE)
    async function eliminarTarea(id) {
        await fetch(`/tareas/${id}`, { method: 'DELETE' });
        obtenerTareas(); // Recargar la lista
    }

    // Ejecutar al cargar la página
    obtenerTareas();
