# proyectoIntegrador

La idea del trabajo integrador será una app para jugar al "Dígalo con Mímica".
El programa contará con una lista de películas. Asignará una de ellas, de forma aleatoria, a cada equipo al llegar su turno. Al jugador que le toque del equipo en turno, deberá interpretar con mímica (sin hablar ni hacer ruidos o sonidos) la película asignada para que el resto de los integrantes de su equipo adivinen su nombre. Luego será el turno del siguiente equipo. El equipo que más películas adivine en el tiempo pactado entre los equipos será el ganador.

# desafioEntregable 4
Se incorpora 'fetch' al proyecto. Se genera una lista de 250 películas a partir de la API de IMDb. El proyecto tuvo grandes cambios de estilos, diseño y funcionalidad respecto a la última entrega. Muy próximo a la entrega final del proyecto.

# desafíoComplentario 4 | desafíoEntregable 3
Se incorporan al proyecto el operador NULLISH COALESCING y el operador lógico AND en el archivo 'movieList.js'.
También se incoporan alertas con la librería SweetAlert2 para mostrar un mensaje de error cuando el ususario intenta agregar una película vacía o cuando la misma ya existe en la base de datos.

# segundaEntrega Proyecto Final

La aplicación ya interactuaba con el DOM y detectaba eventos. Para esta entrega se incorpora la utilización de JSON y Storage, aplicado a la lista de películas 'movieList'. La lista se guarda en localStorage y cada vez que el programa la necesita, la capta y trabaja con una copia. Se crea una función 'serializer' que transforma el arreglo 'movieList' captado de local storage en un arreglo de objetos de clase 'Movie'. Esto para recuperar las propiedades y métodos de la clase 'Movie'.
También se trabajó sobre la app para darle mejor estilos y mejorar el código de forma genérica. Se incorpora un Modal para dar mensaje de error al usuario si intenta agregar una película con nombre vacío.

# desafíoEntregrable 2

Sin modifaciones.

# desafíoComplementario 3

La entrega anterior (primeraEntrega PF) ya cumplía con la consiga. Lo que se hizo fue incorporar Bootstrap 5 al proyecto para empezar a interactuar con las librerías y que el entorno quede más prolijo.

# primeraEntrega Proyecto Final

Para cumplir con la entrega, la funcionalidad general del simulador está bastante avanzada. Existe un set de películas creadas y el usario dispone de un botón 'Buscar' para seleccionar una película de forma aleatoria. Además, puede interactuar con las películas de forma de agregar, eliminarlas o simplemente visualizarlas. Algunas cosas implementadas:
1. La lista de películas se presenta ordenada alfabéticamente, haciendo uso del método array.sort()
2. Se utiliza el método array.filter() para generar un array 'genderMovies' con películas de un género específico.
3. El género en cuestión se selecciona de forma aleatoria, utilizando Math().random()
4. Del array resultante, se selecciona nuevamente una película aleatoria y esa es la película que se le presenta al usuario cuando hace click en 'Buscar'

# desafíoComplementario 2

Para cumplir con el desafío, se hizo uso de una clase 'Movie' y se creó un arreglo 'movieList', el cual almacena objetos tipo 'Movie'. Sobre el array 'movieList' se invocan los métodos 'push' y 'splice'.