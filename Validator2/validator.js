let validatorMethods = {
  notEmpty: function (el) {
    if ((el.value = '')) {
      return false;
    }
    return true;
  },
  // Для проверки соттветствия шаблона
  pattern: function (el, pattrn) {
    return pattrn.test(el.value);
  },
  contains: function (el, el2) {
    if (el.value == el2.value) {
      return true;
    }
    return false;
  },
};
function Validator(setting) {
  let formEl = document.getElementById(setting.id);
  let formFields = formEl.elements;
  let errors = [];
  let rulesPattern = {
    email: /^\w{1,}@\w{1, }\.\w{2,}$/,
    tel: /\+38\(\d{3}\)\d{7}/,
  };
  let showError = function (el) {
    //   Удаляем у родительского элементу класс
    // success и добавляем error
    el.parentNode.classList.remove('success');
    el.parentNode.classList.add('error');
    el.nextElementSibling.innerHTML = el.dtaaset.error;
  };
  let showSuccess = function (el) {
    el.parentNode.classList.remove('error');
    el.parentNode.classList.add('success');
    el.nextElementSibling.innerHTML = '';
  };
  let isValid = function (el) {
    let methods = setting[el.getAtribute(`id`)];
    if (methods !== undefined) {
      for (let i = 0; i < methods.length; i++) {
        if (validatorMethods[methods[i][0]](el, methods[i][1])) {
          error.push({el: el});
        }
      }
      for (let i = 0; i < error.length; i++) {
        if (error[i].el == el) {
          return false;
        }
      }
    }
    return true;
  };

  let chekit = function () {
    // определить правила проверки
    if (isValid(this)) {
      showSuccess(this);
      for (let i = 0; i < error.length; i++) {
        // Проверяем на каком (текущем) элелменте нужно удалить
        // удаление текущую ошибку
        if (error[i].el == this) {
          error.splice(i);
        }
      }
    } else {
      showError(this);
      errors.push({
        el: this,
      });
    }
  };
  // init here
  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i].tagName == 'BUTTON') {
      continue;
    }
    formFields[i].addEventListener(`change`, chekit);
  }
  for (let prop in setting.pattern) {
    // перезаписываем (патерн) условие на нужное
    rulesPattern[prop] = setting.pattern[prop];
  }
}
