window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        // Получаем все табы с заголовками
        tabsContent = document.querySelectorAll('.tabcontent'),
        // ПОлучаем все табы с контентом
        tabsParent = document.querySelector('.tabheader__items');
    // Получаем родителя табов с заголовками

    function hideTabContent() { // Создаем функцию которая будет прятать все табы с контентом
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
            // С помощью этого перебора все табы с контентом получат display none
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
            // С помощтю этого перебора все табы с заголовками лишатся активного класса
        });
    }

    function showTabContent(i = 0) { // Если функция вызывается без аргумента он будет по  умолчанию равен 0
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        // Данная функция работает для показа нужного таба 
        tabs[i].classList.add('tabheader__item_active'); // Так же нужному табу заголовку добавляется класс активности
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => { // Используем делегирвоание событий на родителе табов с заголовками
        const target = event.target; // Создаем переменную равную объекту события

        if (target && target.classList.contains('tabheader__item')) {
            // Условие если target есть и если он содерижт нужный нам класс
            // То мы запускаем цикл перебора всех всех табов - заголовков
            tabs.forEach((item, i) => {
                if (target == item) {
                    // Если объект на который кликнули совпадает с перебираемым то
                    // Мы вызываем две функции созданные выше
                    hideTabContent(); // Прячет все табы с контентом
                    showTabContent(i);// Показывает таб с индексом i 
                }
            });
        }
    });

    // Timer start

    const deadline = '2020-09-10'; // Дата до окончания отсчета

    function getTimeRemaining(endtime) { // функция для вычисления -
        const t = Date.parse(endtime) - Date.parse(new Date()), // Оставшегося времени в милисекундах
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // общего количества дней оставшихся
            hours = Math.floor((t / (1000 * 60 * 60)) % 24), // Общего количестка оставшихся часов
            minutes = Math.floor((t / (1000 * 60)) % 60), // Общего количества оставшхся минут
            seconds = Math.floor((t / 1000) % 60); // Общее количество оставшихся секунд

        return { // Функция возвращает объект с полученными вычислениями
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) { // Функция для того чтобы добавлять 0 перед однозначными числами
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) { // Функция для выставления времени в нашу структуру
        const timer = document.querySelector(selector), // Получаем родителя всех отделов времиени
            days = timer.querySelector('#days'), // Получаем элемент отображающий дни на странице
            hours = timer.querySelector('#hours'), // Получаем элемент отображающий часы на странице
            minutes = timer.querySelector('#minutes'), // Получаем элемент отображающий минуты на странице
            seconds = timer.querySelector('#seconds'), // Получаем элемент отображающий секунды на странице
            timeInterval = setInterval(updateClock, 1000); // Запускаем метод setInterval для обновления счетчика каждую секунду

        updateClock(); // вызываем функция обновления часов сразу чтобы она не начиналась после 1 секунды по интервалу
        // а сразу обновляла счетчик, а потмо уже обновлялась каждую секунду

        function updateClock() { // Функция которая и будет обновлять счетчик
            // ее мы задаем в качестве аргумента для setInterval
            const t = getTimeRemaining(endtime); // Получаем объект возвращенный предыдущей функцией

            days.innerHTML = getZero(t.days); // вставляем полученные значения из этого объекта
            // и вставляем их в нашу верстку
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { // Останавливаем интервал обновления счетчика

                days.innerHTML = 0;
                hours.innerHTML = 0;
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Timer End

    // Modal Start

    const modalTrigger = document.querySelectorAll('[data-modal]'), // Поулчаем кнопки для открытия модального окна
        modal = document.querySelector('.modal'); // Получаем само модальное окно
    // modalCloseBtn = document.querySelector('[data-close]'); // Получаем кнопку закрытия модального окна



    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show'); // КАК ВАРИАНТ
        document.body.style.overflow = 'hidden'; // Фиксируем положение сайта, чтобы он не скролился
        // при открытом модальном окне
        clearInterval(modalTimerID); // Если модальное окно было открыто 1 раз, то оно больше не будет открываться автоматически
    }


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }


    // modalCloseBtn.addEventListener('click', closeModal);


    // modalCloseBtn.addEventListener('click', () => {
    //     modal.classList.remove('show'); // так как этот код у нас повторяется несколько раз
    //     // мы его выносим в отдельную функцию которую потом сможем использовать повторно
    //     modal.classList.add('hide');
    //     // modal.classList.toggle('show');// КАК ВАРИАНТ
    //     document.body.style.overflow = ''; // Возвращаем параметру overflow у body значение по умолчанию
    // });

    modal.addEventListener('click', (e) => { // Делаем так чтобы при клике на пустое пространство
        // Вокруг модального окна оно так же закрывалось

        if (e.target == modal || e.target.getAttribute('[data-close]') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { // вешаем на document обработчик события 
        // Который будет отслеживать нажатие клавищи Esc и закрывать при этом наше модальное окно
        if (e.code === 'Escape' && modal.classList.contains('show')) { // Если свойство code у e === 'escape' закрыввается модальное окно
            closeModal();
        }
    });

    const modalTimerID = setTimeout(openModal, 50000); // через 2 секунды модальное окно откроется автоматически

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            // Если отскроленное пространство сайта + высотклиентского окна браузера = общей высоте документа 
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // Удаляем обработчик события после того как 
            // Его функция выполнилась один раз
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Modal End

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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        ".menu__field .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        15,
        ".menu__field .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ",
        10,
        ".menu__field .container"
    ).render();

    // Работа с сервером для форм

    const forms = document.querySelectorAll('form'),
        message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что то пошло не так...'
        };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);



            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form); // Чтобы работать с формой с помощью такого конструктора необходимо для всех unput всегда указывать аттрибут name

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            fetch('server1.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));

});