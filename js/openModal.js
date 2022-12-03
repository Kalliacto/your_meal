import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { 
    ingredientsList,
    modalProduct,
    modalProductTitle,
    modalProductImage,
    modalProductDescription,
    ingredientsCalories,
    modalProductPriceCount,
} from "./elements.js";
import { getData } from "./getData.js";


export const openModal = async (id) => {
    const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);
    // отрисовываем контент в модалке
    modalProductImage.src = `${API_URL}/${product.image}`;
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