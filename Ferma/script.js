class Fermer {
    _quantity = 10;
    _resource = 5; // Первоначальное значение единиц ресурсов фермера
    _prognal = false;
    constructor(name) {
        this._name = name; // имя фермера
        this._driveAway = 0; // Счетчик диких животных, сколько смог прогнать фермер
    }

    collection(otherAnimal) { // Сбор ресурсов с животных
        if ((otherAnimal instanceof Animals) || otherAnimal._sourceAnimal!=0) {
            _resource++; // Фермер восполняет свои ресурсы
            otherAnimal._sourceAnimal--; // Ресурсы животного уменьшаются на 1-ку
        }
    }

    eat(otherAnimal) {
        if (!(otherAnimal instanceof Animals) && otherAnimal._edible === false) {
            throw new Error("Фермер не сможеть съесть чужое животное");
        } else if (this._resource === 0) {
            this._resource += otherAnimal._sourceAnimal;
            otherAnimal._health = 0;
        }
        else console.log(`${otherAnimal._nameAnimal} нельзя съесть`);
    }

    drive_away(otherAnimal) { // Фермер прогоняет другое животное
        this._resource--; // Затрачивает свои силы (ресурсы) - в любом случае, 
        // прогнал он дикое животное или нет
        if (!(otherAnimal instanceof Animals) || this._driveAway <= 3 || otherAnimal._attack === 0) {
            this._prognal = true;
            this._driveAway++;
        } else {
            this._prognal = false;
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
    _sourceAnimal = 3; // кол-во ресурсов
    _edible = true; // съедобно/несъедобно
    constructor(name) {
        this._nameAnimal = name;
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
        if (!(otherAnimal instanceof Animals) || otherAnimal._speed < this._speed) {
            _health--; // Было совершено нападение, а значит отнимаем 1-ку здоровья
            console.log(`${this._nameAnimal} смогло убежать от дикого животного`)
        } else if (otherAnimal._power <= 3) {
            console.log(`${this._nameAnimal} Животное было ранено и убежало`);
        } else {
            console.log(`${this._nameAnimal} было убито диким животным`);
        }
    }
    eat() { // Животное ест
        if (this._health < _health) {
            this._health++; // Животное восполняет здоровье
        }
    }
}

class Cow extends Animals{ // Корова
    constructor() {
        super(7); // кол-во ресурсов
        this._weight = 50;
        this._speed = 2; 
    }
}
class Rabbit extends Animals { // Кролик
    constructor() {
        super(7); // кол-во ресурсов
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
    }
    attack(otherAnimal) {
        if (otherAnimal instanceof wildAnimal) {
            throw new Error("Дикие животные не могут нападать друг на друга");
        } else if (this._attack === 1) {
            this._kill = true; // дикое животное убило домашнее
        } else {
            otherAnimal.escape() // домашнее животное убежало
            otherAnimal._health--;
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
    }
    
    getInfo() {
        // Если фермер жив 
        
       for (let oneAnimal of this._animals) {
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
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
let fermer = new Fermer("Дмитрий");
let animal = new Farm(fermer);
animal.addAnimal(new Cat());
animal.addAnimal(new Rabbit());
animal.addAnimal(new Cow());
animal.addAnimal(new Hen());
let wild = new wildAnimal("Дикое животное");
// Создаем диких животных
wild.addAnimal();
//console.log("Массив диких животных",wild._wildAnimals)
let farm = new Farm(fermer, animal);
for (let i = 0; i < 5; i++) {
    farm.passDay(wild._wildAnimals);
    wild.attack(animal); // Приходит дикое животное
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