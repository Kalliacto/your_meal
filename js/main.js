// const productDetail = document.querySelectorAll('.product__detail');
const modalProduct = document.querySelector('.modal_product');
const catalogList = document.querySelector('.catalog__list');

// productDetail.forEach((product) => {
//     product.addEventListener('click', () => {
//         modalProduct.classList.add('modal_open');   
//     })
// })
//--------------------------------------------------------------------------------/
const product = {
    title: 'Бургер Макс',
    price: '10000',
    weight: '5000',
    calories: '15000',
    description: 'Огромный бургер для тебя и компании',
    img: 'img/megaburger.jpg',
    ingredients: [
        'Пшеничная булочка',
        'Мега котлета',
        'Красный лук',
        'Листья салата',
        'Соус горчичный',
    ]
};
// Получаем и отрисовываем контент в модалке
const modalProductTitle= document.querySelector('.modal-product__title');
const modalProductImage = document.querySelector('.modal-product__image');
const modalProductDescription = document.querySelector('.modal-product__description');

const ingredientsList = document.querySelector('.ingredients__list');
const ingredientsCalories = document.querySelector('.ingredients__calories');
const modalProductPriceCount = document.querySelector('.modal-product__price-count');

modalProductTitle.textContent = product.title;
modalProductImage.src = product.img;
// ingredientsList очищаем 
ingredientsList.textContent = '';
// через цикл перебираем все ингридиенты из product.ingredients
// for (i = 0; i < product.ingredients.length; i++) {
//     // создаем необходимый элемент с помощью метода createElement() 
//     const li = document.createElement('li');
//     // И добавляем элементу необходимый класс
//     li.classList.add('ingredients__item');
//     // отрисовываем текст в li со значением product.ingredients[i]
//     li.textContent = product.ingredients[i];
//     // Передаем созданные элемент в ingredientsList
//     ingredientsList.append(li);
// };
// --------------Или через forEach отрисовываем ингридиенты в модалке
// product.ingredients.forEach((item) => {
//     const li = document.createElement('li');
//     li.classList.add('ingredients__item');
//     li.textContent = item;
//     ingredientsList.append(li);
// })
// --------------Или через map отрисовываем ингридиенты в модалке
const ingredientsListItems = product.ingredients.map((item) => {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = item;
    return li;
});

ingredientsList.append(...ingredientsListItems);


modalProductDescription.textContent = product.description;
ingredientsCalories.textContent = product.calories;
modalProductPriceCount.textContent = product.price;

// modalProductPriceCount.textContent = formatCurrency(product.price);
// // const formatCurrency = (n) => {
//     const currency = new Intl.NumberFormat('ru-RU', {
//         style: 'currency',
//         currency: 'RUB',
//         maximumFractionDigits: 0,
//     });
//      return currency.format(n);
// }
// modalProductPriceCount.textContent = formatCurrency(product.price);

//--------------------------------------------------------------------------------/

catalogList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.product__detail') || target.closest('.product__image')) {
        modalProduct.classList.add('modal_open'); 
    }
});

//--------------------------------------------------------------------------------/
modalProduct.addEventListener('click', (event) => {
    const target = event.target;
    // закрываем модалку по клику или на элемент который имеет класс modal__close || по клику на элемент который имеет modalProduct, n.e за пределами модального окна в оверлее
    if (target.closest('.modal__close') || target === modalProduct) { 
        modalProduct.classList.remove('modal_open');
    }
    });
//--------------------------------------------------------------------------------/

