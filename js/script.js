let cart = [];
let modalQt = 0;
let key = 0;
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

modelsJson.map((item, index)=>{
    let modelsItem = c('.models .models-item').cloneNode(true); /* clona ou copia todos os elementos da div PAI e div FILHO ( cloneNode (true) )  */
        
    modelsItem.setAttribute('data-key', index);

        modelsItem.querySelector('.models-item-img img').src = item.img;
        modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price[2].toFixed(2)}`;  /* array de valores com cifrão e duas casas após a virgula*/
        modelsItem.querySelector('.models-item--name').innerHTML = item.name;
        modelsItem.querySelector('.models-item--desc').innerHTML = item.description;
    
        modelsItem.querySelector('a').addEventListener('click', (e)=>{
            e.preventDefault();

                key = e.target.closest('.models-item').getAttribute('data-key');

                modalQt = 1;

                c('.modelsBig img').src = modelsJson[key].img;
                c('.modelsInfo h1').innerHTML = modelsJson[key].name;
                c('.modelsInfo--desc').innerHTML = modelsJson[key].description;
                //c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[2].toFixed(2)}`;
                c('.modelsInfo--size.selected').classList.remove('selected');

                    cs('.modelsInfo--size').forEach((size, sizeIndex)=>{

                        if(sizeIndex == 2) {
                            size.classList.add('selected');
                            c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
                        }

                            //size.innerHTML = modelsJson[key].sizes[sizeIndex]
                            size.querySelector('span').innerHTML = modelsJson[key].sizes[sizeIndex]
                    });
          
            c('.modelsInfo--qt').innerHTML = modalQt;
            
            /* ativando estilo display flex, abrindo janela de itens selecionados*/
            c('.modelsWindowArea').style.opacity = 0;
            c('.modelsWindowArea').style.display = 'flex';
            
            setTimeout(()=>{
                c('.modelsWindowArea').style.opacity = 1;

            }, 200);
            
        });

    c('.models-area').append(modelsItem);  /* cola o clone usando comando - append() */
});

// Açoes do modal - janela

function closeModal(){
    c('.modelsWindowArea').style.opacity = 0;
        
        setTimeout(()=>{

            c('.modelsWindowArea').style.display = 'none';

    }, 500);
}

cs('.modelsInfo--cancelButton, .modelsInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});


c('.modelsInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt >1){
        modalQt --;
        c('.modelsInfo--qt').innerHTML = modalQt;
    }    
});

c('.modelsInfo--qtmais').addEventListener('click', ()=>{
    modalQt ++;
    c('.modelsInfo--qt').innerHTML = modalQt;
});

cs('.modelsInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.modelsInfo--size.selected').classList.remove('selected');
        //e.target.classList.add('selected'); 
        size.classList.add('selected'); 
    });

});

//carrinho de compra

c('.modelsInfo--addButton').addEventListener('click', ()=>{
    //qual o modelo?
    //console.log("Modelo: " + key);
    
    //qual o tamanho?
    let size = parseInt(c('.modelsInfo--size.selected').getAttribute('data-key'));
    //console.log("Tamanho: " + size);
    
    //qual quantidade?
    //console.log("Quantidade: " + modalQt);
    
    //carrinho 
    //para conferir entre em ferramentas de desenvolvedor do navegador
    //aba console
    //digite comando, depois do sinal >> cart
    cart.push({
        id:modelsJson[key].id,  //modelo ou id
        size,                   //tamanho
        qt:modalQt              //quantidade
    });
    closeModal();
});