import { cohorte01, cohorte02, cohorte03, cohorte04 } from "./modeloEjercicio32.js";
import { funcionGenerarAlumnos, funcionRenderizarAlumnos } from "./vistaEjercicio32.js";

window.onload = () => {
    //botones del ejercicio 1
    const idButtonCohorte1 = document.querySelector("#idButtonCohorte1");
    const idButtonCohorte2 = document.querySelector("#idButtonCohorte2");
    const idButtonCohorte3 = document.querySelector("#idButtonCohorte3");
    const idButtonCohorte4 = document.querySelector("#idButtonCohorte4");

    //botones del ejercicio 2
    const idButtonTodos = document.querySelector("#idButtonTodos");
    
    //botones del ejercicio 3
    const idButtonAprobados = document.querySelector("#idButtonAprobados");
    const idButtonDesaprobados = document.querySelector("#idButtonDesaprobados");

    //botones del ejercicio 4
    const idButtonOrdenar = document.querySelector("#idButtonOrdenar");

    //botones  y input del ejercicio 5
    const idInputDni = document.querySelector("#idInputDni");
    const idButtonBuscar = document.querySelector("#idButtonBuscar");

    //botones del ejercicio 6
    const idButtonContarAprobadosA = document.querySelector("#idButtonContarAprobadosA");
    const idButtonContarAprobadosB = document.querySelector("#idButtonContarAprobadosB");


    // contenedor que se usara para todas las listas
    const idContenedorLista = document.querySelector("#idContenedorLista");

    // ejercicio 1 - hice un boton para cada cohorte individual
    idButtonCohorte1.onclick = () => {
        const listaAlumnosItems = funcionGenerarAlumnos(cohorte01);
        funcionRenderizarAlumnos(listaAlumnosItems, idContenedorLista);        
    }

    idButtonCohorte2.onclick = () => {
        const listaAlumnosItems = funcionGenerarAlumnos(cohorte02);
        funcionRenderizarAlumnos(listaAlumnosItems, idContenedorLista);        
    }

    idButtonCohorte3.onclick = () => {
        const listaAlumnosItems = funcionGenerarAlumnos(cohorte03);
        funcionRenderizarAlumnos(listaAlumnosItems, idContenedorLista);        
    }

    idButtonCohorte4.onclick = () => {
        const listaAlumnosItems = funcionGenerarAlumnos(cohorte04);
        funcionRenderizarAlumnos(listaAlumnosItems, idContenedorLista);        
    }

    // ejercicio 2 - la unificacion de todas las cohortes
    const todasCohortes = [...cohorte01, ...cohorte02, ...cohorte03, ...cohorte04];

    idButtonTodos.onclick = () => {
        const listaAlumnosItems = funcionGenerarAlumnos(todasCohortes);
        funcionRenderizarAlumnos(listaAlumnosItems, idContenedorLista);
    }

    // ejercicio 3 - filtrar aprobados y desaprobados
    idButtonAprobados.onclick = () => {
        const alumnosAprobados = todasCohortes.filter(alumno => alumno.nota_final > 5);
        const listaItems = funcionGenerarAlumnos(alumnosAprobados);
        funcionRenderizarAlumnos(listaItems, idContenedorLista);
    }

    idButtonDesaprobados.onclick = () => {
        const alumnosDesaprobados = todasCohortes.filter(alumno => alumno.nota_final <= 5);
        const listaItems = funcionGenerarAlumnos(alumnosDesaprobados);
        funcionRenderizarAlumnos(listaItems, idContenedorLista);
    }

    //ejercicio 4 - ordenar por nota (menor a mayor)
    idButtonOrdenar.onclick = () => {
        // ordenamos por nota de forma ascendente (a - b)
        const alumnosOrdenados = [...todasCohortes].sort((a, b) => a.nota_final - b.nota_final);
        
        const listaItems = funcionGenerarAlumnos(alumnosOrdenados);
        funcionRenderizarAlumnos(listaItems, idContenedorLista);
    }

    // ejercicio 5: busqueda por DNI (find)
    idButtonBuscar.onclick = () => {
        const dniBuscado = idInputDni.value.trim();
        const alumnoEncontrado = todasCohortes.find(alumno => alumno.dni === dniBuscado);

        if (alumnoEncontrado) {
            const listaItems = funcionGenerarAlumnos([alumnoEncontrado]);
            funcionRenderizarAlumnos(listaItems, idContenedorLista);
        } else {
            alert("Alumno no encontrado con ese DNI.");
        }
    }

    // Ejercicio 6: Contabilizar aprobados (reduce)
    
    // a. Usando if/else
    idButtonContarAprobadosA.onclick = () => {
        const cantidadAprobados = todasCohortes.reduce((contador, alumno) => {
            if (alumno.nota_final > 5) {
                return contador + 1;
            } else {
                return contador;
            }
        }, 0);
        alert(`Cantidad de aprobados (con if/else): ${cantidadAprobados}`);
    }

    // b. Usando operador ternario
    idButtonContarAprobadosB.onclick = () => {
        const cantidadAprobados = todasCohortes.reduce((contador, alumno) => 
            alumno.nota_final > 5 ? contador + 1 : contador
        , 0);
        alert(`Cantidad de aprobados (con ternario): ${cantidadAprobados}`);
    }
}