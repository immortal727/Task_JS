/* Написать функцию generateTable, которая принимает на вход массив объектов и создает таблицу.
 * При нажатии на заголовок ячейки должна происходить сортировка по соответствующему столбцу:

заголовки ячеек: навание свойств объекта
сами ячейки: значения свойств объекта
Например, для массива goods из файла lesson6 / js / foHw.js таблица будет следующего вида:
TITLE     PRICE   COUNT
Пианино    3000     25
Гитара     1200     40
Барабаны   2700     12
и тд
Вывод после нажатия на COUNT:
TITLE     PRICE   COUNT
Барабаны   2700     12
Пианино    3000     25
Гитара     1200     40
и тд
*/
let goods = [
    {
        title: "Пианино",
        price: 3000,
        count: 25
    },
    {
        title: "Гитара",
        price: 1200,
        count: 40
    },
    {
        title: "Барабаны",
        price: 2700,
        count: 12
    },
    {
        title: "Флейта",
        price: 900,
        count: 50
    },
    {
        title: "Арфа",
        price: 3400,
        count: 5
    }
];

let tableArea = document.getElementById("blockProducts");
let table = document.createElement("table");
function generateTable(object) {

    table.classList.add("table_sort");
    // заголовок
    let caption = table.createCaption();
    caption.innerText = "Товары нашего магазина";
    
    table.setAttribute("border", 1);
    let counter = 0;
    for (let item in object) {
        counter++;
    }

    let thead = table.createTHead();
    //let thead = thead.insertRow(0);
    row = thead.insertRow(0);
    table.append(thead);
    for (let item in object[0]) { // взять просто первый объект
        let th = document.createElement("th");
        th.innerText = item;
        row.append(th);
    }
    
    for (i = 0; i < object.length; i++) {
        // ряд
        let row = table.insertRow(i);  
        for (let item in object[i]) { // начинаем перебирать объект 
            let cell = row.insertCell();
            cell.innerText = object[i][item];
            
        }
        
    }
    
    tableArea.append(table);
}

generateTable(goods); // генерация таблицы с товарами

document.addEventListener('DOMContentLoaded', () => {
    // Событие DOMContentLoaded происходит когда весь HTML был полностью загружен и пройден парсером
    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        console.log(index);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for (const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for (const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };
});

/*document.getElementById("table_sort").onclick = function (event) {
    let target = event.target || event.srcElement;
    // Event.srcElement это проприетарный синоним стандартного свойства Event.target.
    thArray = []; // создаем пустой массив
    
    if (target.tagName == "TH") {
        alert(target.innerHTML);
    }
};*/



