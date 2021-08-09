class Product {
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

  constructor (name, category, description, cant, model,
    img = 'static/img/empty.png', price = 0, cup = 0, pioridad = 100) {
    this._name = name
    this._category = category
    this._price = price
    this._description = description
    this._img = img
    this._cant = cant
    this._model = model
    this._pioridad = pioridad
    this._cup = cup
  }

  card () {
    let precio = this._price ? `${this._price} USD ` : ``,
      cup = this._cup ? `${this._cup} CUP` : ``

    let ribbon = this._pioridad < 100 ?
        `<div class="ribbon-wrapper">
      <div class="ribbon bg-gradient-warning" style="text-transform: none">
          <small><i class="mdi mdi-star"></i>Destacado<i class="mdi mdi-star"></i></small>
      </div>
    </div>` : '',
      tema = localStorage.getItem('tema') === 'Modo claro' ? 'bg-navy' : 'bg-light'

    return `
<div class="col-md-3 col-sm-4 col-12 p-1 d-md-inline-block d-sm-inline-block div-card">
    <span class="d-none">${this._name}</span>
    <div class="card m-1 prod-card ml-2 mr-2 ${tema} w3-hover-shadow-light">
             ${ribbon}
            <div class="card-img-top div-img" style='background: url("${this._img}")'></div>
            <div class="card-body">
            <h5 class="card-title"><b>${this._name}</b> ${this._model}</h5>
            <p class="card-text ">Precio: <b>${precio + cup}</b><br>${this._description}
            </p>
            <p class="card-text">
                <small class="text-muted"></small>
            </p>
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

