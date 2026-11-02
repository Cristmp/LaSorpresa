CREATE DATABASE lasorpresa;
use lasorpresa;

CREATE TABLE usuarios(
	id INT auto_increment,
    nombre varchar(100) NOT NULL,
    correo varchar(225) unique NOT NULL,
    contraseña varchar(255) NOT NULL,
    rol varchar(50) default 'user',
    fecha_registro TIMESTAMP DEFAULT current_timestamp,
    PRIMARY KEY (id)
);


CREATE TABLE Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

INSERT INTO Categorias (nombre) VALUES ('Cerámica');
INSERT INTO Categorias (nombre) VALUES ('Artesanía');
INSERT INTO Categorias (nombre) VALUES ('Decoración');
INSERT INTO Categorias (nombre) VALUES ('Del hogar');
INSERT INTO Categorias (nombre) VALUES ('Madera');
INSERT INTO Categorias (nombre) VALUES ('Metal');
INSERT INTO Categorias (nombre) VALUES ('Accesorios');
INSERT INTO Categorias (nombre) VALUES ('Vestimenta');
INSERT INTO Categorias (nombre) VALUES ('Barro');
INSERT INTO Categorias (nombre) VALUES ('Textil');
INSERT INTO Categorias (nombre) VALUES ('Cuero');
INSERT INTO Categorias (nombre) VALUES ('Cocina');

CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    oferta BOOLEAN DEFAULT FALSE,
    txt_oferta VARCHAR(50) NULL
);

INSERT INTO Productos (nombre_producto, descripcion, precio) VALUES ('Tarro de Barro','Hermoso tarro de barro para almacenar agua o decorar el hogar.','300.00');
INSERT INTO Productos (nombre_producto, descripcion, precio, oferta, txt_oferta) VALUES ('Llavero de baseball','Bola de baseball vieja, accesorio deportivo','35.00', '1','2x1');

INSERT INTO Productos (nombre_producto, descripcion, precio) VALUES ('Jarrones decorados','Jarrones decorados con diseños de naturaleza.','250.00');
INSERT INTO Productos (nombre_producto, descripcion, precio) VALUES ('Pequeño tarro de madera','Artesanías hechas a mano con madera, ideal para guardar condimentos.','120.00');
INSERT INTO Productos (nombre_producto, descripcion, precio, oferta, txt_oferta) VALUES ('Taza de madera','Hermosa taza hecha de madera con grabado de Nicaragua','160.00', '1', '3x1');
INSERT INTO Productos (nombre_producto, descripcion, precio) VALUES ('Caballo de madera','Pequeño caballo de madera para decorar el hogar.','160.00');
INSERT INTO Productos (nombre_producto, descripcion, precio) VALUES ('Cesta de frutas artificiales','Cesta mediana de frutas artificiales para adornar el comedor.','420.00');
INSERT INTO Productos (nombre_producto, descripcion, precio) VALUES ('Juego de bowls','Juego de bowls y cucharones de madera.','300.00');
INSERT INTO Productos (nombre_producto, descripcion, precio) VALUES ('Máscara del Güegüense','Máscara de madera de la obra El Güegüense.','260.00');
INSERT INTO Productos (nombre_producto, descripcion, precio, oferta, txt_oferta) VALUES ('Monedero estampado','Hermoso monedero estampado con diseño de atardecer en la playa.','60.00', '1', '2x1');
INSERT INTO Productos (nombre_producto, descripcion, precio) VALUES ('Bolso de mano','Pequeño bolso de mano de cuero.','220.00');

CREATE TABLE producto_categoria (
    producto_id INT,
    categoria_id INT,
    PRIMARY KEY (producto_id, categoria_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id) ON DELETE CASCADE
);


	-- Tarro de Barro
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('1', '3');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('1', '4');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('1', '10');

	-- Llavero de baseball
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('2', '8');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('2', '12');

	-- Jarrones decorados
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('3', '1');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('3', '4');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('3', '5');

	-- Tarro de madera
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('4', '3');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('4', '6');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('4', '13');

	-- Taza de madera
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('5', '3');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('5', '6');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('5', '13');

	-- Caballo de madera
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('6', '4');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('6', '5');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('6', '6');

	-- Cesta de frutas
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('7', '4');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('7', '6');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('7', '13');

	-- Juegos de bowls
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('8', '4');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('8', '6');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('8', '13');

	-- Máscara de Güegüense
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('9', '3');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('9', '6');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('9', '9');

	-- Monedero estampado
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('10', '8');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('10', '9');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('10', '11');

	-- Bolso de mano
    
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('11', '8');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('11', '9');
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES ('11', '12');


