import { getCart } from "./cart.js";
import { modalDeliveryForm } from "./elements.js";

export const orderController = () => {
    modalDeliveryForm.addEventListener('change', () => {
        if(modalDeliveryForm.format.value === 'pickup') {
            modalDeliveryForm['adress-info'].classList.add('modal-delivery__fieldset-input_hide');
        } 
        if (modalDeliveryForm.format.value === 'delivery') {
            modalDeliveryForm['adress-info'].classList.remove('modal-delivery__fieldset-input_hide');
        }
    });

    modalDeliveryForm.addEventListener('submit', e => {
        e.preventDefault();
        // Получаем все поля формы с атрибутом name сразу
        const formData = new FormData(modalDeliveryForm);
        // console.log(Object.fromEntries(formData));
        const data = Object.fromEntries(formData);
        data.order = getCart();
        // console.log(data);

        fetch('https://reqres.in/api/users', {
            method: 'post',
            body: JSON.stringify(data),
        }).then(response => response.json()).then( data => alert('Ваш заказ успешно принят'));
    });
}