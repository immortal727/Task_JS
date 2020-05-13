class Fermer {
    _quantity = 10;
    _resource = 5; // Первоначальное значение единиц ресурсов фермера
    _prognal = false;
    constructor(name) {
        this._name = name; // имя фермера
        this._driveAway = 0; // Счетчик диких животных, сколько смог прогнать фермер
    }

    collection(otherAnimal) { // Сбор ресурсов с животных
        let edible = []; // Массив для животных, которые пригодны в пищу
        // Выбираем животных, которые доступны в пищу _edible === true
        for (let elem in otherAnimal) {
            if ((otherAnimal[elem] instanceof Animals) && otherAnimal[elem]._sourceAnimal != 0
                && otherAnimal[elem]._edible === true) {
                edible.push(otherAnimal[elem]);
            }
        }
        // Убираем ресурсы рандомно с животного, которое пригодно в пищу
        let givotnoe = edible[randomInteger(0, edible.length)];
        givotnoe._sourceAnimal--;
        console.log("Ресурсы животного", givotnoe, "уменьшились");
        this._resource++; // Фермер восполняет свои ресурсы
        console.log(`Ресурсы фермера ${this._resource}`);
        
    }

    eat(otherAnimal) {
        if (!(otherAnimal instanceof Animals) && otherAnimal._edible === false) {
            throw new Error("Фермер не сможеть съесть другое животное");
        } else {
            for (let elem in otherAnimal) {
                if (otherAnimal[elem]._health === 0 && otherAnimal[elem]._edible === true) {
                    console.log('Фермер съел', otherAnimal[elem]);
                    otherAnimal[elem]._health = 0; // Уменьшается здоровье
                    _resource += otherAnimal[elem]._sourceAnimal; // ресурс фермера увеличивается
                    console.log(otherAnimal[elem], "умерло");
                    otherAnimal.splice(elem, 1); // Удаляем это животное
                    return;
                }
            }
        }
    }

    drive_away(otherAnimal) { // Фермер прогоняет другое животное
        this._resource--; // Затрачивает свои силы (ресурсы) - в любом случае, 
        // прогнал он дикое животное или нет
        
        if (!(otherAnimal instanceof Animals) && this._driveAway <= 3 && otherAnimal._attack === 0) {
            this._prognal = true;
            this._driveAway++; // увеличиваем счетчик прогнаных животных
            console.log("Фермеру прогнал ", otherAnimal);
        } else {
            this._prognal = false;
            console.log("Фермеру не удалось прогнать ", otherAnimal);
        }
        
    }
    feed(otherAnimal) {
        if (otherAnimal instanceof Animals) { // Если животное самого фермера
            this._feed = true; // Покормил животное
            otherAnimal.eat(); // Животное восполняет здоровье при кормлении
        } 
    }
}

class Animals { 
    _weight = 30; // вес животного
    _speed = 5; // скорость км/ч
    _health = this._weight; // здоровье (из рассчета 1 кг животного 1 ресурс)
    _edible = true; // съедобно/несъедобно
    constructor(resurs) {
       this._sourceAnimal = resurs; // кол-во ресурсов
    }

    set source(sourceAnimalValue) {
        if (sourceAnimalValue < 0) {
            throw new Error("Здоровье животного не может быть меньше 0");
        }
        this._sourceAnimal = sourceAnimalValue;
    }
    get source() {
        return this._sourceAnimal;
    }

    escape(otherAnimal){ // Животное убежало
        if (!(otherAnimal instanceof Animals)) {
            // Нападают только дикие животные
          //  return;
            if (otherAnimal._speed < this._speed) {
                this._health--; // Было совершено нападение, а значит отнимаем 1-ку здоровья
                console.log(`${this._nameAnimal} смогло убежать от дикого животного`)
            } else if (otherAnimal._power <= 3) {
                console.log(`${this._nameAnimal} Животное было ранено и убежало`);
            } else {
                this._health = 0;
                console.log(`${this._nameAnimal} было убито диким животным`);
            }
        } 
    }
    eat() { // Животное ест
        if (this._health < _health) {
            this._health++; // Животное восполняет здоровье
        }
    }
}


class Cow extends Animals { // Корова
    constructor() {
        super(7); // кол-во ресурсов
        this._weight = 50;
        this._speed = 2;
    }
}
class Rabbit extends Animals { // Кролик
    constructor() {
        super(4); // кол-во ресурсов
        this._weight = 5;
        this._speed = 5;
    }
}
class Hen extends Animals { // Курица
    constructor() {
        super(5); // кол-во ресурсов
        this._weight = 5;
        this._speed = 5;
    }
}
class Cat extends Animals { // Кот
    _edible = false; // Не съедобен
    constructor() {
        super(0); // 0 - количество ресурсов
        this._weight = 5;
        this._speed = 5;
    }
}

class wildAnimal extends Animals { // дикое животное
    _edible = false; // Не съедобен
    _kill = false;
    _speed = 5; // скорость
    _attack = randomInteger(0, 1);
    _power = 3; // сила
    constructor(name) {
        super(name);
        this._wildAnimals = [];
        this._wildAnimalArray = [Wolf, Bear, Fox];
        this._sourceAnimal = 0;
    }
    attack(otherAnimal) {
        if (otherAnimal instanceof wildAnimal) {
            throw new Error("Дикие животные не могут нападать друг на друга");
        } else if (this._attack === 1) {
            this._kill = true; // дикое животное убило домашнее
            console.log("Дикое животное", this, "убило домашнее животное");
        } else {
            otherAnimal.escape(this) // домашнее животное убежало
            console.log("Домашнее животное",otherAnimal,"убежало");
        }
    }
    addAnimal() {
       // Создаем массив из 5 элементов 
       while (this._wildAnimals.length < 5) {
            // Рандомное добавление дикого животного             
           this._wildAnimals.push(randomAnimal(this._wildAnimalArray));
       }
    }
}