CREATE TABLE img_productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    url_img VARCHAR(500) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Productos(id) ON DELETE CASCADE
);

SELECT * FROM img_productos;
	-- Tarro de barro - IMG
    
INSERT INto img_productos (id_producto, url_img) VALUES ('1', 'https://i.ibb.co/FbYrGCDK/IMG-6273.webp');
INSERT INto img_productos (id_producto, url_img) VALUES ('1', 'https://i.ibb.co/1t7RWhQx/IMG-6291-1.webp');
INSERT INto img_productos (id_producto, url_img) VALUES ('1', 'https://i.ibb.co/gFBjTSxd/IMG-6294-1.webp');

	-- Llavero de baseball
INSERT INto img_productos (id_producto, url_img) VALUES ('2', 'https://i.ibb.co/xV1gBpH/IMG-6183.webp');
INSERT INto img_productos (id_producto, url_img) VALUES ('2', 'https://i.ibb.co/dNVWXB3/IMG-6184.webp');

	-- Jarrones decorados
INSERT INTO img_productos (id_producto, url_img) VALUES ('3', 'https://i.ibb.co/TxzhY7dt/IMG-6368.webp');
INSERT INTO img_productos (id_producto, url_img) VALUES ('3', 'https://i.ibb.co/twDC60LN/IMG-6369.webp');
INSERT INTO img_productos (id_producto, url_img) VALUES ('3', 'https://i.ibb.co/cSn59jqZ/IMG-6364.webp');


DELETE FROM img_productos WHERE id_producto = 3;

INSERT INTO img_productos (id_producto, url_img) VALUES ('4', 'https://i.ibb.co/Xk86G52V/IMG-6349.webp');
INSERT INTO img_productos (id_producto, url_img) VALUES ('4', 'https://i.ibb.co/1tQQQJFJ/IMG-6353.webp');
INSERT INTO img_productos (id_producto, url_img) VALUES ('4', 'https://i.ibb.co/zk3kwJk/IMG-6352.webp');

	-- Taza de Madera
INSERT INTO img_productos (id_producto, url_img) VALUES ('5', 'https://i.ibb.co/XfPBQdzG/IMG-6355.webp');
INSERT INTO img_productos (id_producto, url_img) VALUES ('5', 'https://i.ibb.co/cXvVP6PP/IMG-6357.webp');
INSERT INTO img_productos (id_producto, url_img) VALUES ('5', 'https://i.ibb.co/5gDSxV5G/IMG-6358.webp');

	-- Caballito de madera
    
INSERT INTO img_productos (id_producto, url_img) VALUES ('6', 'https://i.ibb.co/kgp383YM/IMG-6330.webp');
INSERT INTO img_productos (id_producto, url_img) VALUES ('6', 'https://i.ibb.co/zhpt4nJ6/IMG-6335.webp');
INSERT INTO img_productos (id_producto, url_img) VALUES ('6', 'https://i.ibb.co/xtwtPkbs/IMG-6333.webp');

-- Cesta de frutas artesanales

INSERT INTO img_productos (id_producto, url_img) VALUES ('7', 'https://i.ibb.co/ccxBRty9/IMG-6383.webp' );
INSERT INTO img_productos (id_producto, url_img) VALUES ('7', 'https://i.ibb.co/JWXWRxxq/IMG-6385.webp' );

-- Juego de bowls

INSERT INTO img_productos (id_producto, url_img) VALUES ('8', 'https://i.ibb.co/Rkkm8nrk/bowl.webp' );
INSERT INTO img_productos (id_producto, url_img) VALUES ('8', 'https://i.ibb.co/qYppc0jx/IMG-6192.webp' );

INSERT INTO img_productos (id_producto, url_img) VALUES ('9', 'https://i.ibb.co/7J9JkMMt/IMG-6270.webp' );
INSERT INTO img_productos (id_producto, url_img) VALUES ('9', 'https://i.ibb.co/Kxt4hF9H/IMG-6267.webp' );

