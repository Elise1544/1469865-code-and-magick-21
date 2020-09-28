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

setup.classList.remove(`hidden`);

var shuffle = function (array) {
  for (var i = 0; i < array.length; i++) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

var fullnames = [];
var getFullName = function (names, surnames) {
  for (var i = 0; i < names.length; i++) {
    fullnames[i] = shuffle(names)[i] + ` ` + shuffle(surnames)[i];
  };
  return fullnames;
};

var wizards = [];
var players = function () {
  for (var j = 0; j < 4; j++) {
    wizards[j] = {
      name: getFullName(names, surnames)[j],
      coatColor: coatColor[Math.floor(Math.random() * coatColor.length)],
      eyesColor: eyesColor[Math.floor(Math.random() * eyesColor.length)]
    };
  }
  return wizards;
}

var wizards = players(fullnames, coatColor, eyesColor);

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
