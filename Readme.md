# Nombre:
André Oscco Carbajal


 #  PREGUNTAS
<!-- Como has visto, la llamada que has implementado para obtener las
películas que están en cartelera puede recibir un parámetro “page”. No es
objeto de esta prueba implementar paginación, pero si tuvieses que
hacerlo, ¿puedes explicar cómo lo harías en la aplicación y en el backend? -->

----> Sería una buena implementación poder poner parametro "page", ya que ayudaría mucho
a la rápidez del uso de la web y también mejoraría en UX / UI.
Si tuviese que hacerlo, lo haría por parte del servidor, para que vaya enviando la 
información en pocas cantidades  y utilizaría AJAX para evitar el recargo de la 
página.


<!-- Si tuvieses que manejar un Array con 7 millones de películas, y necesitas
eliminar aquellas en las que el atributo vote_average no supera el valor 6,
¿cómo lo harías? Justifica tu respuesta teniendo en cuenta el rendimiento. -->

--> Lo que yo haría sería un filtrado, sería más eficiente porque solo recorre
el array una vez y crea un nuevo array que contiene los datos que cumplen con la
condición del filtrado.

const filteredMovies = movies.filter(movie => movie.vote_average >= 6);
# -----


# Librerías.
    Framework Backend: Express con Nodemon
     (Para recargar automáticamente sin tener que volver a ejecutar el servidor.) 
     Mongoose: para la conexión con la BBDD: MongoDB

    Framework Fronted: Angular versión 15
    Framework diseño o css: Bootstrap (Para facilitar diseño en componentes)



# Problemas: 
  No fue un problema pero tuve que buscar e indagar sobre Autenticación y validación mediante
  Tokens JWT 

# Modelo Entidad Relación diseñado en un diagrama: 
  No utilicé una BBDD relacional, utilicé MongoDB (Mongoose)