const ul_sidebar = document.querySelector('#ul-sidebar')
let printProducts = async (d, productos, side = true, categorias = categorias) =>
    categorias.forEach(e => {
      if (side) {
        //Modificando el sidebar
        let li = d.createElement('li')
        li.classList.add('nav-item')
        let a = d.createElement('a')
        a.rel = 'cate'
        a.style.cursor = 'pointer'
        a.classList.add('nav-link', 'cate', 'd-none')
        let i = d.createElement('i')
        i.classList.add('nav-icon', 'text-white', 'tema')
        e.icon.forEach(icon => i.classList.add(icon))
        let p = d.createElement('p')
        p.innerText = e.name
        a.appendChild(i)
        a.appendChild(p)
        li.appendChild(a)
        ul_sidebar.appendChild(li)

        //Modificando el footer modo movil
        let ul_footer = d.querySelector('#ul_footer'),
          fli = d.createElement('li'),
          fa = d.createElement('a'),
          fi = d.createElement('i'),
          fsmall = d.createElement('small'),
          fspan = d.createElement('span')
        fli.classList.add('d-inline-block')
        fa.classList.add('btn', 'pl-1', 'pr-1', 'border-0', 'pb-0', 'pt-0', 'w-h', 'text-nowrap')
        fa.rel = 'fcate'
        e.icon.forEach(icon => fi.classList.add(icon))
        fi.classList.add('d-block', 'mdi-24px', 'tema')
        fsmall.style.color = '#c2c7d0'
        fsmall.innerText = e.name.length > 9 ? e.name.slice(0, 9) + '...' : e.name
        fspan.classList.add('d-none')
        fspan.innerText = e.name
        ul_footer.appendChild(fli)
        fli.appendChild(fa)
        fa.appendChild(fi)
        fa.appendChild(fsmall)
        fa.appendChild(fspan)

        a.addEventListener('click', () => {
          document.querySelector('#container').style.display = 'none'
          d.querySelectorAll('a[rel="cate"]').forEach(e => e.classList.remove('active'))
          a.classList.add('active')
          d.querySelectorAll('a[rel="fcate"]').forEach(e => e.classList.remove('bg-gradient-dark'))
          d.querySelectorAll('a[rel="fcate"]').forEach(e => {
            if (e.children[e.children.length - 1].innerText === p.innerText)
              e.classList.add('bg-gradient-dark')
          })
          d.querySelector('a[rel="todos"]').classList.remove('active')
          d.querySelector('a[rel="ftodos"]').classList.remove('bg-gradient-dark')
          let categoria = categorias.filter(g => g.name === p.innerText)
          d.querySelector('#container').innerHTML = ''
          printProducts(d, productos, false, categoria)
          document.getElementById('container').style.display = 'block'
        })

        fa.addEventListener('click', () => {
          document.querySelector('#container').style.display = 'none'
          d.querySelectorAll('a[rel="fcate"]').forEach(e => e.classList.remove('bg-gradient-dark'))
          fa.classList.add('bg-gradient-dark')
          d.querySelectorAll('a[rel="cate"]').forEach(e => e.classList.remove('active'))
          d.querySelectorAll('a[rel="cate"]').forEach(e => {
            if (e.children[e.children.length - 1].innerText === fspan.innerText)
              e.classList.add('active')
          })
          d.querySelector('a[rel="ftodos"]').classList.remove('bg-gradient-dark')
          d.querySelector('a[rel="todos"]').classList.remove('active')
          let categoria = categorias.find(g => g.name === fspan.innerText)
          d.querySelector('#container').innerHTML = ''
          printProducts(d, productos, false, [categoria])
          document.getElementById('container').style.display = 'block'
        })
      }
      //Creando cards con el body
      let pro = productos.filter(f => f.category.name === e.name)
      if (!pro) return

      pro.sort((a, b) => a.pioridad - b.pioridad)
      let cate = d.createElement('h4')
      cate.classList.add('my-h4', 'cate', 'px-4')
      cate.innerText = e.name
      let container = d.querySelector('#container')
      container.appendChild(cate)
      let div1 = d.createElement('div')
      div1.classList.add('card-deck-wrapper')
      let div2 = d.createElement('div')
      div2.classList.add('card-deck', 'text-black-50')
      div1.appendChild(div2)
      container.appendChild(div1)

      pro.forEach(g => div2.innerHTML += g.card())
    }),
  temaDefault = d => {
    let div = d.createElement('div')
    div.classList.add('mt-3', 'mb-3')
    div.style.borderTop = '1px solid #4f5962'
    ul_sidebar.appendChild(div)
    let li = d.createElement('li')
    li.classList.add('nav-item')
    ul_sidebar.appendChild(li)
    let a = d.createElement('a')
    a.rel = 'tema'
    a.classList.add('nav-link')
    a.style.cursor = 'pointer'
    li.appendChild(a)
    let i = d.createElement('i')
    i.classList.add('nav-icon', 'mdi', 'mdi-weather-night', 'text-white', 'tema')
    a.appendChild(i)
    a.appendChild(d.createElement('p'))

    //Pastillas
    let divSwitch = d.createElement('div'),
      inputSwitch = d.createElement('input'),
      labelSwitch = d.createElement('label')
    divSwitch.classList.add('right',
      'custom-switch', 'custom-switch-off-navy', 'custom-switch-on-primary', 'ml-3')
    inputSwitch.type = 'checkbox'
    inputSwitch.classList.add('custom-control-input')
    inputSwitch.id = 'temaSwitch'
    labelSwitch.classList.add('custom-control-label')
    labelSwitch.htmlFor = 'temaSwitch'
    a.appendChild(divSwitch)
    divSwitch.appendChild(inputSwitch)
    divSwitch.appendChild(labelSwitch)
    Array.from(a.children).find(e => e.tagName === 'P').innerHTML = 'Modo oscuro'
  },
  cambiarTema = (d,) => {
    d.querySelector('a[rel="tema"]').children[0].classList.remove(
      'mdi-weather-night', 'mdi-weather-sunny', 'text-white', 'text-black-50')

    let icon = localStorage.getItem('tema') ===
    'Modo oscuro' ? ['mdi-weather-sunny',] : ['mdi-weather-night', 'text-white']
    let text = localStorage.getItem('tema') ===
    'Modo oscuro' ? 'Modo claro' : 'Modo oscuro'

    icon.forEach(e => d.querySelector('a[rel="tema"]').children[0].classList.add(e))
    d.querySelector('a[rel="tema"]').children[1].innerText = text

    d.querySelector('aside.main-sidebar').classList.remove('sidebar-dark-navy', 'sidebar-light-primary')
    d.querySelector('nav.main-header').classList.remove('navbar-navy', 'navbar-primary')
    d.querySelectorAll('i.tema').forEach(e => e.classList.remove('text-white'))
    d.querySelector('a.brand-link').classList.remove('navbar-navy', 'navbar-primary')
    d.querySelectorAll('footer.main-footer').forEach(e => e.classList.remove('bg-navy', 'bg-primary'))
    d.querySelector('div.content-wrapper').classList.remove('bg-black-2', 'bg-gray-light')
    d.querySelectorAll('div.prod-card').forEach(e =>
      e.classList.remove('bg-navy', 'w3-hover-shadow-light', 'w3-hover-shadow'))
    d.querySelector('div.modal-header').classList.remove('bg-navy', 'bg-primary')
    if (text === 'Modo claro') {
      d.querySelector('aside.main-sidebar').classList.add('sidebar-light-primary')
      d.querySelector('nav.main-header').classList.add('navbar-primary')
      d.querySelectorAll('.ffooter ul li a i').forEach(e => e.classList.add('text-white'))
      d.querySelector('a.brand-link').classList.add('navbar-primary')
      d.querySelector('footer.ffooter').classList.add('bg-primary')
      d.querySelector('div.content-wrapper').classList.add('bg-gray-light')
      d.querySelector('div.modal-header').classList.add('bg-primary')
      d.querySelectorAll('div.prod-card').forEach(e => e.classList.add('w3-hover-shadow'))
    } else {
      d.querySelector('aside.main-sidebar').classList.add('sidebar-dark-navy')
      d.querySelectorAll('i.tema').forEach(e => e.classList.add('text-white'))
      d.querySelector('nav.main-header').classList.add('navbar-navy',)
      d.querySelector('a.brand-link').classList.add('navbar-navy')
      d.querySelector('footer.main-footer').classList.add('bg-navy',)
      d.querySelector('footer.ffooter').classList.add('bg-navy',)
      d.querySelector('div.content-wrapper').classList.add('bg-black-2')
      d.querySelector('div.modal-header').classList.add('bg-navy')
      d.querySelectorAll('div.prod-card').forEach(e => e.classList.add('bg-navy', 'w3-hover-shadow-light'))
    }
  },
  efectoTema = d => {
    d.querySelector('aside').style.display = 'none'
    d.querySelector('nav.main-header').style.display = 'none'
    d.querySelector('.ffooter').style.display = 'none'
    //algo aki
    d.querySelector('aside').style.display = 'block'
    d.querySelector('nav.main-header').style.display = 'flex'
    d.querySelector('.ffooter').style.display = 'block'
  },
  removeAcents = str => {
    const acents = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ñ: 'n' }
    return str.split('').map(e => acents[e] || e).join('').toString()
  },
  Alerta = (text, icon = 'success') => {
    const Alerta = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    })
    Alerta.fire({
      icon: icon,
      title: text
    })
  },
  truncate = (str, len, end = '..') =>
    str.replace(new RegExp('(.{' + len + '}).*'), '$1' + end + '')

