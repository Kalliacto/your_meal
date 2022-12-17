import { catalogList, countAmount, modalProductBtn, order, orderCount, orderList, orderTotalAmount, orderWrapTitle } from './elements.js'
import { getData } from './getData.js';
import { API_URL, PREFIX_PRODUCT } from "./const.js";
// Несколько функций для работы с корзиной

// ****************************Получение корзины****************************
const getCart = () => {
    // Получаем список товаров из localStorage(хранилище внутри браузера)
    const cartList = localStorage.getItem('cart');
    if (cartList) {
        return JSON.parse(cartList);
    } else {
        return [];
    }
};

const renderCartList = async () => {
    const cartList = getCart();
    const allIdProduct = cartList.map(item => item.id);
// с помощью id нужно запросить данные с сервера и записать в data
    const data = cartList.length 
    ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`)
    : [];
    // console.log(data);
    // Считаем сколько товаров положили в корзину перебирая cartList с помощью reduse
    const countProduct = cartList.reduce((acc, item) => acc + item.count, 0);
    orderCount.textContent = countProduct;
    
    const cartItems = data.map(item => {
        const li = document.createElement('li');
        li.classList.add('order__item');
        li.dataset.idProduct = item.id;

        const product = cartList.find((cartItem => cartItem.id === item.id));

        li.innerHTML = `
            <img src="${API_URL}/${item.image}" alt="${item.title}" class="order__image">
            <div class="order__product">
            <h3 class="order__product-title">${item.title}</h3>
            <p class="order__product-weight">${item.weight}</p>
            <p class="order__product-price">${item.price}</p>
            </div>
            <div class="order__product-count count">
            <button class="count__minus" data-id-product=${product.id}>-</button>
            <p class="count__amount">${product.count}</p>
            <button class="count__plus" data-id-product=${product.id}>+</button>
            </div>
        `;
        
        return li;
    })

    orderList.textContent= '';
    orderList.append(...cartItems);

    orderTotalAmount.textContent = data.reduce((acc, item) => {
        const product = cartList.find((cartItem => cartItem.id === item.id));
        return acc + item.price * product.count;
    }, 0);
};

// ****************************Обновление корзины****************************
const updateCartList = (cartList) => {
    localStorage.setItem('cart', JSON.stringify(cartList));
    renderCartList();
}
// ****************************Добавление в корзину****************************
const addCart = (id, count = 1) => {
    
    const cartList = getCart();
    // метод find находит элемент и записывает в product,если не нашел возращает null   
    const product = cartList.find((item) => item.id === id);

    if (product) {
        // product.count = product.count + count;
        // Или  
        product.count += count;
    } else {
        cartList.push({id, count});
    }
    // console.log(id, count);
    updateCartList(cartList);
};


// ****************************Удаление из корзины****************************
const removeCart = (id) => {
    const cartList = getCart();
// метод findIndex находит элемент и возвращает индекс,если не нашел возращает -1  
    const productIndex = cartList.findIndex((item) => item.id === id);
    cartList[productIndex].count -= 1;

    if  (cartList[productIndex].count === 0) {
        cartList.splice(productIndex, 1)
    }

    updateCartList(cartList);
};
// ****************************Все слушатели корзины в одном месте****************************
const cartController = () => {
    catalogList.addEventListener('click', ({target}) => {
        if (target.closest('.product__add')) {
            addCart(target.closest('.product').dataset.idProduct);
        }
    });

    modalProductBtn.addEventListener('click', () => {
        addCart(modalProductBtn.dataset.idProduct, parseInt(countAmount.textContent),);
    });

    orderList.addEventListener('click', ({target}) => {
        const targetPlus = target.closest('.count__plus');
        const targetMinus = target.closest('.count__minus');

        if (targetPlus) {
            addCart(targetPlus.dataset.idProduct);

        } 
        if (targetMinus) {
            removeCart(targetMinus.dataset.idProduct);
        } 
    });

    orderWrapTitle.addEventListener('click', () => {
        // Метод toggle добавляет класс если его нет и убирает класс если он есть
        order.classList.toggle('order_open');
    })
};


// ****************************Запуск всей корзины****************************
export const cartInit = () => {
    cartController();
    renderCartList();
};


