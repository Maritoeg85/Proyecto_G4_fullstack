-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 03-12-2023 a las 11:58:35
-- Versión del servidor: 10.5.21-MariaDB-0+deb11u1
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `udinese`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `ingredientes` text NOT NULL,
  `precio` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT 0,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `categoria`, `ingredientes`, `precio`, `cantidad`, `imagen`) VALUES
(1, 'Prosciutto e Rucola', 'Deléitate con la combinación perfecta de tomates secos', 'Pizzas', 'Salsa de tomate, Mozzarella, Rúcula fresca, Jamón crudo, Tomates secos', 4000, 0, './img/pizzas/1.jpg'),
(2, 'Veggie Mediterránea', 'Esta combinación de ingredientes seguro te encantara', 'Pizzas', ' Salsa de tomate, Mozzarella, Calabacín, Berengenas, Tomates Cherrys, Aceitunas Negras, Oregano', 3300, 0, './img/pizzas/2.jpg'),
(3, 'Fugazzeta', 'Esta combinación de ingredientes seguro te gustara', 'Pizzas', 'Salsa de tomate, Mozzarella, Cebollas, Tomates Cherrys, Aceitunas Negras, Oregano', 3500, 0, './img/pizzas/3.jpg'),
(4, 'Alemana', 'Esta combinación de ingredientes seguro seria para ti la indicada', 'Pizzas', 'Salsa de tomate, Mozzarella, Cebollas, Salame piamontes, Provenzal', 3700, 0, './img/pizzas/4.jpg'),
(5, 'Panceta y Jalapeños', 'Esta combinación de ingredientes seguro es la que estabas buscando', 'Pizzas', 'Salsa de tomate, Mozzarella, Cebolla morada, Jalapeños verdes, Panceta, Rúcula fresca', 4000, 0, './img/pizzas/5.jpg'),
(6, '4 Quesos', 'Esta combinación de ingredientes es un clasico de la región italiana', 'Pizzas', 'Salsa de tomate, Mozzarella, Cebollas, Queso fresco, Queso Roquefort, Queso Gruyere, Oregano', 3900, 0, './img/pizzas/6.jpg'),
(7, 'Peperoni', 'Esta combinación de ingredientes se convertirá sin duda en uno de tus favoritos', 'Pizzas', 'Salsa de tomate, Mozzarella, Peperoni, Cebolla, Tomates secos', 4000, 0, './img/pizzas/7.jpg'),
(8, 'Gaseosa Coca-Cola', 'Gaseosa Coca-Cola x 2', 'Gaseosas', '', 1200, 0, './img/Gaseosa-Coca-Cola-225L.png'),
(9, 'Gaseosa Sprite', 'Gaseosa Sprite x 2', 'Gaseosas', '', 1100, 0, './img/Gaseosa-Sprite-225L.png'),
(10, 'Cerveza Brahma', 'Cerveza Brahma x 1 Lt.', 'Cervezas', '', 900, 0, './img/Cerveza-Brahma-1lt.png'),
(11, 'Cerveza Quilmes', 'Cerveza Quilmes clásica x 1 Lt.', 'Cervezas', '', 900, 0, './img/Cerveza-Quilmes-1lt.png'),
(12, 'Cerveza Stella', 'Cerveza blanca Stella Atrois x 1 Lt.', 'Cervezas', '', 1100, 0, './img/Cerveza-Stella-1lt.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
