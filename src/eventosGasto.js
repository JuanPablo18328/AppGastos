import { abrirFormularioGasto } from "./eventoBtnFormularioGasto";
import cargarGastos from './cargarGastos';
import cargarTotalGastado from "./cargarTotalGastado";

const contenedorGastos = document.getElementById('gastos');


contenedorGastos.addEventListener('click', (e)=>{
    const gasto = e.target.closest('.gasto');

    if(gasto){

        if(gasto.scrollLeft > 0){
            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            });
        }
        else{
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            });
        }
        
    }

    if(e.target.closest('[data-accion="editar-gasto"]')){
        const id = gasto.dataset.id;

        const gastosGuardados =  JSON.parse(window.localStorage.getItem('gastos'));

        let precio = '', descripcion = '';

        if(gastosGuardados && gastosGuardados.length > 0){
            gastosGuardados.forEach(gasto => {
                if(gasto.id === id){
                    precio = gasto.precio;
                    descripcion = gasto.descripcion;
                }
            });


            document.querySelector('#formulario-gasto #descripcion').value = descripcion;
            document.querySelector('#formulario-gasto #precio').value = precio;
            document.querySelector('#formulario-gasto').dataset.id = id;
            
            abrirFormularioGasto('editarGasto');
        }
    }

    if(e.target.closest('[data-accion="eliminar-gasto"]')){
        const id = e.target.closest('.gasto')?.dataset?.id;

        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        if(gastosGuardados){
            const nuevosGastos = gastosGuardados.filter((gasto) => {
            
                if(gasto.id !== id){
                    return gasto;
                }

            });

            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));

        }

        cargarGastos();
        cargarTotalGastado();
    }
});