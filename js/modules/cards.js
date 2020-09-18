function cards() {
    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            // Последним аргшументом используем rest оператор
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); // Родитель в который будем помещать созданные карточки
            this.transfer = 27; // курс обмена доллара на гривну
            this.changeToUAH(); // вызов метода который будет переводить получаемую цену в долларах в гривны
        }

        changeToUAH() { // метод для перевода цены из доллара в гривну
            this.price = this.price * this.transfer;
        }

        render() { // метод который будет рендерить созданные карточки в документ
            const element = document.createElement('div'); // создание нового дива
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            // Так как мы не знаем сколько классов в итоге будет у элемента мы,
            // используя rest оператор получаем все классы в виде массива, 
            // а потом путем перебора этого массива добавляем каждый класс элементу
            element.innerHTML = ` 
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `; // Вставляем в новый элемент html код с заданными параметрами
            this.parent.append(element); // Вставляем полученный уже элемент в родителя
        }
    }

    const getResource = async (url) => { // флажок для обозначения асинхронного кода
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    // data.forEach(({img, altimg, title, descr, price}) => {
    //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    // });
    // });

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });




}

module.exports = cards;