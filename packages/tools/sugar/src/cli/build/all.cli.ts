import _scss from './scss.cli';
import _js from './js.cli';
import _frontspec from './frontspec.cli';

export default () => {
  _scss();
  _js();
  _frontspec();
};
