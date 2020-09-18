function timer() {
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

}

module.exports = timer;