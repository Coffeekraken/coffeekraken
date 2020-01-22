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

function importAll (r) {
  console.log(r.keys());
  r.keys().forEach(key => {
    console.log(key);
    const transportFn = r(key).default;
    const transportName = key.replace('./','').replace('.js','');
    console.log(transportFn, typeof transportFn);
    __registerLogTransport(transportName, transportFn);
  });
}

setTimeout(() => {
  __log('Hello World');
}, 2000);


setTimeout(() => {
  __log('Hello World');
}, 5000);

//
// // importAll(require.context('./log/transports', false, /\.js$/));
// __lazyImport('@squid/log/transports/squid.js').then(m => {
//   console.log('MODULE LOADED', m);
// });
