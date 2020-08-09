import __definitionObjectDefinition from '../object/definitionObjectDefinition';
export default {
  ...__definitionObjectDefinition,
  description: {
    type: 'String',
    required: true
  },
  alias: {
    type: 'String'
  },
  level: {
    type: 'Integer'
  }
};
