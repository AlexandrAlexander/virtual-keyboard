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
    Rus: rusLayoyt,
    En: enLayoyt,
  };

  const defaultLayout = 'Rus';
  const activeLayout = defaultLayout;

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

  function createKeyboard(keyboardWrapper) {
    const layoutKeys = layouts[activeLayout].keys;
    keyboardKeys.forEach((keysRow, rowIndex) => {
      const keysRowNode = keyboardWrapper.appendChild(component('div', ['keysRow']));
      keysRow.forEach((key, keyIndex) => {
        const keyWrapper = keysRowNode.appendChild(component('div', ['keyWrapper', key]));
        const layoutKey = layoutKeys[rowIndex][keyIndex];
        if (layoutKey) {
          layoutKey.forEach((element, index) => {
            keyWrapper.appendChild(component('span', [index ? 'hidden' : ''], '', element));
          });
        }
      });
    });
  }

  const wrapper = document.body.appendChild(component('div', ['wrapper']));
  wrapper.appendChild(component('p', ['title'], 'title', 'RSS Виртуальная клавиатура'));
  wrapper.appendChild(component('textarea', ['textarea'], 'textarea'));
  const keyboard = wrapper.appendChild(component('div', ['keyboard'], 'keyboard'));
  createKeyboard(keyboard);
})();
