import {
    modalProduct,
    catalogList,
    modalProductTitle,
    modalProductImage,
    modalProductDescription,
    ingredientsCalories,
    ingredientsList,
    modalProductPriceCount,
} from './elements.js'
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
    img: 'img/megaburger.jpg',
    ingredients: [
        'Пшеничная булочка',
        'Мега котлета',
        'Красный лук',
        'Листья салата',
        'Соус горчичный',
    ]
};

const openModal = (product) => {
    // отрисовываем контент в модалке
    modalProductImage.src = product.img;
    modalProductTitle.textContent = product.title;
    // ingredientsList очищаем 
    // через цикл перебираем все ингридиенты из product.ingredients
    ingredientsList.textContent = '';
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
    ingredientsCalories.textContent = `${product.weight} г., ккал ${product.calories}`;
    modalProductPriceCount.textContent = product.price;

    // modalProductPriceCount.textContent = formatCurrency(product.price);
    // const formatCurrency = (n) => {
    //     const currency = new Intl.NumberFormat('ru-RU', {
    //         style: 'currency',
    //         currency: 'RUB',
    //         maximumFractionDigits: 0,
    //     });
    //      return currency.format(n);
    // }
    // modalProductPriceCount.textContent = formatCurrency(product.price);
    modalProduct.classList.add('modal_open'); 
};
//----------------------Отрисовка карточек----------------------------------------------------------/
const createCardProduct = (product) => {
    const li = document.createElement('li');
    li.classList.add('catalog__item');

    li.innerHTML = `
        <article class="product">
            <img class="product__image" src="${product.img}" alt="${product.title}">
            <p class="product__price">${product.price}<span class="currency">₽</span></p>
            <h3 class="product__title">
                <button class="product__detail">${product.title}</button>
            </h3>
            <p class="product__weight">${product.weight}г</p>
            <button class="product__add">Добавить</button>
        </article>
    `;

    return li;
};

catalogList.textContent = '';

const item = createCardProduct(burger);
// console.log(item);
catalogList.append(item);

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

