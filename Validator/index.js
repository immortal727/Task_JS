// валидатор может обрабытывать текстовые поля
let rules = {
  login: {
    // login - значение атрибута data-validate
    // название полей соостветствует именам методов
    // валидатора
    required: true,
    minLength: 2,
    maxLength: 12,
  },
  password: {
    // password - значение атрибута data-validate
    required: true,
    minLength: 6,
  },
  password2: {
    // Повторение пароля
    required: true,
    minLength: 6,
  },
};
Validator.setForm (document.forms['auth-form'], rules)
  .setSuccess (() => {
    console.log ('Данные можно отправлять на сервер');
  })
  .setError (() => {
    console.log ('Форма заполнена с ошибками');
  })
  .run ();
