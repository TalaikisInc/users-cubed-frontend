import ReactTestUtils from 'react-addons-test-utils'
import configurable from 'gremlins.js/src/utils/configurable'
import Chance from 'gremlins.js/src/vendor/chance'

export const reactClicker = () => {

  const document = window.document;
  const body = document.body;

  const defaultClickTypes = [
    'click', 'click', 'click', 'click', 'click', 'click',
    'doubleClick', 'doubleClick',
    'mouseDown',
    'mouseUp',
    'mouseEnter', 'mouseEnter', 'mouseEnter',
    'mouseMove',
    'mouseLeave'
  ];

  /**
   * @mixin
   */
  const config = {
    clickTypes: defaultClickTypes,
    positionSelector: defaultPositionSelector,
    showAction: defaultShowAction,
    canClick: defaultCanClick,
    maxNbTries: 10,
    logger: {},
    randomizer: new Chance()
  };

  function defaultPositionSelector() {
    return [
      config.randomizer.natural({ max: document.documentElement.clientWidth - 1 }),
      config.randomizer.natural({ max: document.documentElement.clientHeight - 1 })
    ];
  }

  function defaultShowAction(x, y) {
    const clickSignal = document.createElement('div');
    clickSignal.style.border = '3px solid red';
    clickSignal.style['border-radius'] = '50%';
    clickSignal.style.width = '40px';
    clickSignal.style.height = '40px';
    clickSignal.style['box-sizing'] = 'border-box';
    clickSignal.style.position = 'absolute';
    clickSignal.style.webkitTransition = 'opacity 1s ease-out';
    clickSignal.style.mozTransition = 'opacity 1s ease-out';
    clickSignal.style.transition = 'opacity 1s ease-out';
    clickSignal.style.left = (x - 20) + 'px';
    clickSignal.style.top = (y - 20) + 'px';
    const element = body.appendChild(clickSignal);
    setTimeout(() => {
      body.removeChild(element);
    }, 1000);
    setTimeout(() => {
      element.style.opacity = 0;
    }, 50);
  }

  function defaultCanClick() {
    return true;
  }

  /**
   * @mixes config
   */
  function clickerGremlin() {
    let position;
    let posX;
    let posY;
    let targetElement;
    let nbTries = 0;
    do {
      position = config.positionSelector();
      posX = position[0];
      posY = position[1];
      targetElement = document.elementFromPoint(posX, posY);
      nbTries++;
      if (nbTries > config.maxNbTries) return false;
    } while (!targetElement || !config.canClick(targetElement));

    const clickType = config.randomizer.pick(config.clickTypes);

    ReactTestUtils.Simulate[clickType](targetElement);

    if (typeof config.showAction === 'function') {
      config.showAction(posX, posY);
    }

    if (typeof config.logger.log === 'function') {
      config.logger.log('gremlin', 'clicker   ', clickType, 'at', posX, posY);
    }
  }

  configurable(clickerGremlin, config);

  return clickerGremlin;
}
