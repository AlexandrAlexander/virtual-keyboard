(() => {
  const keyboardKeys = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
    ['ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight'],
  ];

  const rusLayoyt = {
    keys: [
      [['\u0451', '\u0401'], ['1', '!'], ['2', '"'], ['3', '\u2116'], ['4', ';'], ['5', '%'], ['6', ':'], ['7', '?'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Bksp', 'Bksp']],
      [['Tab', 'Tab'], ['\u0439', '\u0419'], ['\u0446', '\u0426'], ['\u0443', '\u0423'], ['\u043A', '\u041A'], ['\u0435', '\u0415'], ['\u043D', '\u041D'], ['\u0433', '\u0413'], ['\u0448', '\u0428'], ['\u0449', '\u0429'], ['\u0437', '\u0417'], ['\u0445', '\u0425'], ['\u044A', '\u042A'], ['\\', '/']],
      [['Caps', 'Caps'], ['\u0444', '\u0424'], ['\u044B', '\u042B'], ['\u0432', '\u0412'], ['\u0430', '\u0410'], ['\u043F', '\u041F'], ['\u0440', '\u0420'], ['\u043E', '\u041E'], ['\u043B', '\u041B'], ['\u0434', '\u0414'], ['\u0436', '\u0416'], ['\u044D', '\u042D'], ['Enter', 'Enter']],
      [['Shift', 'Shift'], ['/', '|'], ['\u044F', '\u042F'], ['\u0447', '\u0427'], ['\u0441', '\u0421'], ['\u043C', '\u041C'], ['\u0438', '\u0418'], ['\u0442', '\u0422'], ['\u044C', '\u042C'], ['\u0431', '\u0411'], ['\u044E', '\u042E'], ['.', ','], ['Shift', 'Shift']],
      [['Ctrl', 'Ctrl'], ['Alt', 'Alt'], [' ', ' '], ['Alt', 'Alt'], ['Ctrl', 'Ctrl']],
    ],
  };

  const enLayoyt = {
    keys: [
      [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Bksp', 'Bksp']],
      [['Tab', 'Tab'], ['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', 'Y'], ['u', 'U'], ['i', 'I'], ['o', 'O'], ['p', 'P'], ['[', '{'], [']', '}'], ['\\', '|']],
      [['Caps', 'Caps'], ['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'], ['k', 'K'], ['l', 'L'], [';', ':'], ["'", '"'], ['Enter', 'Enter']],
      [['Shift', 'Shift'], ['/', '|'], ['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'], [',', '<'], ['.', '>'], ['/', '?'], ['Shift', 'Shift']],
      [['Ctrl', 'Ctrl'], ['Alt', 'Alt'], [' ', ' '], ['Alt', 'Alt'], ['Ctrl', 'Ctrl']],
    ],
  };

  const layouts = {
    rus: rusLayoyt,
    eng: enLayoyt,
  };

  const specialKeys = ['Backspace', 'Tab', 'Enter', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'AltLeft', 'AltRight', 'ControlLeft', 'ControlRight', 'MetaLeft', 'Delete'];

  const defaultLayout = 'rus';
  let activeLayout = localStorage.lang || defaultLayout;
  let CapsLockState = false;

  function component(type, classes = [], id = '', content = '') {
    const element = document.createElement(type);
    classes.forEach((elemClass) => {
      if (elemClass) {
        element.classList.add(elemClass);
      }
    });
    if (id) {
      element.setAttribute('id', id);
    }
    if (content) {
      element.innerHTML = content;
    }
    return element;
  }

  function findDeep(element, target) {
    if (Array.isArray(element)) {
      return element.find((subElement) => findDeep(subElement, target));
    }
    return element === target;
  }

  function toggleLang() {
    activeLayout = activeLayout === 'eng' ? 'rus' : 'eng';
  }

  function toggleCase() {
    const keyboard = document.getElementById('keyboard');
    const keys = keyboard.querySelectorAll('span');
    keys.forEach((keyElement) => keyElement.classList.toggle('hidden'));
  }

  function getKeyInCase(key, textContent) {
    let result = textContent;
    if ((CapsLockState && key.classList.contains('shiftLayout')) || (!CapsLockState && !key.classList.contains('shiftLayout'))) {
      result = textContent.toLowerCase();
    } else {
      result = textContent.toUpperCase();
    }
    return result;
  }

  function createKeyboard() {
    localStorage.setItem('lang', activeLayout);
    const keyboard = document.getElementById('keyboard');
    const layoutKeys = layouts[activeLayout].keys;
    keyboardKeys.forEach((keysRow, rowIndex) => {
      const keysRowNode = keyboard.appendChild(component('div', ['keysRow']));
      keysRow.forEach((key, keyIndex) => {
        const keyWrapper = keysRowNode.appendChild(component('div', ['keyWrapper', key], key));
        const layoutKey = layoutKeys[rowIndex][keyIndex];
        if (layoutKey) {
          keyWrapper.appendChild(component('span', [], '', layoutKey[0]));
          keyWrapper.appendChild(component('span', ['shiftLayout', 'hidden'], '', layoutKey[1]));
        }
      });
    });
  }

  function changeKeyboardLayout() {
    localStorage.setItem('lang', activeLayout);
    const keyboard = document.getElementById('keyboard');
    const layoutKeys = layouts[activeLayout].keys;
    keyboardKeys.forEach((keysRow, rowIndex) => {
      keysRow.forEach((key, keyIndex) => {
        const [keyWrapper] = keyboard.getElementsByClassName(key);
        const keys = keyWrapper.querySelectorAll('span');
        const layoutKey = layoutKeys[rowIndex][keyIndex];
        if (layoutKey) {
          layoutKey.forEach((element, index) => {
            if (specialKeys.includes(key)) {
              keys[index].innerHTML = element;
            } else {
              keys[index].innerHTML = getKeyInCase(keys[index], element);
            }
          });
        }
      });
    });
  }

  function addActiveState(currentElement) {
    return currentElement && currentElement.classList.add('active');
  }

  function removeActiveState(element) {
    return element && element.classList.contains('active') && element.classList.remove('active');
  }

  function keyDownHandler(e) {
    if (!keyboardKeys.find((element) => findDeep(element, e.code))) {
      return;
    }

    e.preventDefault();

    const keyboard = document.getElementById('keyboard');
    const [currentElement] = keyboard.getElementsByClassName(e.code);
    addActiveState(currentElement);

    if (e.code === 'ShiftLeft') {
      if (e.repeat) {
        return;
      }
      toggleCase();
    }
    if (e.code === 'CapsLock') {
      if (e.repeat) {
        return;
      }
      CapsLockState = !CapsLockState;
      changeKeyboardLayout();
    }
    if ((e.code === 'AltLeft' && e.shiftKey) || (e.code === 'ShiftLeft' && e.altKey)) {
      toggleLang();
      changeKeyboardLayout();
    }
  }

  function keyUpHandler(e) {
    const keyboard = document.getElementById('keyboard');
    const [currentElement] = keyboard.getElementsByClassName(e.code);

    if (e.code === 'ShiftLeft') {
      toggleCase();
    }
    if (e.code === 'CapsLock' && CapsLockState) {
      return;
    }
    removeActiveState(currentElement);
  }

  function mouseDownHandler() {

  }

  function mouseUpHandler() {

  }

  const wrapper = document.body.appendChild(component('div', ['wrapper']));
  wrapper.appendChild(component('p', ['title'], 'title', 'RSS Виртуальная клавиатура'));
  wrapper.appendChild(component('textarea', ['textarea'], 'textarea'));
  wrapper.appendChild(component('div', ['keyboard'], 'keyboard'));
  createKeyboard();
  wrapper.appendChild(component('p', ['description'], 'description', 'Клавиатура создана в операционной системе Windows'));
  wrapper.appendChild(component('p', ['language'], 'language', 'Для переключения языка комбинация: левыe shift + alt'));

  document.addEventListener('keyup', keyUpHandler);
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('mouseup', mouseUpHandler);
  document.addEventListener('mousedown', mouseDownHandler);
})();
