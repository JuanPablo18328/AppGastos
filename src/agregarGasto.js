import { v4 as uuidv4 } from 'uuid';
import { cerrarFormularioGasto } from './eventoBtnFormularioGasto';
import cargarGastos from './cargarGastos';
import cargarTotalGastado from './cargarTotalGastado';

const formulario = document.querySelector('#formulario-gasto form');
const descripcion = formulario.descripcion;
const precio = formulario.precio;

const expRegDescripcion = /^[a-zA-Z0-9\_\- ]{4,30}$/;
const expRegPrecio = /^\d+(\.\d+)?$/;


const comprobarDescripcion = () => {
    if(!expRegDescripcion.test(descripcion.value)){
        descripcion.classList.add('formulario-gasto__input--error');

        formulario.descripcion
        .parentElement
        .querySelector('.formulario-gasto__leyenda')
        .classList.add('formulario-gasto__leyenda--active');

        return false;
    }else{
        descripcion.classList.remove('formulario-gasto__input--error');

        formulario.descripcion
        .parentElement
        .querySelector('.formulario-gasto__leyenda')
        .classList.remove('formulario-gasto__leyenda--active');
        return true;
    }
}

const comprobarPrecio = () => {
    if(!expRegPrecio.test(precio.value)){
        precio.classList.add('formulario-gasto__input--error');

        formulario.precio
        .parentElement
        .querySelector('.formulario-gasto__leyenda')
        .classList.add('formulario-gasto__leyenda--active');

        return false;
    }else{
        precio.classList.remove('formulario-gasto__input--error');

        formulario.precio
        .parentElement
        .querySelector('.formulario-gasto__leyenda')
        .classList.remove('formulario-gasto__leyenda--active');
        return true;
    }
}

descripcion.addEventListener('blur', (e) => comprobarPrecio());

descripcion.addEventListener('keyup', (e) => {
    if([...e.target.classList].includes('formulario-gasto__input--error')){
        comprobarDescripcion();
    }
});

precio.addEventListener('blur', (e) => comprobarPrecio());

precio.addEventListener('keyup', (e) => {
    if([...e.target.classList].includes('formulario-gasto__input--error')){
        comprobarPrecio();
    }
});

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();

    const modo = formulario.closest('#formulario-gasto')?.dataset?.modo;
    
    if(comprobarDescripcion() && comprobarPrecio()){
        const nuevoGasto = {
            id: uuidv4(),
            fecha: new Date(),
            descripcion: descripcion.value,
            precio: precio.value,
        };

        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        if(modo === 'agregarGasto'){
            
            if(gastosGuardados){
                const nuevosGastos = [...gastosGuardados, nuevoGasto];
                window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
            }else{
                window.localStorage.setItem('gastos', JSON.stringify(
                    [
                        {...nuevoGasto}
                    ]
                ));
            }
        } else if (modo === 'editarGasto'){
            const id = document.getElementById('formulario-gasto').dataset?.id;

            let indexGastoAEditar;

            if(id && gastosGuardados){
                gastosGuardados.forEach((gasto, index) => {
                    if(gasto.id === id){
                        indexGastoAEditar = index;
                    }
                });
            }

            const nuevosGastos = [...gastosGuardados];

            nuevosGastos[indexGastoAEditar] = {
                ...gastosGuardados[indexGastoAEditar],
                descripcion: descripcion.value,
                precio: precio.value
            }

            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
        }

        descripcion.value = '';
        precio.value = '';

        cargarGastos();
        cerrarFormularioGasto();
        cargarTotalGastado();

    }
});