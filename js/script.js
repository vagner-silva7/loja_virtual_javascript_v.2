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
                c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;

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

    let identifier = modelsJson[key].id+'@'+size;  //chave comparação de item

    let locaId = cart.findIndex((item) => item.identifier == identifier);  // comparando item para somar quantidade

        if(locaId > -1){

            cart[locaId].qt += modalQt;

        } else {
    
            //carrinho 
            //para conferir entre em ferramentas de desenvolvedor do navegador
            //aba console
            //digite comando, depois do sinal >> cart
            cart.push({
                identifier,
                id:modelsJson[key].id,  //modelo ou id
                 size,                   //tamanho
                qt:modalQt              //quantidade
            });

        }

    updateCart();
    
    closeModal();
});


// configuração mobile

c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        c('aside').style.left = '0';
    }

});


c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';

});


// configuração desktop

c('.cart--finalizar').addEventListener('click', ()=>{
    cart = [];
    updateCart();

});

//Função aside (HTML) ou show (css)
function updateCart(){

    c('.menu-openner span').innerHTML = cart.length;   //mobile

    if(cart.length > 0) {

        c('aside').classList.add('show');

            c('.cart').innerHTML = '';

            let subtotal = 0;
            let desconto = 0;
            let total = 0;

                cart.map((itemCart, index)=>{

                    let modelItem = modelsJson.find((itemBD) => itemBD.id == itemCart.id);
                        subtotal += modelItem.price[itemCart.size] * itemCart.qt;

                    let cartItem = c('.models .cart--item').cloneNode(true);
                    let modelSizeName;
                        switch(itemCart.size) {
                            case 0:
                                modelSizeName = 'P';
                                break;
                            case 1: 
                                modelSizeName = 'M';
                                break;   
                            case 2: 
                                modelSizeName = 'G';
                                break;  
                        }

                        cartItem.querySelector('img').src = modelItem.img;
                        cartItem.querySelector('.cart--item-nome').innerHTML = `${modelItem.name} (${modelSizeName} - ${modelItem.sizes[itemCart.size]})`;
                        cartItem.querySelector('.cart--item-qt').innerHTML = itemCart.qt;
                        cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                            if(itemCart.qt > 1){
                                itemCart.qt--;
                            }else{
                                cart.splice(index, 1);
                            };
                            updateCart();
                        });
                        cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                            itemCart.qt++;
                            updateCart();
                        });

                    /* console.log(modelItem); */

                    c('.cart').append(cartItem);

                });

                desconto = subtotal * 0.1;
                total = subtotal - desconto;
                c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
                c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
                c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {

        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';  //mobile

    }

};