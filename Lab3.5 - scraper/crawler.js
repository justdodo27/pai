const jsdom = require("jsdom")
const { JSDOM } = jsdom

const request = require('request')
request('https://winnicalidla.pl/whisky.html', function (error, response, body) {
  const dom = new JSDOM(body)
  const items = dom.window.document.querySelectorAll("div.product-item-details")

  let whiskeys = new Array()

  items.forEach((item) => {
    let label = item.children[1].children[0].textContent.trim() // get whisky label
    let price = item.children[2].children[1].children[0].textContent.trim() // get whisky price
    price = price.slice(0, -2).trim()
    let size = item.children[2].children[1].children[1].textContent.trim() // get whisky size
    size = size.slice(0, -2).trim()

    let pricePerMl = Math.round((parseInt(price) / parseInt(size)) * 100) / 100 // calc price per ml
    let whisky = {
      'label': label,
      'price': parseFloat(price),
      'size': parseInt(size),
      'pricePerMl': pricePerMl
    }
    whiskeys.push(whisky)
    
    whiskeys.sort(function (a, b){ // sort whisky by price per ml
      return a.pricePerMl - b.pricePerMl
    })
    
    console.log(whiskeys)
  })
})