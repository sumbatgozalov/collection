const _URL = "http://localhost:3000/cards"
let _datas;
const container = document.querySelector('.cards')
const getCards = async ()=>{
    try {
        const response = await fetch(_URL);
        _datas = await response.json();
        // console.log(_datas);

        _datas.forEach((e) => {
           
            const card = document.createElement('div')
            card.className="card";
            card.innerHTML=`<img src=${e.img}>
            <h1>${e.name}</h1>
            <h3>${e.author}</h3>
            <div class="prices"><span class="first">${e.price}</span><span class="second">${e.oldPrice}</span><span class="third">${e.discountPercent}</span></div>`;
            container.append(card)
            
            
            
        });
       
    } catch (error) {
        console.error(error)
    }
}

getCards()