const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

modelsJson.map((item, index)=>{
    let modelsItem = c('.models .models-item').cloneNode(true); /* todos os elementos da div PAI e div FILHO ( cloneNode (true) )  */
    c('.models-area').append(modelsItem);
});