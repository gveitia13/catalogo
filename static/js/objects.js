class Product {
  get stock () {
    return this._stock
  }

  set stock (value) {
    this._stock = value
  }
  set cant (value) {
    this._cant = value
  }

  set pioridad (value) {
    this._pioridad = value
  }

  get pioridad () {
    return this._pioridad
  }

  get model () {
    return this._model
  }

  get name () {
    return this._name
  }

  get category () {
    return this._category
  }

  get price () {
    return this._price
  }

  get description () {
    return this._description
  }

  get img () {
    return this._img
  }

  get cant () {
    return this._cant
  }

  get cup () {
    return this._cup
  }

  constructor (name, category, description, stock, model,
    img = ['static/img/empty.png'], price = 0, cup = 0, pioridad = 100) {
    this._name = name
    this._category = category
    this._price = price
    this._description = description
    this._img = img
    this._stock = stock
    this._model = model
    this._pioridad = pioridad
    this._cup = cup
  }

  card () {
    // let precio = this._price ? `${this._price} USD ` : ``,
    //   cup = this._cup ? `${this._cup} CUP` : ``
    let precio = this._cup + ' CUP'

    let ribbon = this._pioridad < 100 ?
        `<div class="ribbon-wrapper">
            <div class="ribbon bg-gradient-warning" style="text-transform: none">
                <small><i class="mdi mdi-star"></i>Destacado<i class="mdi mdi-star"></i></small>
            </div>
         </div>` : '',
      tema = localStorage.getItem('tema') === 'Modo claro'
        ? 'bg-navy' : 'bg-light',
      hover = localStorage.getItem('tema') === 'Modo claro'
        ? 'w3-hover-shadow-light' : 'w3-hover-shadow',
      cant = this._stock === undefined ? 3 : this._stock

    return `
<div class="col-12 col-sm-6 col-md-4  col-lg-3 py-lg-3 px-lg-2 px-0 py-2 div-card">
    <span class="d-none prodName">${this._name}</span>
    <div class="card m-1 prod-card ml-2 mr-2 ${tema} ${hover} card-zoom circular" id="${this._name}">
         <div class="row row-card"> 
             ${ribbon}
            <div class="col-4 col-sm-12">
                <div class="card-img-top div-img circular-top" 
                style='background: url("${this._img.toString()}")'></div>
            </div>
            <div class="col-6 col-sm-12 row-card px-0">
                <div class="card-body row-card pr-0 py-sm-3 px-sm-4">
                    <h5 class="card-title"><b>${this._name}</b> ${this._model}</h5>
                    <p class="card-text m-0 prod-price">Precio: <b>${precio}</b>
                    </p>
                    <p class="card-text p-stock m-0">
                       Cantidad: ${cant}
                    </p>
                    <p class="card-text prod-desc text-muted">
                        ${this._description}
                    </p>
                     <button name="${this._name}" 
                            class="btn prod-id bg-gradient-orange text-white circular btn-sm float-right d-sm-inline-block d-none">
                        <i class="mdi mdi-cart-plus"></i>
                        <div class="d-inline-block">Añadir</div>
                     </button>
                </div>
            </div>
            <div class="col-2 d-sm-none d-flex align-items-center row-card pl-0">
                <button name="${this._name}" 
                        class="btn prod-id bg-gradient-orange text-white circular-circle">
                    <i class="mdi mdi-cart-plus"></i>
                </button>
            </div>
        </div> 
    </div>
</div>
`
  }
}

class Category {
  get icon () {
    return this._icon
  }

  get name () {
    return this._name
  }

  get description () {
    return this._description
  }

  constructor (name, description, icon = ['mdi', ' mdi-bed-empty']) {
    this._name = name
    this._description = description
    this._icon = icon
  }
}