INSERT INTO img_productos (id_producto, url_img) VALUES ('10', 'https://i.ibb.co/ycYCKG0r/IMG-6185.webp' );
INSERT INTO img_productos (id_producto, url_img) VALUES ('10', 'https://i.ibb.co/Q34ZW4xq/IMG-6186.webp' );

INSERT INTO img_productos (id_producto, url_img) VALUES ('11', 'https://i.ibb.co/B2R58zhW/IMG-6372.webp' );
INSERT INTO img_productos (id_producto, url_img) VALUES ('11', 'https://i.ibb.co/5xWjX5Xv/IMG-6371.webp' );

-- Tabla favoritos

CREATE TABLE Favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES Productos(id) ON DELETE CASCADE
);

-- Catálogo y productos personalizados

CREATE TABLE Color (
    idColor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    hex VARCHAR(7) NOT NULL
);

INSERT INTO Color (nombre, hex) VALUES ('Rojo', '#AF0000');
INSERT INTO Color (nombre, hex) VALUES ('Negro', '#000000');
INSERT INTO Color (nombre, hex) VALUES ('Azul', '#012BA1');
INSERT INTO Color (nombre, hex) VALUES ('Blanco', '#FAFAFA');
INSERT INTO Color (nombre, hex) VALUES ('Naranja', '#FF8E1C');
INSERT INTO Color (nombre, hex) VALUES ('Morado', '#6B29EE');

CREATE TABLE Tallas (
    idTalla INT AUTO_INCREMENT PRIMARY KEY,
    tallas VARCHAR(5) NOT NULL,
    precio_ad DECIMAL(10, 2) DEFAULT 0.00
);


INSERT INTO Tallas (tallas, precio_ad) VALUES ('S', '10.00');
INSERT INTO Tallas (tallas, precio_ad) VALUES ('M', '20.00');
INSERT INTO Tallas (tallas, precio_ad) VALUES ('L', '40.00');
INSERT INTO Tallas (tallas, precio_ad) VALUES ('XL', '60.00');
INSERT INTO Tallas (tallas, precio_ad) VALUES ('XXL', '80.00');

-- Tabla telas

CREATE TABLE Telas (
    idTelas INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio_ad DECIMAL(10, 2) DEFAULT 0.00
);

INSERT INTO Telas (nombre, precio_ad) VALUES ('Algodón', '50.00');
INSERT INTO Telas (nombre, precio_ad) VALUES ('Poliéster', '30.00');

-- productos base

CREATE TABLE Producto_personalizado (
    idProductoP INT AUTO_INCREMENT PRIMARY KEY,
    nombreP VARCHAR(225) NOT NULL,
    img_producto VARCHAR(500),
    precio DECIMAL(10, 2) NOT NULL
);

INSERT INTO Producto_personalizado (nombreP, img_producto, precio) VALUES ('Camisa de baseball', 'https://i.ibb.co/twz23BrS/A4-FFF5-F5-FB2-A-4-EBD-BFCE-321-E471-B5827.webp', '160.00');
INSERT INTO Producto_personalizado (nombreP, img_producto, precio) VALUES ('Camisetas', 'https://i.ibb.co/9HsnnpPL/Camiseta-Basic-Active-T-Clique-29038-color-35-rojo-min.jpg', '150.00');
INSERT INTO Producto_personalizado (nombreP, img_producto, precio) VALUES ('Chaquetas bordada', 'https://i.ibb.co/0Rc3y5TZ/487210059-1442752157059242-6852578238132183876-n.jpg', '350.00');
INSERT INTO Producto_personalizado (nombreP, img_producto, precio) VALUES ('Gorra', 'https://i.ibb.co/wZHQxRyP/77d6354a5fc04cd7eb6b5e015cded528.jpg', '120.00');

-- PEDIDOS Y DETALLES

CREATE TABLE Pedidos (
    idPedidos INT AUTO_INCREMENT PRIMARY KEY,
    Usuario INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(100) DEFAULT 'Pendiente',
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (Usuario) REFERENCES usuarios(id)
);

SELECT * FROM Pedidos;

-- DETALLES PEDIDO

