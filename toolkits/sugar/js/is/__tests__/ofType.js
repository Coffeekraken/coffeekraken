"use strict";

const __SLog = require('../../../node/log/SLog');

module.exports = __isOfType => {
  describe('sugar.js.is.ofType', () => {
    it('Should detect the type of passed values correctly', () => {
      expect(__isOfType(true, 'Boolean')).toBe(true);
      expect(__isOfType(['item1'], 'Array')).toBe(true);
      expect(__isOfType({
        property1: 'hello'
      }, 'Object')).toBe(true);
      expect(__isOfType(12, 'Number')).toBe(true);
      expect(__isOfType(12.34, 'Number')).toBe(true);
      expect(__isOfType(12, 'Integer')).toBe(true);
      expect(__isOfType(12.34, 'Integer')).toBe(false);
      expect(__isOfType('Hello world', 'String')).toBe(true);
      expect(__isOfType([10, 20, 45], 'Array<Number>')).toBe(true);
      expect(__isOfType([10, '20', 45], 'Array<Number>')).toBe(false);
      expect(__isOfType([{
        something: 'cool'
      }], 'Array<Object>')).toBe(true);
      expect(__isOfType(__SLog, 'SLog')).toBe(true);
      expect(__isOfType([__SLog], 'Array<SLog>')).toBe(true);
      expect(__isOfType({
        something: __SLog
      }, 'Object<SLog>')).toBe(true);
      expect(__isOfType({
        something: 'Hello world'
      }, 'Object<SLog>')).toBe(false);
    });
  });
};