$(function () {
  d.querySelectorAll('a[rel="cart"]').forEach(e =>
    e.addEventListener('click', () => {
      $('#cart').modal('show')
    }))

//Eliminar de la tabla del carrito y evento cantidad
  $('#prods-cart tbody')
    .on('click', 'a[rel="delete"]', function () {
      let tr = listTableCart.cell($(this).closest('td, li')).index()
      Cart.items.prodsList.push(listTableCart.row(tr.row).data())
      Cart.items.prods.splice(tr.row, 1)
      Cart.list()
      if (!Cart.items.prods.length) resetForm()
    })
    .on('change', 'input[name="cantidad"]', function () {
      let tr = listTableCart.cell($(this).closest('td, li')).index()
      Cart.items.prods[tr.row].cant = parseInt($(this).val())
      Cart.calculate_invoice()
      $('td:eq(1)', listTableCart.row(tr.row).node()).html(
        `$${Cart.items.prods[tr.row].subtotal.toFixed(2)}`
      )
    })

  window.addEventListener('load', () => {
    if (d.querySelector('button.home').classList.contains('active'))
      d.querySelector('p.direccion').classList.add('d-none')
    if (d.querySelector('button.local').classList.contains('active'))
      d.querySelector('p.horario').classList.add('d-none')

    if (d.querySelector('button.home').classList.contains('active'))
      btnHome()
    if (d.querySelector('button.local').classList.contains('active'))
      btnLocal()
  })

  //Eventos btn home y local
  d.querySelector('button.home')
    .addEventListener('click', () => btnHome())
  d.querySelector('button.local')
    .addEventListener('click', () => btnLocal())

  $('#cart').on('hidden.bs.modal', () => {
    if (!Cart.items.prods.length) resetForm()
  })
  //Eventos inputs del cart
  writeInValue('.form-cart-name', '.form-cart-name-1')
  writeInValue('.form-cart-addr', '.form-cart-addr-1')
  writeInValue('.form-cart-note', '.form-cart-note-1')
  errorEmptyValue('.form-cart-name')
  errorEmptyValue('.form-cart-name-1')
  errorEmptyValue('.form-cart-addr-1')
  errorEmptyValue('.form-cart-addr')
  $('#form-cart').on('submit', function (e) {
    e.preventDefault()
    if (!Cart.items.prods.length)
      return Alerta('El carrito esta vacío', 'error')

    //Si no se ha echo focus y se da submit pone clase a los vacios
    validateEmptySubmit('.form-cart-name')
    validateEmptySubmit('.form-cart-name-1')
    validateEmptySubmit('.form-cart-addr-1')
    validateEmptySubmit('.form-cart-addr')

    //Ultimas validaciones por resolution
    if (d.querySelector('button.home').classList.contains('active')) {
      if ($(window).width() < 575)
        lastSubmitValidate2('.form-cart-name-1', '.form-cart-addr-1')
      else
        lastSubmitValidate2('.form-cart-name', '.form-cart-addr')
    } else {
      if ($(window).width() < 575)
        lastSubmitValidate('.form-cart-name-1')
      else
        lastSubmitValidate('.form-cart-name')
    }
  })

  $('#lista').on('shown.bs.modal', () => {
    listProds.responsive.recalc()
    listProds.columns.adjust()
  })

  $('a[rel="ver-lista"]').on('click', function () {
    listProds = $('#listProds').DataTable({
      responsive: true,
      autoWidth: false,
      destroy: true,
      paginate: false,
      info: false,
      searching: true,
      // lengthMenu:[6,20,60,100],
      tabIndex: -10,
      data: Cart.items.prodsList,
      // ajax: {
      //   url: window.location.pathname,
      //   type: 'POST',
      //   data: {
      //     'action': 'list_products',
      //     'ids': JSON.stringify(Cart.get_ids()),
      //   },
      //   dataSrc: ""
      // },
      columns: [
        { 'data': 'name' },
        { 'data': 'description' },
        { 'data': 'name' },
      ],
      columnDefs: [
        {
          targets: [0],
          class: 'w-35',
          render: (data, type, row) =>
            $(window).width() <= 576
              ? truncate(data, 10, '..') + `<br> <div class="text-xs">$${row.cup}</div>`
              : $(window).width() <= 768
                ? truncate(data, 16, '..') + `<br> <div class="text-xs">$${row.cup}</div>`
                : truncate(data, 30, '...') + `<br> <div class="text-xs">$${row.cup}</div>`
        },
        {
          targets: [-2],
          class: 'list-desc w-55',
          render: data => $(window).width() <= 576
            ? truncate(data, 35, '..')
            : $(window).width() <= 768
              ? truncate(data, 52, '..')
              : truncate(data, 125, '...')
        },
        {
          targets: [-1],
          class: 'text-center w-10 align-middle',
          // orderable: false,
          render: () =>
            '<a rel="add" class="btn bg-gradient-orange text-white btn-sm circular">' +
            '<i class="mdi mdi-cart-plus mdi-15px"></i></a>'
        },
      ],
      initComplete: function (settings, json) {
      },
      drawCallback: function (settings) {
        $('ul.pagination').addClass('pagination-sm')
          .find('li.previous a').addClass('circular-left').parent().parent()
          .find('li.next a').addClass('circular-right')
        // console.log(settings)
      }
    })
    $('#lista').modal('show')
  })

  $('#listProds tbody')
    .on('click', 'a[rel="add"]', function () {
      let tr = listProds.cell($(this).closest('td, li')).index(),
        product = listProds.row(tr.row).data()
      product.cant = 1
      product.subtotal = 0.00
      Cart.add(product)
      Cart.items.prodsList.splice(tr.row, 1)
      listProds.row($(this).parents('tr')).remove().draw() //elimina la fila
      Alerta(`${product.name} added to the cart`, 'success')
    })

})
const d = document
let
  btnHome = () => {
    d.querySelector('button.home').classList.add('active')
    d.querySelector('i.home').classList.add('mdi-check')
    d.querySelector('button.local')
      .classList.remove('active')
    d.querySelector('i.local').classList.remove('mdi-check')
    d.querySelectorAll('div.div-direccion').forEach(e =>
      e.classList.remove('d-none')
    )
    d.querySelector('p.horario').classList.remove('d-none')
    d.querySelector('p.direccion').classList.add('d-none')
  }
  ,
  btnLocal = () => {
    d.querySelector('button.home')
      .classList.remove('active')
    d.querySelector('i.home').classList.remove('mdi-check')
    d.querySelector('button.local')
      .classList.add('active')
    d.querySelector('i.local').classList.add('mdi-check')
    d.querySelectorAll('div.div-direccion').forEach(e =>
      e.classList.add('d-none')
    )
    d.querySelector('p.horario').classList.add('d-none')
    d.querySelector('p.direccion').classList.remove('d-none')
  }
  ,
  writeInValue = (selector, selector1) => {
    d.querySelector(`${selector}`)
      .addEventListener('input', function () {
        d.querySelector(`${selector1}`).value = this.value
      })
    d.querySelector(`${selector1}`)
      .addEventListener('input', function () {
        d.querySelector(`${selector}`).value = this.value
      })
  }
  ,
  errorEmptyValue = selector => {
    d.querySelector(`${selector}`).addEventListener('blur', function () {
      if (!Cart.items.prods.length) return
      if (!(this.value)) this.classList.add('is-invalid')
      else this.classList.remove('is-invalid')
    })
    d.querySelector(`${selector}`).addEventListener('focus', function () {
      if (!Cart.items.prods.length) return
      if (!(this.value)) this.classList.remove('is-invalid')
      // else this.classList.add('is-invalid')
    })
  }
  ,
  checkIsValidClass = selector => d.querySelector(`${selector}`).classList.contains('is-invalid')
  ,
  validateEmptySubmit = selector => {
    if (d.querySelector(`${selector}`).value)
      return true
    d.querySelector(`${selector}`).classList.add('is-invalid')
    return false
  }
  ,
  resetForm = () => {
    d.querySelectorAll('[class*="form-cart-name"]').forEach(e => {
      e.classList.remove('is-invalid')
      e.value = ''
    })
    d.querySelectorAll('[class*="form-cart-addr"]').forEach(e => {
      e.classList.remove('is-invalid')
      e.value = ''
    })
    d.querySelectorAll('[class*="form-cart-note"]').forEach(e => {
      e.value = ''
    })
  }
  ,
  lastSubmitValidate2 = (selector, selector1) => {
    if (checkIsValidClass(`${selector}`) ||
      checkIsValidClass(`${selector1}`)) {
      Alerta('Complete el formulario, please', 'error')
    } else {
      window.open(`https://api.whatsapp.com/send/?phone=+13203857293&text=${generateMSG()}&app_absent=1`)
      console.log(generateMSG())
      $('#cart').modal('hide')
      Cart.items.prodsList = Cart.items.prodsList.concat(Cart.items.prods)
      Cart.items.prods = []
      Cart.list()
      resetForm()
    }
  }
  ,
  lastSubmitValidate = selector => {
    if (checkIsValidClass(`${selector}`)) {
      Alerta('Complete el formulario, please', 'error')
    } else {
      window.open(`https://api.whatsapp.com/send/?phone=+13203857293&text=${generateMSG()}&app_absent=1`)
      console.log(generateMSG())
      $('#cart').modal('hide')
      Cart.items.prodsList = Cart.items.prodsList.concat(Cart.items.prods)
      Cart.items.prods = []
      Cart.list()
      resetForm()
    }
  }
  ,
  generateMSG = () => {
    let table = ''
    Cart.items.prods.forEach(e => table += `${e.name} (${e.cup} cup) * ${e.cant}%0A`)
    table += `%0ATotal: ${d.querySelector('span.cart-total').innerText}%0A%0A`

    let dataClient = 'Name: ' + d.querySelector('.form-cart-name').value + '%0A'
    if (d.querySelector('.form-cart-note').value)
      dataClient += `Note: ${d.querySelector('.form-cart-note').value}%0A`

    if (d.querySelector('button.home').classList.contains('active')) {
      let str = 'https://technostarcuba.github.io/catalgo/ %0A Hola, me gustaría comprar los siguientes productos y que me los traigan a la dirección: %0A'
        + d.querySelector('.form-cart-addr').value + '%0A%0A'
      str += table
      str += dataClient
      return str
    } else {
      let str = 'https://technostarcuba.github.io/catalgo/ %0A Hola me gustaría comprar los siguientes productos: %0A%0A'
      str += table
      str += dataClient
      return str
    }
  }
  ,
  Cart = {
    items: {
      prods: [],
      total: 0.00,
      prodsList: [],
    },
    get_ids: () => Cart.items.prods.map(value => value.id),
    calculate_invoice: function () {
      let subtotal = 0.00
      $.each(this.items.prods, (pos, dict) => {
        dict.pos = pos
        dict.subtotal = dict.cant * parseFloat(dict.cup)
        subtotal += dict.subtotal
      })
      this.items.total = subtotal
      $('span.cart-total').text('$' + this.items.total.toFixed(2))
      //escribir en el total
    },
    add: item => {
      if (Cart.items.prods.find(e => e.name === item.name)) return
      Cart.items.prods.push(item)
      Cart.list()
    },
    list: function () {
      this.calculate_invoice()
      listTableCart = $('#prods-cart').DataTable({
        responsive: false,
        autoWidth: false,
        destroy: true,
        paginate: false,
        info: false,
        data: this.items.prods,
        searching: false,
        language: { emptyTable: 'Cuando añadas un producto aparecerá aquí' },
        columns: [
          { data: 'name' },
          { data: 'cup' },
          { data: 'cant' },
          { data: 'name' }
        ],
        columnDefs: [
          {
            targets: [-1],
            class: 'text-right w-10 td-cart py-1 align-middle',
            render: () => `
            <a rel="delete" class="btn bg-gradient-danger text-white btn-xs" style="width: 28px">
            <i class="mdi mdi-trash-can-outline mdi-15px"></i></a>`
          },
          {
            targets: [-2],
            class: 'text-center align-middle w-35 td-cart px-0 py-1',
            render: (data, type, row) => `
                <input type="text" name="cantidad" 
                class="form-control text-center form-control-sm input-sm"
                autocomplete="off" value="${row.cant}">`
          },
          {
            targets: [-3],
            class: 'text-right w-15 td-cart py-1 align-middle',
            render: data => `$${parseFloat(data).toFixed(2)}`
          },
          {
            targets: [0],
            class: 'w-40 td-cart py-1 ',
            render: (data, type, row) =>
              $(window).width() <= 400
                ? truncate(data, 7, '..') + `<br> <div class="text-xs">$${row.cup}</div>`
                : $(window).width() <= 576
                  ? truncate(data, 10, '..') + `<br> <div class="text-xs">$${row.cup}</div>`
                  : truncate(data, 17, '...') + `<br> <div class="text-xs">$${row.cup}</div>`
          }
        ],
        rowCallback (row, data, displayNum, displayIndex, dataIndex) {
          $(row).find('input[name="cantidad"]').TouchSpin({
            min: 1,
            max: data.stock,
            step: 1,
            buttondown_class: 'btn bg-gradient-secondary circular-left',
            buttonup_class: 'btn bg-gradient-secondary circular-right'
          })
        },
        initComplete: (settings, json) => {
          console.log(Cart.items.prods)
        }
      })
    }
  }