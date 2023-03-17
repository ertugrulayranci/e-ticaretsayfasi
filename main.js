const categoryList= document.querySelector('.category-list');
const productList = document.querySelector(".product-list");
const sepetBtn = document.querySelector("#sepet");
const closeBtn = document.querySelector('#close');
const modal = document.querySelector(".modal-wrapper");

const fiyatSpan = document.querySelector("#fiyat");
const modalList = document.getElementById("modal-list");

document.addEventListener("DOMContentLoaded",()=>{
    //callback: içerisinde farklı fonksiyon çalıştırır
    fetchCategories();
    fetchProducts();
});

function fetchCategories(){
fetch('https://api.escuelajs.co/api/v1/categories')
.then(res=>res.json())
.then((data)=>
//DATA dizisinin içindeki her bir eleman için htmle categoryDiv gönderdik.
data.slice(0, 4).forEach((category)=>{ 
    //Gelen her obje için bir div oluşturma
    const categoryDiv = document.createElement('div');
    //oluşan elemana class verme
    categoryDiv.classList.add('category');
    //elemanın html içeriğini değiştirme
    categoryDiv.innerHTML = 
    `
    <img src="${category.image}"/>
    <span> ${category.name}</span>
    `;
    //oluşan elemanı html'e gönderme
categoryList.appendChild(categoryDiv);
    
}))
.catch(err=>console.log(err));
}
function fetchProducts(){
    fetch('https://api.escuelajs.co/api/v1/products')
    .then((res)=>res.json())
    .then((data)=>
    data.slice(0,20).forEach((product)=>{
        const numara =30;
        //div olusturma//
        const productDiv = document.createElement('div');
        //dive class Ekleme
        productDiv.classList.add('product');
        //divin içeriğini oluşturma
        productDiv.innerHTML =
        `<img src="${product.images[0]}"/>
          <p>${product.title}</p>
                <p>${product.category.name}</p>
                <div class="product-info">
                    <span>${product.price} $</span>
                    <button onclick="sepeteEkle({name:'${product.title}',id:'${product.id}',price:'${product.price}', amount:1})">Sepete ekle</button>
                </div>
        `;
        productList.appendChild(productDiv);
    }))
    .catch((err)=>console.log(err));
}

//sepeti açma kapama
const basket = [];
let toplamfiyat = 0;


function listBasket(){
    basket.forEach((eleman)=>{
        console.log(eleman)
        //Sepet Elemanının Divini oluşturma
        const basketItem= document.createElement('div');
        basketItem.classList.add('sepetItem');
        basketItem.innerHTML=`
        <h2>${eleman.name} </h2>
        <h2>${eleman.price} $</h2>
        <p > Miktar: ${eleman.amount} </p>
        `;
        modalList.appendChild(basketItem);
        toplamfiyat += Number(eleman.price)* eleman.amount;

        console.log(toplamfiyat)
    });
    fiyatSpan.innerText =toplamfiyat;
}
sepetBtn.addEventListener('click', ()=>{
    //sepeti acar
    toggleSepet();
    //sepete elemanları ekler
    listBasket();
} );
closeBtn.addEventListener('click',()=> {
//sepet kapatır
toggleSepet();
//sepet kapandığında listenin içini temizledik
modalList.innerHTML='';
});



function toggleSepet(){
    modal.classList.toggle('active');
}

//Sepete Eleman Ekleme

function sepeteEkle(param){
    const foundItem = basket.find((eleman) => eleman.id == param.id);
   
    if (foundItem) {
        foundItem.amount += 1;
      } else {
        basket.push(param);
      }
    
      console.log(basket);
    }