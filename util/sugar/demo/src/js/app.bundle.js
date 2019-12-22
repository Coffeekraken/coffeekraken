import "@babel/polyfill";
import "../../../dist/js/feature/all";

import CryptoJS from 'crypto-js';

import hotkey from '../../../dist/js/keyboard/hotkey';

import aes from '../../../dist/js/crypt/aes';
import md5 from '../../../dist/js/crypt/md5';
import sha1 from '../../../dist/js/crypt/sha1';
import sha256 from '../../../dist/js/crypt/sha256';

import sha224 from '../../../dist/js/crypt/sha224';

import sha512 from '../../../dist/js/crypt/sha512';

import sha384 from '../../../dist/js/crypt/sha384';

import sha3 from '../../../dist/js/crypt/sha3';

import ripemd160 from '../../../dist/js/crypt/ripemd160';
import pbkdf2 from '../../../dist/js/crypt/pbkdf2';
import evpkdf from '../../../dist/js/crypt/evpkdf';

import rc4 from '../../../dist/js/crypt/rc4';



console.log(CryptoJS);

const m = md5.encrypt('Plop');
console.log(m);
console.log(md5.decrypt(m));

const s = sha1.encrypt('COOOOOOCOCOCOCOC');
console.log(s);
console.log(sha1.decrypt(s));

const ss = sha256.encrypt('wfuhwefuzwgfuzwgezufg');
console.log(ss);
console.log(sha256.decrypt(ss));

const sss = sha224.encrypt('sjjsjs');
console.log(sss);
console.log(sha224.decrypt(sss));

const ssss = sha512.encrypt('99999d9d9d9d9d9d9');
console.log(ssss);
console.log(sha512.decrypt(ssss));

const sssss = sha384.encrypt('ggg');
console.log(sssss);
console.log(sha384.decrypt(sssss));

const ssssss = sha3.encrypt('slslslslslsls');
console.log(ssssss);
console.log(sha3.decrypt(ssssss));

const sssssss = ripemd160.encrypt('ppppp');
console.log(sssssss);
console.log(ripemd160.decrypt(sssssss));

const ssssssss = pbkdf2.encrypt('f89f8wfeuf 8u 89u 8u');
console.log(ssssssss);
console.log(pbkdf2.decrypt(ssssssss));

const sssssssss = evpkdf.encrypt('HDUHIUHI   (Z/(Z (/Z (/Z))))');
console.log(sssssssss);
console.log(evpkdf.decrypt(sssssssss));

const ssssssssss = rc4.encrypt('9dsssssss   (Z/(Z (/Z (/Z))))');
console.log(ssssssssss);
console.log(rc4.decrypt(ssssssssss));

const f = aes.encrypt('coco');
console.log(f);
console.log(aes.decrypt(f));

const stop = hotkey('ctrl+c', (event, handler) => {
  console.log('click');
  console.log(event, handler);
});
//
// setTimeout(() => {
//   stop();
// }, 10000);
