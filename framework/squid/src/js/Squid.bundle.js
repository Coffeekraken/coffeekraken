import __squidViewToken from './tokens/squidViewToken';
import __registerAnimation from './core/registerAnimation';
import __animationExist from './core/animationExist';

import __log from './log/log';


class Squid {};
Squid.prototype.view = __squidViewToken;

Squid.prototype.registerAnimation = __registerAnimation;
Squid.prototype.animationExist = __animationExist;

Squid.prototype.log = __log;

window.Squid = new Squid();

setTimeout(() => {
  __log('Hello World');
}, 2000);


setTimeout(() => {
  __log('Hello World', 'error');
}, 5000);