CREATE TABLE detalles_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    id_color INT NOT NULL,
    id_talla INT NOT NULL,
    id_tela INT NOT NULL,
    nota_cliente VARCHAR(500),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(idPedidos) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES Producto_personalizado(idProductoP),
    FOREIGN KEY (id_color) REFERENCES Color(idColor),
    FOREIGN KEY (id_talla) REFERENCES Tallas(idTalla),
    FOREIGN KEY (id_tela) REFERENCES Telas(idTelas)
);

CREATE TABLE IF NOT EXISTS carrusel_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO carrusel_items (title, description, image) VALUES
('PULSERAS', 'Pulseras artesanales de hilo, nylon y macramé', 'https://i.ibb.co/zW4TJPzx/Macrame-pulcera.webp'),
('ARETES', 'Aretes artesanales de hilo y alambre', 'https://i.ibb.co/ZpGy367R/aretes.jpg'),
('LLAVEROS', 'Llaveros artesanales de hilo con figras de foami', 'https://i.ibb.co/CsXBkp8V/llavero-inicial-frambuesa.webp'),
('COLLARES', 'Collares artesanales de nylon y alambre', 'https://i.ibb.co/4ZkRR297/Collares.jpg');

CREATE TABLE Cursos (
    idCursos INT AUTO_INCREMENT PRIMARY KEY,
    nombre_curso VARCHAR(225) NOT NULL,
    descripcion VARCHAR(500),
    dificultad VARCHAR(150),
    id_creador INT NOT NULL,
    portada VARCHAR(500),
    duracion VARCHAR(255),
    lecciones VARCHAR(255),
    precio DECIMAL(10, 2),
    estado VARCHAR(255),
    FOREIGN KEY (id_creador) REFERENCES usuarios(id)
);

CREATE TABLE usuario_curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_curso INT NOT NULL,
    progreso INT DEFAULT 0,
    completado TINYINT(1) DEFAULT 0,
    fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES Cursos(idCursos) ON DELETE CASCADE
);

INSERT INTO Cursos (nombre_curso, descripcion, dificultad, id_creador, portada, duracion, lecciones, precio, estado) VALUES ('Crea la sorpresa', 'En este curso aprenderás mediante diferentes módulos, las distintas técnicas de bisutería para dar paso a tus primeras creaciones dentro del mundo de las artesanías. Aprenderás a usar distintas herramientas y materiales para crear piezas únicas.'
, 'Principiante', '1', 'https://i.ibb.co/9HQ3MvB6/Portada-curso-Mesa-de-trabajo-1-02.png', '4 horas', '18', '0.0', 'disponible');

INSERT INTO Cursos (nombre_curso, descripcion, dificultad, id_creador, portada, duracion, lecciones, precio, estado) VALUES ('Curso de pintura', 'Obtendrás las habilidades y técnicas necesarias para crear tus propias piezas creativas.'
, 'Dificil', '1', 'https://www.nicaraguadisena.com/wp-content/uploads/2021/07/TALLER-DE-PINTURA-4-1080x720.jpg', '8 horas', '13', '11.99', 'pago');

INSERT INTO Cursos (nombre_curso, descripcion, dificultad, id_creador, duracion, lecciones, estado) VALUES ('Decoración de interiores', 'Aprenderás a emplear distintas decoraciones en tu hogar para crear espacios agradables y hermosos.'
, 'Principiante', '1', '6 horas', '7', 'proximamente');

INSERT INTO Cursos (nombre_curso, descripcion, dificultad, id_creador, duracion, lecciones, estado) VALUES ('Curso de fotografía creativa', 'Descubre el arte de capturar imágenes únicas con tu teléfono o cámara profesional.'
, 'Avanzado', '1', '5 horas', '10', 'proximamente');


CREATE TABLE Medallas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_curso INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    url_img VARCHAR(500),
    FOREIGN KEY (id_curso) REFERENCES Cursos(idCursos) ON DELETE CASCADE
);


CREATE TABLE medallas_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_medalla INT NOT NULL,
    fecha_ganado DATETIME DEFAULT CURRENT_TIMESTAMP,
    desbloqueada BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_medalla) REFERENCES Medallas(id) ON DELETE CASCADE
);


