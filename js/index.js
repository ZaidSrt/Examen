const url = 'https://api.datos.gob.mx/v2/Records';
let search = document.querySelector('#search')
let tabla = document.querySelector('#result tbody')

let array = [];

async function getApi() {
    let result = await fetch(url)
    result = await result.json()
    
    return result.results
}

getApi().then(result => {

    array = result;
    setResult(result)

}).catch(err => console.log(err))


search.addEventListener('keyup', event => {
    let value = event.target.value

    let result = array.filter(res => {
        return res.compiledRelease.id.toLowerCase().includes(value.toLowerCase())
    })

    setResult(result)

})

function setResult(result) {
    let body = '';

    result.forEach(res => {
        body += `
        <tr>
            <td>${res.compiledRelease.id}</td>
            <td>${res.compiledRelease.publisher.name}</td>
            <td>${res.compiledRelease.ciclo}</td>
            <td>${res.compiledRelease.publisher.uri}</td>
        </tr>`; 
    });

    tabla.innerHTML = body
}
