

require('colors');
const {guardarDB, leerDB}= require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput,listadoTareasBorrar,confirmar,mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas= require('./models/tareas');


//console.clear();

const main =async()=>{
    //console.log('Hola Mundo');
    //mostrarMenu();
    //pausa();
    let opt ='';
    const tareas= new Tareas();
    const tareasDB= leerDB();
    
    if (tareasDB){
        tareas.cargarTareasFromArray(tareasDB);

    }
    //await pausa();
    
    
    //console.log({opt});

    do{
        opt= await inquirerMenu();
        //console.log({opt});

        //const tarea =new Tarea('impremiendo tarea');
        //console.log(tarea);
         switch(opt){
             case '1':
                 const desc= await leerInput('Descripcion:');
                 tareas.crearTarea(desc);
             break;

             case '2':
                 tareas.listadoCompleto();
                 //console.log( tareas.listadoArr);
             break;
             case '3':
                 tareas.listarPendientesCompletadas(true);
                 //console.log( tareas.listadoArr);
             break;
             case '4':
                 tareas.listarPendientesCompletadas(false);
                 //console.log( tareas.listadoArr);
             break;

             case '5':
                 //tareas.listarPendientesCompletadas(false);
                 //console.log( tareas.listadoArr);
                const ids= await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
             break;


             case '6':
                   const id = await listadoTareasBorrar(tareas.listadoArr);
                   if(id !== '0'){
                       const ok = await confirmar('Estas Seguro?');
                       if (ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                       }
                   
                  //tareas.listarPendientesCompletadas(false);
                  //console.log({ok});
                  
                      }
              break;
         }


        guardarDB(tareas.listadoArr);
        
        
        
        await pausa();
        //if (opt !== '0') await pausa();
    } while (opt !=='0');
}
main();