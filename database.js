productos = []
categorias = []
categorias.push(new Category('Celulares & Accesorios', 'uuuuu', ['mdi', 'mdi-cellphone-android']))
categorias.push(new Category('PCs & Accesorios', 'uuuuu', ['mdi', 'mdi-desktop-classic']))
categorias.push(new Category('Artículos variados', 'uuuuu', ['mdi', 'mdi-package-variant-closed']))

//Oficiales
productos.push(new Product('Cable de red', categorias[1],
  '19 metros, Categoria 6 (Nuevo)',
  1, '', 'static/prod-img/cable.jpg', 0, 600))

productos.push(new Product('Targeta Gráfica', categorias[1],
  'ATI Raedeon HD 5450 1GB, DDR3, PCIe, HDMI, DVI-I, VGA\nMáxima resolucion de pantalla 2560 x 1600' +
  '\nVelocidad: 1600 MHz, Marca Chipset AMD',
  1, '', 'static/prod-img/targeta grafica.jpg', 0, 2600))

productos.push(new Product('Targeta Gráfica', categorias[1],
  '2 GB, Nueva (Sellada en caja)',
  1, '', 'static/prod-img/targeta2GB.jpg', 0, 4200))

productos.push(new Product('Adaptador Tipo C a Tipo A', categorias[1],
  'El tipo A es el USB común', 1, '',
  'static/prod-img/adaptadorC.jpg', 0, 250))

productos.push(new Product('Adaptador Tipo C a Tipo Micro USB', categorias[1],
  'El micro USB es el de los moviles no modernos', 1, '',
  'static/prod-img/adaptadorC-micro.jpg', 0, 250))

productos.push(new Product('Disco Duro', categorias[1], '2 TB Marca Seagate',
  1, '/ Seagate', 'static/prod-img/disco.jpg', 0, 6100,))

productos.push(new Product('Popsockets', categorias[0], 'Para el celular',
  1, '', 'static/prod-img/popsockets.jpg', 0, 100))

productos.push(new Product('Smartwatch', categorias[0], '', 1, '/ Y68',
  'static/prod-img/smart.jpg', 0, 2600))

productos.push(new Product('Micas', categorias[0], 'Micas para diferentes móviles',
  1, '', 'static/prod-img/mica.jpg', 0, 250))

productos.push(new Product('Audífonos', categorias[0], '', 1, 'J5',
  'static/prod-img/audifJ5.jpg', 0, 250))

productos.push(new Product('Audífonos', categorias[0], '', 1,
  'Redmi AirDots 2', 'static/prod-img/audifRedmi.jpg', 0, 1900))

productos.push(new Product('Cargador', categorias[0], '', 1,
  'Alcatel', 'static/prod-img/cargador.jpg', 0, 200))

productos.push(new Product('Cable HDMI', categorias[1], '', 1,
  '', 'static/prod-img/HDMI.jpg', 0, 200))

productos.push(new Product('Manillas AppleWatch', categorias[0], '42/44 MM', 1,
  '', 'static/prod-img/Awatch.jpg', 0, 525))

productos.push(new Product('Báscula Digital', categorias[2],
  'Peso máximo 150 kg', 1, '', ['static/prod-img/pesa.jpg'], 0, 3100))

productos.push(new Product('Funda AirPods', categorias[0],
  '', 1, '', ['static/prod-img/funda.jpg'], 0, 500))

productos.push(new Product('Funda para Celulares', categorias[0],
  '', 1, '', ['static/prod-img/cover.jpg'], 0, 250))

productos.push(new Product('Mica líquida', categorias[0],
  '', 1, '', ['static/prod-img/liquida.jpg'], 0, 225))

productos.push(new Product('Xiaomi Mi Band 5', categorias[0],
  '', 1, '', ['static/prod-img/xiaomiband.jpg'], 60, 3600))

productos.push(new Product('Xiaomi Mi Watch Lite', categorias[0],
  '', 1, '', ['static/prod-img/watchLite.jpg'], 120, 7500))

productos.push(new Product('Xiaomi Earbuds Basic 2', categorias[0],
  '', 1, '', ['static/prod-img/earbuds.jpg'], 0, 2300))

productos.push(new Product('Mause Gaming', categorias[1],
  'Inalámbrico 6D', 1, '', ['static/prod-img/mouse6D.jpg'], 30, 1800))

productos.push(new Product('Speaker Bluetooth', categorias[2],
  'Bocinas por Bluetooth', 1, '', ['static/prod-img/bocina.jpg'], 60, 3500))

productos.push(new Product('Fuente EVGA', categorias[1],
  'EVGA 80+ Bronce 600W', 1, '', ['static/prod-img/fuente.jpg'], 125,))

productos.push(new Product('HDD Externo', categorias[1],
  '8 TB', 1, '', ['static/prod-img/HDD.jpg'], 345,))

productos.push(new Product('Panel Frontal USB', categorias[1],
  '2 puertos USB 3.0 + 2 puertos USB 2.0', 1, '', ['static/prod-img/USB.jpg'], 35,))

productos.push(new Product('Cadena de plata', categorias[2],
  'Plata 925, peso 103 gramos, las letras son de oro\nPreguntar por el precio',
  1, '925', ['static/prod-img/cadena.jpg'], 0, 0, 1))

productos.push(new Product('Moto', categorias[0],
  'De poco uso, tiene un detalle en la esquina superior izquierda. Compatible con 2G y 3G',
  1, 'E4', ['static/prod-img/moto.jpg'], 0, 0, 1))

productos.push(new Product('Xiaomi', categorias[0],
  'Nuevo 2G / 3G / 4G',
  10, 'Redmi 9C', ['static/prod-img/9C.jpg'], 300, 19500, 1))

// productos.push(new Product('TEST', categorias[0],
//   'Nuevo 2G / 3G / 4G',
//   1, 'Redmi 9C', ['static/prod-img/9C.jpg', 'static/prod-img/moto.jpg', 'static/prod-img/cadena.jpg'],
//   300, 19500, 1))