INSERT INTO Medallas (id_curso, nombre, url_img) VALUES ('1', 'Principiante', 'https://i.ibb.co/Fqc2HV4w/Medalla-barro.png');
INSERT INTO Medallas (id_curso, nombre, url_img) VALUES ('1', 'Aprendiz', 'https://i.ibb.co/bjRX5qxy/Medalla-plata-v2.png');
INSERT INTO Medallas (id_curso, nombre, url_img) VALUES ('1', 'Veterano', 'https://i.ibb.co/BHGmypzq/Medalla-oro-v2.png');
INSERT INTO Medallas (id_curso, nombre, url_img) VALUES ('1', 'Avanzado', 'https://i.ibb.co/67mgfbF4/Medalla-Diamante-v2.png');

CREATE TABLE Videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    curso_id INT NOT NULL,
    titulo VARCHAR(225) NOT NULL,
    descripcion TEXT,
    video_url VARCHAR(255),
    pdf_url varchar(255),
    orden INT,
    FOREIGN KEY (curso_id) REFERENCES Cursos(idCursos) ON DELETE CASCADE
);

CREATE TABLE progreso_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    capitulo_id INT NOT NULL,
    completado BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_completado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (capitulo_id) REFERENCES Videos(id) ON DELETE CASCADE,
    -- Esto evita que un usuario tenga registros duplicados del mismo capítulo
    UNIQUE KEY unique_user_chapter (usuario_id, capitulo_id)
);

SELECT * FROM Videos;
SELECT * FROM progreso_usuarios;

INSERT INTO Videos (curso_id, titulo, descripcion, video_url, orden) VALUES ('1', 'introducción del curso', 'Introducción general al curso de bisuteria artesanal, conceptos básicos, expectativas del curso y ejes a realizar.',
 '/videos/video%20introductorio.mov', '1');
 
 INSERT INTO Videos (curso_id, titulo, descripcion, video_url, orden) VALUES ('1', 'Materiales', 'Introducción a los materiales generales para la creación de bisuteria y la importancia de una buena planeación al momento de crear accesorios',
 '/videos/video_materiales.mp4', '2');
 
 INSERT INTO Videos (curso_id, titulo, descripcion, video_url, pdf_url, orden) VALUES ('1', 'Pulsera de hilo', 'Video tutorial del paso a paso de cómo crear una pulsera hecha de hilo con técnica de macramé, materiales, técnica y acabados.',
 '/videos/video_pulseraHilo.mp4', '/Recursos/Recurso-interactivo-hilo.pdf', '3');
 
 INSERT INTO Videos (curso_id, titulo, descripcion, video_url, pdf_url, orden) VALUES ('1', 'Pulsera de nylon', 'Video tutorial que enseña el paso a paso de la creación de una pulsera de nylon, aprenderás la combinación de cuentas y dijes para la creación de diseños únicos.',
 '/videos/Pulsera_Nylon.mp4', '/Recursos/Recurso-interactivo-nylon.pdf', '4');
 
 INSERT INTO Videos (curso_id, titulo, descripcion, video_url, pdf_url, orden) VALUES ('1', 'Pulsera de alambre', 'Video tutorial que muestra el proceso de creación de una pulsera de alambre, se muestran los materiales, el proceso y la técnica para crear el accesorio.',
 '/videos/Pulseras_Alambre.mp4', '/Recursos/Recurso-interactivo-alambre.pdf', '5');
 
 
 -- Tabla de Preguntas (Relacionada 1 a Muchos con Capítulos)
CREATE TABLE preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    capitulo_id INT NOT NULL,
    enunciado TEXT NOT NULL,
    FOREIGN KEY (capitulo_id) REFERENCES Videos(id) ON DELETE CASCADE
);

-- Tabla de Opciones / Respuestas (Relacionada 1 a Muchos con Preguntas)
CREATE TABLE opciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta_id INT NOT NULL,
    opcion TEXT NOT NULL,
    correcta BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (pregunta_id) REFERENCES preguntas(id) ON DELETE CASCADE
);

SELECT * from preguntas;
SELECT * from opciones;


-- PREGUNTA 1
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (2, '¿Cuáles son los principales materiales que se utilizan?');
SET @p1 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p1, 'Papel, cartón y pintura', 0),
(@p1, 'Hilo, nylon y alambre', 1),
(@p1, 'Hilo de coser, botones y pega', 0),
(@p1, 'Madera, clavos y martillo', 0),
(@p1, 'Lana, pinchos y papel', 0);


