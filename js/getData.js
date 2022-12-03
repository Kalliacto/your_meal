export const getData = async (url) => {
    const response = await fetch(url);
    console.log(response);
    // Обработать response можно либо методом .then() либо сделать async  функцию  
    // const response = fetch(url).then(response => console.log(response));
    if (response.ok) {
        return response.json();
    }
}