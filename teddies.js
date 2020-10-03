function getTeddies() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest;
        request.open('GET', 'http://localhost:3000/api/teddies');
        request.onreadystatechange = function() {
            if(request.readyState == '4'){
                if(JSON.parse(request.response).length > 0){
                    resolve(JSON.parse(request.response));
                }
                else{
                    reject()
                }
            }
        }
        request.send()
    })
}

function createArticle(teddie){

    return new Promise ((resolve, reject) => {
        let article = document.createElement('article')
        let a = document.createElement('a')
        let img = document.createElement('img')
        let div = document.createElement('div')
        let divInfo = document.createElement('div')
        let name = document.createElement('h2')
        let price = document.createElement('p')

        article.classList.add('store', 'store__article')
        a.setAttribute('href', `product.html?id=${teddie._id}`)
        img.setAttribute('src', teddie.imageUrl)
        div.classList.add('store', 'store__article', 'store__article__info')
        name.textContent = teddie.name
        price.classList.add('store', 'store__article', 'store__article__info', 'store__article__info__price')
        price.textContent = teddie.price + '€'

        divInfo.appendChild(name)
        if(typeof(teddie.description) != undefined){
            let description = document.createElement('p')
            description.textContent = teddie.description
            divInfo.appendChild(description)
        }
        div.appendChild(divInfo)
        div.appendChild(price)
        a.appendChild(img)
        a.appendChild(div)
        article.appendChild(a)

        resolve(article)
    })
}

function getProductInfo(id){
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest;
        request.open('GET', `http://localhost:3000/api/teddies/${id}`);
        request.onreadystatechange = function() {
            if(request.readyState == '4'){
                if(request.response != '{}'){
                    resolve(JSON.parse(request.response));
                }
                else{
                    console.log('Erreur dans l\'id')
                }
            }
        }
        request.send()
    })
}

function createProduct(teddie){
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const description = document.createElement('p')
    const button = document.createElement('button')
    const div = document.createElement('div')
    const label = document.createElement('label')
    const select = document.createElement('select')

    if(teddie.colors.length != 0){
        teddie.colors.map((color) => {
            const option = document.createElement('option')
            option.textContent = color
            select.appendChild(option)
        })
    }

    button.addEventListener('click', (e) => {
        e.preventDefault()
        if(localStorage.getItem('panier') == null){
            const item = [{
                id: teddie._id,
                quantity: 1,
                color: select.value
            }]
            localStorage.setItem('panier', JSON.stringify(item))
        }
        else{
            const lastPanier = JSON.parse(localStorage.getItem('panier'))
            let isExist = false
            for(let i = 0; i < lastPanier.length; i++){
                if(lastPanier[i].id == teddie._id){
                    if(lastPanier[i].color == select.value){
                        lastPanier[i].quantity++
                        isExist = true
                    }
                }
            }
            
            if(!isExist){
                const productToAdd = {
                    id: teddie._id,
                    quantity: 1,
                    color: select.value
                }
                lastPanier.push(productToAdd)
            }

            localStorage.setItem('panier', JSON.stringify(lastPanier))
        }
    })

    h2.textContent = teddie.name
    img.setAttribute('src', teddie.imageUrl)
    description.textContent = teddie.description
    button.textContent = 'Ajouter au panier'

    const product = document.querySelector('.product')
    product.appendChild(img)
    div.appendChild(h2)
    div.appendChild(description)
    div.appendChild(label)
    div.appendChild(select)
    div.appendChild(button)
    product.appendChild(div)
}

export {getTeddies, createArticle, getProductInfo, createProduct}