import {getTeddies, createArticle, getProductInfo, createProduct} from './teddies.js'

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







