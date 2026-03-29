# Aplicacion de lista de tareas con Login

Proyecto esta trabajado el Front en angular y el back con node + express teniendo las siguientes funcionalidades:
1. login haciendo uso firebase authentication implentado directamente en angular y consumido a traves de un servicio.
2. lista de tareas se trabaja en el back con node + express y se guarda los datos en firestore. 

En este enlace: https://task-list-login.web.app encontrara la primera version del proyecto donde se realizaba ambas funcionalidades pero sin usar el back de node + express, todo se realizaba en angular utilizando firebase authentication y firestore. 

## Manual de usuario

Al acceder a la url lo primera que visualizara es la pagina de login.
<img width="756" height="759" alt="image" src="https://github.com/user-attachments/assets/b996de69-4d74-4743-ad08-31406c6eda13" />

Podra iniciar session con su cuenta de Google, Git o crear una cuenta.
<img width="618" height="854" alt="image" src="https://github.com/user-attachments/assets/87174593-c5d3-40c8-9fe8-1d6f04eb24b6" />

Al crear la cuenta o inciar session automaticamente lo enviara al dashboard de Task List. 
<img width="1906" height="942" alt="image" src="https://github.com/user-attachments/assets/c0759ce6-59da-47ee-a3f7-4a4b44b14916" />

En el dashboard visualizara dos botones:
1. Logout para salir o cerrar su session.
2. Boton con icono de + para agregar las tareas.

Al dar click el boton de + se levantara un modal o pop-up donde llenara los campos requeridos para la tarea.
<img width="1333" height="154" alt="image" src="https://github.com/user-attachments/assets/1c61eb79-5fee-4649-adc1-8e7a7b0169ce" />

Para guardar la tarea tiene que darle click al boton del chek y automaticamente se agregara al dashboard.
<img width="1901" height="922" alt="image" src="https://github.com/user-attachments/assets/e2f19a13-a7ae-47ac-a7ea-2a2761197430" />

Por defecto las tareas se crean como pendiente si desea cambiarlo a completado debera seleccionar la tarea y aplicara un tachado sobre el texto para 
mostrar visualmente el cambio a completado si desea cambiarlo a pendiente deseleccione la tarea.
<img width="1311" height="131" alt="image" src="https://github.com/user-attachments/assets/ff488a16-517a-4869-a842-810dd4e107bd" />

Para eliminar cualquier tarea agregada de click en el icono de la x que aparece en la parte derecha de la tarea.

## Descargar el proyecto y ejecutelo localmente

Si desea correr el proyecto localmente realice los siguiente.
1. Descargue o clone el proyecto a su maquina
2. En la carpeta raiz ejecute npm install para instalar todas las dependencias necesesarias
3. Ejecute localmente el proyecto usando el comando ng serve -o 
5. Descargue el proyecto localmente de node +  express y ejecutelo -> https://github.com/rivaldoa10/firebase-task-list-with-login-node-express
