# Práctica "Quick start Remix"

- Basado en: [Remix Tutorial]([https://remix.run/docs](https://remix.run/docs/en/main/start/tutorial))

### Instalación de dependencias

Una vez clonado el proyecto, abrir en el editor de código de preferencia y desde la terminal ingresar el siguiente comando para instalar las dependencias necesarias:

```sh
npm install
```
### Arrancar el Proyecto.

Una vez instaladas las dependencias, ingresar el siguiente comando para arrancar el proyecto:

```sh
npm run dev
```
Cuando estés visualizando el proyecto en el navegador (por lo general en el enlace: http://localhost:5174/), se podrá ver una lista de aves en el panel de navegación. Al darle click a cada nombre, obtendrás más información acerca de cada una de estas aves. 

También podrás ingresar nuevas aves al darle click al botón "New", ingresando los datos solicitados. Además, puedes editar o eliminar las aves que desees, con los botones correspondientes: "Edit", "Delete", puedes incluso buscar alguna ave en particular en la barra "Search" o seleccionar tus aves favoritas en el ícono en forma de estrella al lado del nombre.

## Conceptos claves

### Links:
El componente Links permite ingresar todos los enlaces de estilos en un sólo objeto y luego ser cargados al head a través de su etiqueta correspondiente.

### Loaders: 
El loader es una función que permite extraer información de un enlace o api y retornar esta información para usarla en la página. Normalmente, esta función se ejecuta antes que se renderice el componente, por lo cual se asegura que la información esté lista para usarse. En el loader se ingresa el parámetro {params} con el cual podemos acceder a los elementos del json devuelto. La información devuelta es por el loader se puede cargar en el componente a través del hook useLoaderData.

### Rutas dinámicas:
Las rutas dinámicas son rutas que incluyen partes dinámicas en sus path, y estas partes pueden ser usadas para extraer data o para renderizar diferentes componenetes de acuerdo a esa data.

### Rutas anidadas:
Las rutas anidadas son aquellas que permiten establecer esquemas jerárquicos a través de la creación de directorios, lo cual permite compartir componentes en diferentes partes de la app. 

### Componente Outlet:
El componente Outlet permite renderizar un componente hijo en la parte correspondiente (donde se haya puesto la etiqueta Outlet) en el padre. Esto lo hace cuando se la ruta hija hace match con la indicada en el padre. Es un comportamiento muy conveniente, pues no es necesario renderizar el resto de la página para sólo cambiar una parte de esta. 

### Action
El Action se utiliza para manejar solicitudes POST, PUT y DELETE. Es similar a la función loader, pero en lugar de obtener datos para renderizar una página, se utiliza para manejar la lógica del lado del servidor cuando se envía un formulario o se realiza una acción que modifica datos.

###Loader
El loader es una función que se utiliza para cargar datos del lado del servidor antes de que se renderice una ruta. La función loader se ejecuta en el servidor y permite obtener datos necesarios para la página, como información de una base de datos, una API, o cualquier otra fuente de datos. Estos datos se pasan al componente de la ruta a través del hook useLoaderData.

###useLoaderData
El useLoaderData es un hook que se utiliza para acceder a los datos que han sido cargados por la función loader de una ruta. Este hook permite que los componentes de React obtengan los datos que fueron pre-cargados en el servidor antes de que la página se renderice en el cliente.

###useActionData
El hook useActionData se utiliza para acceder a los datos que han sido devueltos por la función action de una ruta. Este hook permite que los componentes de React obtengan los datos que fueron procesados y devueltos por la función action después de que se haya enviado un formulario o se haya realizado una acción que modifica datos.

###Invariant
invariant es una función de utilidad que se utiliza para verificar condiciones y lanzar errores si esas condiciones no se cumplen. Es una forma de asegurar que ciertas condiciones sean verdaderas antes de continuar con la ejecución del código. Si la condición no se cumple, invariant lanzará un error con un mensaje específico.