class Wolf extends wildAnimal {
    _speed = 6;
    _power = 4;
    _weight = 35;
}
class Bear extends wildAnimal {
    _speed = 3;
    _power = 5;
    _weight = 70;
    
}
class Fox extends wildAnimal {
    _speed = 5;
    _weight = 30;  
}

class Farm {
    _homeanimal = [Cow, Rabbit, Hen, Cat];
    constructor(fermer, ...animals) {
        this._animals = animals;
        this._age = 1; // День на ферме 
        this._fermer = fermer; // добавили фермера на ферму
    }
    addAnimal(animal) {
        this._animals.push(animal);
    }

    passDay(wild) {
        this._age += 1;
        // Фермер тратит две единицы ресурсов
        this._resource = this._resource - 2;
        if (this._resource === 0) {
            console.log("Игра закончилась");
        }

        for (let index of this._animals) { // Создаем массив из 10 элементов 
            // Если здоровье животного 0, удаляем из массива 
            if (this._animals._health === 0) {
                this._animals._animals.splice(index, 1);
            } else if (this._animals.length < 10) {
                // Рождение нового животного             
                this.addAnimal(randomAnimal(this._homeanimal));
            }
        }
       
        // Приходит дикое животное (рандомно) и атакует рандомно домашнее животное
        let wild_ferm = wild[randomInteger(0, wild.length)]; // Животное которое, приходит на ферму
        wild_ferm.attack(this._animals[randomInteger(0, this._animals.length)]);

        fermer.collection(this._animals); // Сбор ресурсов
        fermer.drive_away(wild_ferm);// Прогоняет диких животных
        fermer.feed(this._animals); // Фермер кормит животрных
        fermer.eat(this._animals); // Фермер съедает животного у кторого не осталось ресурсов
    }
    
    getInfo() {
        for (let oneAnimal of this._animals) {
            // Если фермер жив 
            if (this._fermer._resource > 0) console.log(oneAnimal);
        }
    }
}

function randomAnimal(array) {
    let length = array.length;
    let index = randomInteger(0, length-1);
    return new array[index]();
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    min = Math.ceil(min); // Округление до ближайшего большего целого
    max = Math.floor(max); // Округление до ближайшего меньшего целого
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let fermer = new Fermer("Дмитрий");
let farm = new Farm(fermer);
farm.addAnimal(new Cat());
farm.addAnimal(new Rabbit());
farm.addAnimal(new Cow());
farm.addAnimal(new Hen());
//console.log(farm);
let wild = new wildAnimal("Дикое животное");
wild.addAnimal();
//console.log("Массив диких животных", wild._wildAnimals);

for (let i = 0; i < 1; i++) {
    farm.passDay(wild._wildAnimals); 
}
farm.getInfo();

/* На Ферме есть фермер, домашние животные(и птицы).
Максимальное количество животных(и птиц) на ферме - 10.

Фермер живет за счет ресурсов, собираемых с животных.
Изначально фермер создается с 5 единицами ресурсов.
Фермер должен иметь возможность:
1. собрать ресурсы с домашних животных, которые могут давать ресурсы
2. съесть домашнее животное, которое пригодно в пищу
(когда на ферме не останется животных, которые дают ресурсы).
При этом расчет ресурсов следующий: 1кг животного - 1 единица ресурса
3. прогнать дикое животное, которое пришло на ферму
4. кормить домашнее животное

Домашние животные: Корова, Кот, Курица, Кролик
обладают следующими характеристиками:
имя, вес, скорость, здоровье, количество ресурсов(у каждого свое и 0, если животное на дает ресурс)

Есть домашние животные, которые дают ресурсы: Корова, Курица
Есть домашние животные, которые пригодны в пищу: Кролик, Корова, Курица

Домашнее животное может убежать от дикого животного, если его скорость больше.
Домашнее животное может восполнять здоровье(+1, но не больше изначального).
Животные восполняют здоровье во время кормления(когда их кормит фермер).

Дикие животные:
Волк, Медведь, Лисица.
обладают следующими характеристиками:
имя, вес, скорость, сила
Дикое животное может съесть(либо ранить) домашнее животное, если оно не убежит(необходимо сравнивать скорость зверей).
Если домашнее животное было съедено, то оно не остается на ферме
    (из массива удалять не обязательно, можно использовать какой нибудь флаг, onFarm: true / false)!
Если фермер прогнал дикое животное с фермы 3 раза, то в 4й раз оно не может прийти на ферму.

День на ферме(метод класса Farm passDay):
1. Фермер тратит 2 единицы ресурсов(если ресурсов не осталось, игра заканчивается).
2. Приходит дикое животное(выбирается рандомно из массива с дикими животными), 
   пытается поймать(съесть, либо ранить) домашнее животное (выбирается рандомно).
    Если домашнее животное убежало, дикое уходит ни с чем.
3. Иногда(рандомно) фермер может прогнать дикое животное.
4. Фермер кормит всех животных(животные восполняют здоровье)
5. Фермер собирает ресурсы с животных, с которых можно их собирать.Если таких не осталось, съедает животное,
    пригодное в пищу(если такие остались).*/