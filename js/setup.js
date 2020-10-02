'use strict';

var setup = document.querySelector(`.setup`);
var setupSimilar = document.querySelector(`.setup-similar`);
var similarListElement = setup.querySelector(`.setup-similar-list`);
var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
var fragment = document.createDocumentFragment();
var names = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
var surnames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
var coatColor = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
var eyesColor = [`black`, `red`, `blue`, `yellow`, `green`];
var fireballsColor = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

// setup.classList.remove(`hidden`);

var shuffle = function (array) {
  for (var i = 0; i < array.length; i++) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

var getFullName = function () {
  var fullnames = [];
  for (var i = 0; i < names.length; i++) {
    fullnames[i] = shuffle(names)[i] + ` ` + shuffle(surnames)[i];
  }
  return fullnames;
};

var fullName = getFullName(names, surnames);

var players = function () {
  var charmer = [];
  for (var j = 0; j < 4; j++) {
    charmer[j] = {
      name: fullName[j],
      coatColor: coatColor[Math.floor(Math.random() * coatColor.length)],
      eyesColor: eyesColor[Math.floor(Math.random() * eyesColor.length)]
    };
  }
  return charmer;
};

var wizards = players(fullName, coatColor, eyesColor);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

for (var k = 0; k < wizards.length; k++) {
  fragment.appendChild(renderWizard(wizards[k]));
}
similarListElement.appendChild(fragment);

setupSimilar.classList.remove(`hidden`);


var setupOpen = document.querySelector(`.setup-open`);
var setupClose = setup.querySelector(`.setup-close`);
var userName = setup.querySelector(`.setup-user-name`);

var setupWizard = setup.querySelector(`.setup-wizard`);
var wizardInput = document.querySelector(`.setup-wizard-appearance`);
var wizardCoat = setupWizard.querySelector(`.wizard-coat`);
var coatInput = wizardInput.querySelector(`.coat-color`);
var wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
var eyesInput = wizardInput.querySelector(`.eyes-color`);
var fireballColor = setup.querySelector(`.setup-fireball-wrap`);
var fireballInput = fireballColor.querySelector(`.fireball-color`);

var rgbToHex = (rgb) => "#" + ((1 << 24) + (Number(rgb.match(/\d{1,3}/gi)[0]) << 16) + (Number(rgb.match(/\d{1,3}/gi)[1]) << 8) + Number(rgb.match(/\d{1,3}/gi)[2])).toString(16).slice(1);

var onSetupEscPress = function (evt) {
  if (userName === document.activeElement) {
    return evt;
  } else {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeSetup();
    }
  }
  return onSetupEscPress;
};

var openSetup = function () {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onSetupEscPress);
};

var closeSetup = function () {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onSetupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openSetup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openSetup();
  }
});

setupClose.addEventListener(`click`, function () {
  closeSetup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closeSetup();
  }
});

wizardCoat.addEventListener(`click`, function () {
  wizardCoat.style.fill = coatColor[Math.floor(Math.random() * coatColor.length)];
  coatInput.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener(`click`, function () {
  wizardEyes.style.fill = eyesColor[Math.floor(Math.random() * eyesColor.length)];
  eyesInput.value = wizardEyes.style.fill;
});

fireballColor.addEventListener(`click`, function () {
  fireballColor.style.backgroundColor = fireballsColor[Math.floor(Math.random() * fireballsColor.length)];
  let rgb = fireballColor.style.backgroundColor;
  fireballInput.value = rgbToHex(rgb);
});
