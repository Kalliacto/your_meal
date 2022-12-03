import {
    modalProduct,
    catalogList,
} from './elements.js'

import { openModal } from './openModal.js';
import { renderListProduct } from './renderListProduct.js';

import { navigationListController } from './navigationList.js'

// const productDetail = document.querySelectorAll('.product__detail');
// productDetail.forEach((product) => {
//     product.addEventListener('click', () => {
//         modalProduct.classList.add('modal_open');   
//     })
// })
//--------------------------------------------------------------------------------/
const burger = {
    title: 'Бургер Макс',
    price: '10000',
    weight: '5000',
    calories: '1500',
    description: 'Огромный бургер для тебя и компании',
    image: 'img/megaburger.jpg',
    ingredients: [
        'Пшеничная булочка',
        'Мега котлета',
        'Красный лук',
        'Листья салата',
        'Соус горчичный',
    ]
};

//----------------------Открытие модалки----------------------------------------------------------/

catalogList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.product__detail') || target.closest('.product__image')) {
        openModal(burger);
    }
});

//--------------------------Закрытие модалки------------------------------------------------------/
modalProduct.addEventListener('click', (event) => {
    const target = event.target;
    // закрываем модалку по клику или на элемент который имеет класс modal__close || по клику на элемент который имеет modalProduct, n.e за пределами модального окна в оверлее
    if (target.closest('.modal__close') || target === modalProduct) { 
        modalProduct.classList.remove('modal_open');
    }
    });
//--------------------------------------------------------------------------------/
const init = () => {
    renderListProduct();
    navigationListController();
}
 init();