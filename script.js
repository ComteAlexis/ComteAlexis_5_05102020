const store = document.querySelector('.store')

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
        a.setAttribute('href', `article.html/search?id=${teddie._id}`)
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

getTeddies().then((teddiesList) => {
        teddiesList.forEach(teddie => {
            createArticle(teddie).then((article) => {
                store.appendChild(article)
            })
        })
    }
)
