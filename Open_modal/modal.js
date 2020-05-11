!function (e) { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;) { if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);

// DOMContentLoaded - когда страница загружена
document.addEventListener('DOMContentLoaded', function () {
    /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
    let modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');
    // modalButtons и CloseButtons мы получаем через querySelectorAll, 
    // который возвращает массив, мы сделали это потому что нужно обрабатывать 
    // клики по всем кнопка, а вот overlay мы получаем через querySelector, 
    // он возвращает один элемент

    /* Перебираем массив кнопок */
    modalButtons.forEach(function (item) {
        /* Назначаем каждой кнопке обработчик клика */
        item.addEventListener('click', function (event) {
            event.preventDefault(); // Предотвращаем стандартные действия элемента

            /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
            let modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
       
            // Добавление нашему окну и подложке класс active
            modalElem.classList.add('active');
            overlay.classList.add('active');
        });
    });

    closeButtons.forEach(function (item) {
        item.addEventListener('click', function (e) {
            event.preventDefault(); // Предотвращаем стандартные действия элемента

            /* При клике на крестик нам нужно у этого же элемента найти родителя
             или деда с классом.modal и удалить у него класс.active.*/
            // Воспользуюсь готовой микро-библиотекой closest (код в верху)
            var parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }); // end foreach

    // Если нажата клавиша Esc
    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;
        if (key == 27) {
            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);

    // Закрытие окна по пустому месту вне модального
    overlay.addEventListener('click', function () {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });
});