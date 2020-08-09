export default {
  type: {
    type: 'String',
    required: true
  },
  required: {
    type: 'Boolean'
  },
  description: {
    type: 'String'
  },
  default: {
    type: null
  },
  static: {
    type: 'Boolean'
  },
  values: {
    type: 'Array'
  },
  regexp: {
    type: 'RegExp'
  },
  validator: {
    type: 'Function'
  }
};
