# GraficasComputacionales_ProyectoFinal
## Equipo 3
* David Benjamin Ruíz Salazar
* Miguel Ángel Hernández Maldonado
* René García Avilés 

### Proyecto 
1. Pacman en primera persona 
  
# * PACMAN 3D

El juego de pacman consiste en un plano 2D, en el cual nuestro personaje principal se encuentra recorriendo un laberinto, mientras recoge puntos y huye de fantasmas, los cuales 
alcanzarte te deboran al instante. Existen powerups con los cuales se puede invertir esta situación y Pacman es capaz de devorar a los fantasmas. 
Nuestra versión del juego será en 3D, con diferentes poderes. 
![Meme](/img/imgReadMe/blackh.jpg)

# * ¿Cómo jugar?

Una vez iniciado el juego el usuario tendra que recolectar los "n" _Pac-Dots_ que se encuentran en cada nivel en conjunto con los _Power-Pellets_ 

  Pac-Dots: 10 pts
  
  Power-Pellets: 50 pts
  
El juego cosniste en recolectar la mayor cantidad de _Pac-Dots_ y de _Power-Pellets_ antes de ser deborado por un fantasma.

Que gane el Mejor

# * ¿Cuándo termina?
El juego puede cabar de dos maneras:
1. Deborado por un fantasma

    *Desde el inicio del juego hasta el final, los fantasmas estarán tras el jugador y en cuanto sea alcanzado por uno, el juego termina, le muestra su puntaje y el nivel alcanzado, para volver a jugar se le debe de dar refresh a la página
2. Recolectando todos los _Pac-Dots_ y todos los _Power-Pellets_

    *Si el jugador logra recolectar todos los _Pac-Dots_ y los _Power-Pellets_ del nivel, el juego terminá y se muestra el puntaje total alcanzado y para volver a jugar se le da refresh a la página

# * Niveles
El juego constará de un solo nivel
En el nivel habrá 244 _Pac-Dots_ y 4 _Power-Pellets_ que tienen que ser recolectados para poder terminar el juego

# * Fantasmas
Para el desarrollo de este videojuego se desarrollaran 4 fantasmas
  1. RENE que será de color Rojo
  2. BENJA que será de color Amarillo
  3. MIKE que será de color Azul
  4. OCTAVIO que será de color Verde

Cada fantasma tendrá su propío recorrido en cada nivel y su velocidad irá aumentando para añadirle un toque extra de dificultad

# * GAME
El juego se vera desde una perspectiva de primera persona para darle un toque más inmersivo para el usuario.

El juego es continuo, por lo que no habrá opciones de pausa, una vez iniciado el juego se debe morir o terminar.

# * Pantallas

Al ser un juego, debe de ser interactivo con el usuario, al momento de iniciar una nueva partida, motivo por el cual se consideran las siguientes pantallas. 

## Vista de juego
![GameView](/img/imgReadMe/GameView.png)
## Game Over
![GameOver](/img/imgReadMe/GameOver.png)

# * Diseño de niveles y ambiente

Como se puede apreciar en la imágenes anteriores el juego tendrá una estética similar a la del primer Pac-Man utilizando el color azúl para definir los segmentos superiores e inferiores de las paredes. Los _Pac-Dots_ serán de color amarillo y emitirán una ligera cantidad de luz.

En cuanto a la estructura del nivele se definirán a partir de un documento de texto.

# * Controles

Se utilizará el teclado y el mouse para navegar el laberinto, cabe aclarar que el movimiento solo es en dos ejes.
Se utilizará el siguiente esquema:

Flecha Arriba - Mover hacia adelante
Flecha Izquierda - Mover hacia la izquierda
Flecha Abajo - Mover hacia atrás
Flecha Derecha - Mover hacia la derecha

Mouse - Rotación de la cámara en primera persona



