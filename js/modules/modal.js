function modal() {
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

}

module.exports = modal;