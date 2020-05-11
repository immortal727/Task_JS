/* Функция generateField(n) по генерации игрового поля размером n x n.
Значение n не может быть меньше 3.
Для 3х ячеек поля(для выбора конкретной ячейки использовать random)
добавить атрибут prise.Значения атрибута prise устанавливаются из массива.
    Для 1й ячейки значение атрибута prise = "cat",
        для 2й ячейки значение атрибута prise = "book",
            для 3й ячейки значение атрибута prise = "car"*/
let Fields = {
    cat: {
        title: "Кот",
        img:"img/cat.jpg"
    },
    book: {
        title: "Книга",
        img:"img/book.jpg"
    },
    car: {
        title: "Машина",
        img: "img/car.jpg",
    }
}

let section = document.querySelector(".GameField");
let popitka = document.querySelector("#attempt");
let attempt = 0; // Счетчик попыток
const BOTTON_ARR = document.getElementById('btn')

BOTTON_ARR.addEventListener('click', generateField.bind(BOTTON_ARR, Fields));
section.addEventListener('click', showPresent.bind(this, Fields));

//Создание массива x*x
let createArray = (n) => {
  //  console.log(Number.isInteger(n));
    if (!Number.isInteger(n)) n = 3; // Если не числовое значение, то значене n=3 (по условию кол-ва ячеек)
    if (n < 3) n = 3;
    let x = 0; // Счетчик, который будет заносится в каждую ячейку массива
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr[i] = [];
        for (let j = 0; j < n; j++) {
            arr[i][j] = ++x;
        }
    }
    return arr;
};

function generateField(Object) {
    // Получаем первый элемент
    let cell__grid = document.getElementsByClassName('GameField')[0];
    // Получаем значение из input type="number" - кол-во ячеек игрового поля
    let count = document.getElementById('btn__arr').value;

    // Если ранее была создано игровое поле, то там ячейки остались и их надо удалить
    // Для этого проверяем на найденные дочерние элементы в div c классом GameField
    while (cell__grid.firstChild) {
        cell__grid.removeChild(cell__grid.firstChild);
    }

    //Создаем матрицу  х*х
    arr = createArray(Number(count));

    //Задали 3 ячейки рандом
    let arrAtribute = [];
    for (let key in Object) {
        arrAtribute.push(randomInteger(1, count * count));
    }

    //Оформляем GRID
    cell__grid.style.cssText = `
        grid-template-columns: repeat(${count},1fr);
        grid-template-rows:  repeat(${count},1fr);
   `;

    //Добавляем ячеки
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let div = document.createElement('div');
            if (arrAtribute.indexOf(arr[i][j]) == 2) {
                div.setAttribute("data-prise", 'car');
               // someFunc("car", Object, div);
                
            }
            else if (arrAtribute.indexOf(arr[i][j]) == 1) {
                div.setAttribute("data-prise", 'book');
              //  someFunc("book", Object, div)
                
            }
            else if (arrAtribute.indexOf(arr[i][j]) == 0) {
                div.setAttribute("data-prise", 'cat');
              //  someFunc("cat", Object, div)
               
            }
            
            cell__grid.append(div);
        }
    } 
}

function someFunc(atribut, Object, div) {
    console.log("Объект", Object)
    console.log("Свойство title ", Object[atribut]);
    console.log(`Атрибут - ${atribut}`);

    //  if (Object[atribut] === atribut) {
    let title = document.createElement("h2");
    title.innerText = Object[atribut].title;
    let pic = document.createElement("img");
    pic.setAttribute("src", Object[atribut].img);
    div.append(title, pic);
    //  }
}

function showPresent(Object) {
    // Находим область по которой произошел клик
    let clickElem = event.target;
    // получим значение атрибута data-prise
    let present = clickElem.dataset.prise;
    
    attempt++;
    if (attempt >= 3) {
        window.alert("Ваши попытки закончились. Game Over");
        removeEventListener('click', showPresent.bind(this, Fields));
    }
    else {
        if (present === "car" || present === "book" || present === "cat") {
            console.log(Object[present].title);
            let div = document.createElement('div');
            let title = document.createElement("h2");
            title.innerText = Object[present].title;
            let pic = document.createElement("img");
            pic.setAttribute("src", Object[present].img);
            div.append(title, pic);
            clickElem.append(div);
        }
        popitka.innerHTML = "";
        popitka.append(attempt);
    }
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    min = Math.ceil(min); // Округление до ближайшего большего целого
    max = Math.floor(max); // Округление до ближайшего меньшего целого
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
