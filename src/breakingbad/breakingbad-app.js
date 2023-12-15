/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async (element) => {

    element.innerHTML = ''
    document.querySelector('#app-title').innerHTML = 'Breaking Bad app';
    console.log('Breaking bad app')

    // Ya que los nodos se crean fuera del eventListener, al volver a insertarlos al nodo padre, estos no pierden sus funcionalidades
    // ya que mantienen su uso y por ende su direccion en memoria.
    const p = document.createElement('p');
    const h3 = document.createElement('h3');
    const button = document.createElement('button');
    button.innerHTML = 'Next quote';

    
    button.addEventListener('click', async () => {
        element.innerHTML = 'Loading...';
        const quote = await fetchQuote();
        renderQuote(quote);
    });
    
    const renderQuote = (data) => {
        
        p.innerHTML = `"${data.quote}"`
        h3.innerHTML = `${data.author}`
        element.replaceChildren(button, p, h3);
        
    }
    
    fetchQuote().then(renderQuote);
}

/**
 * @returns {Promise<Object>} quote information
 */
const fetchQuote = async () => {
    const quote = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const data = await quote.json();
    return data[0];
}