-- PREGUNTA 2
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (2, '¿Por qué es importante elegir bien los materiales?');
SET @p2 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p2, 'Porque determina la resistencia, forma y diseño', 1),
(@p2, 'Porque todos los materiales dan el mismo resultado', 0),
(@p2, 'Porque evitamos utilizar elementos decorativos', 0),
(@p2, 'Ayuda a vender mejor los productos', 0),
(@p2, 'Ayuda a tener mejor resultado', 0);


-- PREGUNTA 3
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (2, '¿Cuál de los siguientes elementos se utilizan para decorar pulseras?');
SET @p3 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p3, 'Regla', 0),
(@p3, 'Pegamento', 0),
(@p3, 'Cuentas y dijes', 1),
(@p3, 'tela y cinta', 0),
(@p3, 'Barro', 0);


-- PREGUNTA 4
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (2, '¿Qué debemos hacer para obtener pulseras únicas?');
SET @p4 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p4, 'Combinar diferentes materiales', 1),
(@p4, 'Utilizar un solo material', 0),
(@p4, 'Evitar el uso de cuentas y dijes', 0),
(@p4, 'Combinar todos los materiales disponibles', 0),
(@p4, 'Contar los materiales disponibles', 0);


-- PREGUNTA 5
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (2, '¿Qué beneficio trae tener organizado nuestros materiales?');
SET @p5 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p5, 'Hace que las pulseras sean iguales', 0),
(@p5, 'Para no tener que comprar más', 0),
(@p5, 'Evita el tener que diseñar la pulsera', 0),
(@p5, 'Permite trabajar ordenadamente', 1),
(@p5, 'Para no desperdiciar materiales', 0);



INSERT INTO preguntas (capitulo_id, enunciado) VALUES (3, '¿Qué se necesita para las pulseras de hilo?');
SET @p1 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p1, 'Tijeras, cinta e hilo', 1),
(@p1, 'Cinta, pegamento y fuego', 0),
(@p1, 'Papel, regla y cutter', 0),
(@p1, 'Pinzas, alambre y cuentas', 0),
(@p1, 'Dijes, tijeras y cartón', 0);


-- PREGUNTA 2
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (3, '¿Qué es lo más importante de los materiales?');
SET @p2 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p2, 'Las tijeras', 0),
(@p2, 'La cinta', 0),
(@p2, 'El tipo de dije', 0),
(@p2, 'El espacio de trabajo', 0),
(@p2, 'El hilo', 1);


-- PREGUNTA 3
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (3, '¿Qué cosa actúa cómo el eje central en la pulsera?');
SET @p3 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p3, 'Una grapa', 0),
(@p3, 'El hilo maestro', 1),
(@p3, 'Un botón', 0),
(@p3, 'El último nudo', 0),
(@p3, 'Un trozo de cinta', 0);


-- PREGUNTA 4
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (3, '¿Cómo se llama el tipo de nudo para hacer la pulsera?');
SET @p4 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p4, 'Nudo triangular', 0),
(@p4, 'Nudo cruzado', 0),
(@p4, 'Nudo de 4', 1),
(@p4, 'Nudo cuadrado', 0),
(@p4, 'Nudo maestro', 0);


-- PREGUNTA 5
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (3, '¿Qué se hace para darle el ultimo acabado a la pulsera?');
SET @p5 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p5, 'Se le agrega pegamento', 0),
(@p5, 'Se hace un nudo muy apretado', 0),
(@p5, 'No se tiene que mover mucho', 0),
(@p5, 'Se quema un poco el nudo', 1),
(@p5, 'Se corta la pulsera', 0);


INSERT INTO preguntas (capitulo_id, enunciado) VALUES (4, '¿Qué debemos hacer para comenzar a crear la pulsera?');
SET @p1 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p1, 'Añadir las cuentas al nylon', 0),
(@p1, 'Comenzar por los dijes ante todo', 0),
(@p1, 'Quemar un poco el nylon', 0),
(@p1, 'Cerrar el nylon con un nudo al final', 1),
(@p1, 'Agregar más nylon', 0);


