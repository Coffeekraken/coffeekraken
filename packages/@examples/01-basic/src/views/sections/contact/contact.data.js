export default {
  contactForm: {
    action: '/',
    lnf: {
      labelType: 'float',
      spacing: 30,
      color: 'accent',
    },
    actions: {
      submit: {
        type: 'submit',
        label: 'Send my message!',
      },
    },
    fields: {
      name: {
        type: 'text',
        label: 'Name',
        name: 'name',
        placeholder: 'Firstname lastname',
        validations: {
          required: true,
        },
      },
      email: {
        type: 'text',
        label: 'Email',
        name: 'email',
        placeholder: 'something@something.com',
        validations: {
          required: true,
          email: true,
        },
      },
      url: {
        type: 'text',
        label: 'Website url',
        name: 'url',
        placeholder: 'coffeekraken.io',
        validations: {
          required: true,
          url: true,
        },
      },
      message: {
        type: 'textarea',
        label: 'Message',
        name: 'message',
        placeholder: 'Your message',
        attributes: {
          rows: 5,
        },
        validations: {
          required: true,
        },
      },
    },
  },
};
