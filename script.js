import {getTeddies, createArticle, getProductInfo, createProduct, createProductPanier} from './teddies.js'

const store = document.querySelector('.store')

function arrayParam(path){
    let pathUrl = path.split('/')
    for(let i = 0; i < pathUrl.length; i++){
        if(pathUrl[i] == ''){
            pathUrl.splice(i, 1)
            i--
        }
    }
    return pathUrl
}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

var path = arrayParam(window.location.pathname)

if(path[path.length - 1].match(/(index\.html)/gm) || path[path.length - 1].match(/(\.html)/gm) == null){
    getTeddies().then((teddiesList) => {
        teddiesList.forEach(teddie => {
            createArticle(teddie).then((article) => {
                store.appendChild(article)
            })
        })
    })
}

if(path[path.length - 1].match(/(product\.html)/gm)){
    getProductInfo($_GET().id).then((infoTeddie) => {
        createProduct(infoTeddie)
    })
}

if(path[path.length - 1].match(/(panier\.html)/gm)){
    if(localStorage.getItem('panier') != null){
        const panier = JSON.parse(localStorage.getItem('panier'))
        panier.map((product) => {
            createProductPanier(product).then((article) => {
                document.querySelector('.list.list--panier').appendChild(article)
            })
        })
    }

    const buttonSubmit = document.querySelector('.panier .btn.btn--submit')
    buttonSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        let itemPanier = []

        const firstname = document.querySelector('.form.form--panier #firstname').value
        const lastname = document.querySelector('.form.form--panier #lastname').value
        const email = document.querySelector('.form.form--panier #email').value
        const city = document.querySelector('.form.form--panier #city').value
        const adress = document.querySelector('.form.form--panier #adress').value

        const contact = {
            firstname: firstname,
            lastname: lastname,
            adress: adress,
            city: city,
            email: email
        }
        console.log(contact);

        const test = JSON.parse(localStorage.getItem('panier'))
        const test2 = test.map((elem) => {
            let itemExist = false
            for(let i = 0; i < itemPanier.length; i++){
                if(itemPanier[i] == elem.id){
                    itemExist = true
                }
            }
            if(!itemExist){
                itemPanier.push(elem.id)
            }
        })
        console.log(itemPanier);
    })
    
}