-- PREGUNTA 2
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (4, '¿Por qué debemos dejar unos centímetros de nylon al cortar?');
SET @p2 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p2, 'Para no desperdiciar tiempo midiendo', 0),
(@p2, 'Para que entren más cuentas', 0),
(@p2, 'Para tener suficiente material para trabajar', 1),
(@p2, 'Para que los dijes resaltent', 0),
(@p2, 'Para hacer la pulsera grande', 0);


-- PREGUNTA 3
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (4, '¿Qué puede suceder si mantenemos el nylon demasiado flojo?');
SET @p3 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p3, 'La pulsera se estira más', 0),
(@p3, 'La pulsera puede perder su forma', 1),
(@p3, 'La pulsera queda mejor', 0),
(@p3, 'la pulsera se puede romper', 0),
(@p3, 'La pulsera no queda atractiva', 0);


-- PREGUNTA 4
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (4, '¿Qué puede suceder si apretamos mucho el nylon?');
SET @p4 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p4, 'La pulsera queda muy pequeña', 0),
(@p4, 'La pulsera no te va a quedar', 0),
(@p4, 'La pulsera queda rigida y se rompe', 1),
(@p4, 'El diseño se daña', 0),
(@p4, 'La pulsera no va a ser atractiva', 0);


-- PREGUNTA 5
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (4, '¿Cuándo debemos comprobar el tamaño de la pulsera?');
SET @p5 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p5, 'Antes de realizar el cierre final', 1),
(@p5, 'Antes de colocar las cuentas', 0),
(@p5, 'Después del cierre final', 0),
(@p5, 'Al colocar las cuentas', 0),
(@p5, 'Al iniciar la pulsera', 0);


-- PREGUNTA 1
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (5, '¿Qué materiales necesitamos para realizar la pulsera?');
SET @p1 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p1, 'Hilo, aguja, tijeras y botones', 0),
(@p1, 'Papel, cartón y pegamento', 0),
(@p1, 'Alambre guaya, cuentas, dijes, argollas broches y pinzas', 1),
(@p1, 'Alambre, dijes y martillo', 0),
(@p1, 'Hilo, tijeras y cinta', 0);


-- PREGUNTA 2
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (5, '¿Para qué sirven las pinzas puntas redondas?');
SET @p2 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p2, 'Para cortas el alambre', 0),
(@p2, 'Para insertar las cuentas', 0),
(@p2, 'Para redondear los extremos del alambre', 1),
(@p2, 'Solo para sostener los materiales', 0),
(@p2, 'Para decorar', 0);


-- PREGUNTA 3
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (5, '¿Qué debemos hacer para equilibrar la pulsera?');
SET @p3 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p3, 'Mantener una buena distribución entre cuentas y los dijes', 1),
(@p3, 'Utilizar solo cuentas negras', 0),
(@p3, 'Colocar las estrellas en un extremo', 0),
(@p3, 'Colocar solo los aros', 0),
(@p3, 'No usar ningún elemento decorativo', 0);


-- PREGUNTA 4
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (5, '¿Cuándo debemos colocar el broche?');
SET @p4 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p4, 'Cuando ya no quepan más cuentas', 0),
(@p4, 'Cuando ya se nos terminen los aros', 0),
(@p4, 'No es necesario ponerlo', 0),
(@p4, 'Cuando la pulsera alcance el tamaño adecuado en la muñeca', 1),
(@p4, 'Solo hay que tener buen ojo', 0);


-- PREGUNTA 5
INSERT INTO preguntas (capitulo_id, enunciado) VALUES (5, '¿Qué debemos comprobar antes de dar por terminada la pulsera?');
SET @p5 = LAST_INSERT_ID();

INSERT INTO opciones (pregunta_id, opcion, correcta) VALUES 
(@p5, 'Que las uniones estén bien cerradas y el broche esté asegurado', 1),
(@p5, 'Que el diseño se mire bien', 0),
(@p5, 'Que las cuentas sean de varios colores', 0),
(@p5, 'Que los dijes sean variados', 0),
(@p5, 'Que sea lo más atractiva posible', 0);

-- (Opcional) Tabla para guardar el progreso o intentos del usuario
CREATE TABLE intentos_evaluacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    capitulo_id INT NOT NULL,
    puntaje INT NOT NULL,
    aprobado BOOLEAN NOT NULL,
    fecha_intento DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (capitulo_id) REFERENCES Videos(id) ON DELETE CASCADE
);