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
