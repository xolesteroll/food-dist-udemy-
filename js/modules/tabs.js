function tabs() {
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
}

module.exports = tabs;