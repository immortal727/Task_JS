function Validator (setting) {
  let formEl = document.getElementById (setting.id);
  var formFields = formEl.elements;
  let showError = function (el) {
    //   Удаляем у родительского элементу класс
    // success и добавляем error
    el.parentNode.classList.remove ('success');
    el.parentNode.classList.add ('error');
    el.nextElementSibling.innerHTML = el.dtaaset.error;
  };
  let showSuccess = function (el) {
    el.parentNode.classList.remove ('error');
    el.parentNode.classList.add ('success');
    el.nextElementSibling.innerHTML = '';
  };
  // init here
  for(let i=0; i<formFields.length, i++){
    if(formFields[i].tagName=='BUTTON'){
        continue;
    }
    formFields[i].addEventListener(`change`,chekit);
  }
}