;
((d) => {

  window.addEventListener('load', () =>
    temaDefault(d), printProducts(d, productos, true, categorias),
  )

  d.querySelectorAll('a[rel=modal]').forEach(e =>
    e.addEventListener('click', () => $('#links1').modal('show')))

  $('.btn-close').on('click', () => $('.modal').modal('hide'))

  d.querySelector('a[rel="servicios"]').addEventListener('click', () =>
    console.log())

  //Buscando en tiempo real
  d.querySelector('form input').addEventListener('input', function () {

    let catActual = Array.from(document.querySelectorAll('a[rel="cate"]')).find(e =>
      e.classList.value.includes('active'))
    catActual = catActual !== undefined ? categorias.filter(e =>
        e.name === catActual.children[catActual.children.length - 1].innerText)
      : catActual = categorias

    setTimeout(() => {
      let filro = productos.filter(e =>
        e.name.toLowerCase().includes(this.value.toLowerCase()) ||
        e.model.toLowerCase().includes(this.value.toLowerCase()))

      d.querySelectorAll('div.div-card span').forEach(f => {
        let str = removeAcents(f.innerText.toLowerCase())
        if (!str.includes(this.value.toLowerCase())) {
          f.parentElement.classList.remove('d-md-inline-block', 'd-sm-inline-block')
          f.parentElement.classList.add('d-none')

        } else {
          f.parentElement.classList.add('d-md-inline-block', 'd-sm-inline-block')
          f.parentElement.classList.remove('d-none')
        }
      })
      // d.querySelector('#container').innerHTML = ''
      // printProducts(d, filro, false, catActual)
    }, 250)

  })

  //Configurando el tema de la pagina
  window.addEventListener('load', () => {
    d.querySelector('#temaSwitch').checked = localStorage.getItem('tema') === 'Modo oscuro'

    d.querySelector('#temaSwitch').addEventListener('change', function () {
      let a = d.querySelector('a[rel="tema"]')
      localStorage.setItem('tema', a.children[a.children.length - 2].innerText)
      cambiarTema(d,)
    })
    d.querySelector('a[rel="tema"]').addEventListener('click', function (e) {
      e.preventDefault()
      let a = d.querySelector('a[rel="tema"]')
      localStorage.setItem('tema', a.children[a.children.length - 2].innerText)
      $('#temaSwitch').click()
      cambiarTema(d,)
    })
    cambiarTema(d,)
  })

  //Evento click en Ver todos plp
  d.querySelector('a[rel="todos"]').addEventListener('click', () => {
    return
    document.querySelector('#container').style.display = 'none'
    d.querySelectorAll('a[rel="cate"]').forEach(e => e.classList.remove('active'))
    d.querySelectorAll('a[rel="fcate"]').forEach(e => e.classList.remove('bg-gradient-dark'))
    d.querySelector('a[rel="todos"]').classList.add('active')
    d.querySelector('a[rel="ftodos"]').classList.add('bg-gradient-dark')
    d.querySelector('#container').innerHTML = ''
    printProducts(d, productos, false, categorias)
    setTimeout(() => document.getElementById('container').style.display = 'block')
  })
  d.querySelector('a[rel="ftodos"]').addEventListener('click', () => {
    document.querySelector('#container').style.display = 'none'
    d.querySelectorAll('a[rel="fcate"]').forEach(e => e.classList.remove('bg-gradient-dark'))
    d.querySelectorAll('a[rel="cate"]').forEach(e => e.classList.remove('active'))
    d.querySelector('a[rel="ftodos"]').classList.add('bg-gradient-dark')
    d.querySelector('a[rel="todos"]').classList.add('active')
    d.querySelector('#container').innerHTML = ''
    printProducts(d, productos, false, categorias)
    setTimeout(() => document.getElementById('container').style.display = 'block')
  })

  // Controlando el logo de la pagina
  document
    .querySelector('a[data-widget="pushmenu"]')
    .addEventListener('click', () => {
      let icon_sm = document.querySelector('.icon-sm'),
        icon_lg = document.querySelector('.icon-lg')
      if ($(window).width() <= 974) return

      if (icon_sm.classList.contains('d-none')) {
        icon_sm.classList.remove('d-none')
        icon_lg.classList.add('d-none')
      } else {
        icon_sm.classList.add('d-none')
        icon_lg.classList.remove('d-none')
      }
    })

// Modal producto
  d.querySelectorAll('div.prod-card').forEach(e =>
    e.addEventListener('click', function (f) {

      if (f.target.closest('button.prod-id')) return

      let data = productos.find(e => e.name === this.id)
      data['stock'] = data.stock === undefined ? 1 : data.stock
      let precio = data.price ? `${data.price} USD ` : ``,
        cup = data.cup ? `${data.cup} CUP` : ``

      $('#prodDetails h5.name').html(`<b>${data['name']} ${data['model']}</b>`)
      $('#prodDetails span.stock').html(` Cantidad: ${data['stock']}`)
      $('#prodDetails p.desc').text(`${data['description']}`)
      $('#prodDetails span.price').html(`<b>${cup}</b>`)
      d.querySelector(
        '#prodDetails div.imgProdDetails'
      ).style = `background: url('${data['img']}');background-color:#333;`
      d.querySelector('#prodDetails button.prod-id').name = this.id

      $('#prodDetails').modal('show')
    })
  )
  //Imprimiendo filro de busqueda en el loby con formulario
  d.forms[0].addEventListener('submit', ev => ev.preventDefault())
})(document)
