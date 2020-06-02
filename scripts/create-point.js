function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  //.then((res) => {return res.json()}) é uma versão longa do código abaixo
    .then(res => res.json()) 
    .then(states => {
      //ufSelect.innerHTML = ufSelect.innerHTML + `<option value="1">Valor</option>` é uma versão longa do código abaixo
        
      for( const state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
      }
            
    })
}
populateUFs()

function getCities (event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value 
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then(res => res.json()) 
    .then(cities => {
        
      for( const city of cities){
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>` 
      }
           citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")//faço uma procura denro do documento pelo select que tem o nome uf
    .addEventListener("change", getCities)//essa funcionalidade vai ficar ligada ouvindo eventos da pagina, como por exemplo o evento de mudança da uf