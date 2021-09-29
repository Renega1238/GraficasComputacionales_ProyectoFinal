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

Una vez iniciado el juego el usuario tendra que recolectar los "n" _Pac-Dots_ que se encuentran en cada nivel en conjunto con los _Power-Pellets_ que le darán 10 sgundos para poder deborar  a los 4 fantasmas que son enemigos de pacman y estrán tras de él para poder matarlo.
  Pac-Dots: 10 pts  
  Power-Pellets: 50 pts
  Fantasmas: 200 pts

Cada que el usuario recolecte todos los _Pac-Dots_ y los _Power-Peletts_ de unn nivel se pasara al siguiente conservando su puntaje actual, el juego consta de 3 niveles para poder hacer todos los puntos posibles.

Que gane el Mejor

# * ¿Cuándo termina?
El juego puede cabar de dos maneras:
1. Deborado por un fantasma
    *Desde el inicio del juego hasta el final, los fantasmas estarán tras el jugador y en cuanto sea alcanzado por uno, el juego termina, le muestra su puntaje y el nivel alcanzado
2. Termianndo los 3 niveles
    *Si el jugador logra recolectar todos los _Pac-Dots_ y los _Power-Pellets_ del nivel 3, el juego terminá y se muestra el puntaje total alcanzado y se le muestra una pantalla de reconocimiento por haber termiando el juego

# * Niveles
El juego constará de tres niveles 
En todos los niveles habrá 244 _Pac-Dots_ y 4 _Power-Pellets_ que tienen que ser recolectados para poder pasar de nivel o en su defecto para terminar el juego

# * Fantasmas
Para el desarrollo de este videojuego se desarrollaran 4 fantasmas
  1. RENE que será de color Rojo
  2. BENJA que será de color Anaranjado
  3. MIKE que será de color Azul
  4. OCTAVIO que será de color Verde
Cada fantasma tendrá su propío recorrido en cada nivel y su velocidad irá aumentando de acuerdo con el nivel en el que se encuentren, para añadirle un toque extra de dificultad

# * GAME
El juego se vera desde una perspectiva de primera persona para darle un toque más inmersivo para el usuario, y se le apoyará con un mapa en la ventana superior izquerda para que pueda ver el mapa desde una perspectiva aerea en caso de que olvide donde le faltan _Pac-Dots_ o _Power-pellets_

El jugador tendrá solo una oportinidad/vida para poder completar los 3 niveles que componene el videojuego

El juego es continuo, por lo que no habrá opciones de pausa, una vez iniciado el juego se debe morir o terminar para poder regresar al menu principal


# * Pantallas

Al ser un juego, debe de ser interactivo con el usuario, al momento de iniciar una nueva partida, motivo por el cual se consideran las siguientes pantallas. 
## Inicio
![INICIO](/img/imgReadMe/INICIO.png)
## Start
![START](/img/imgReadMe/START.png)
## Vista de juego
![GameView](/img/imgReadMe/GameView.png)
## Game Over
![GameOver](/img/imgReadMe/GameOver.png)
