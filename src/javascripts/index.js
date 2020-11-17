// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// JavaScript
//TODO
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function displayCard(c){
    return `
        <div class="card">
            <img src="${c.poster}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${c.title}</h5>
                <p class="card-text">${c.description}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `
}

function displayCards(){
    let cards = JSON.parse(localStorage.getItem('cards') || '[]')
    document.querySelector('#cards').innerHTML = ''
    for(let c of cards){
        let col = document.createElement('div')
        col.setAttribute('class', 'col-md-4')
        col.innerHTML = displayCard(c)
        document.querySelector('#cards').appendChild(col)
    }
}

function addNewCard(event){
    if(event) event.preventDefault()

    let t = document.querySelector('#title').value
    let d = document.querySelector('#description').value
    let p = document.querySelector('#poster').value

    let cards = JSON.parse(localStorage.getItem('cards') || '[]')

    if(t && d && p){
        let card = {title: t, description: d, poster: p}
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
    }

    this.reset()

    document.querySelector('#cards').classList.remove('d-none')
    document.querySelector('#myForm').classList.add('d-none')

    displayCards()
}
document.querySelector('#new_card').onclick = function(){
    document.querySelector('#myForm').classList.remove('d-none')
    document.querySelector('#cards').classList.add('d-none')
}
document.forms[0].querySelector('[type="button"]').onclick = function(){
    document.querySelector('#cards').classList.remove('d-none')
    document.querySelector('#myForm').classList.add('d-none')
}

document.forms[0].addEventListener('submit', addNewCard, false)