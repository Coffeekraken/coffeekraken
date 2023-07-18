module.exports = function (migration) {
    const client = migration
        .createContentType('client')
        .name('Client')
        .description('')
        .displayField('name');

    client
        .createField('uid')
        .name('UID')
        .type('Symbol')
        .localized(false)
        .required(true)
        .validations([
            {
                unique: true,
            },
        ])
        .disabled(false)
        .omitted(false);

    client
        .createField('name')
        .name('Name')
        .type('Symbol')
        .localized(false)
        .required(true)
        .validations([
            {
                unique: true,
            },
        ])
        .disabled(false)
        .omitted(false);

    client
        .createField('description')
        .name('Description')
        .type('Text')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);

    client.changeFieldControl('uid', 'builtin', 'singleLine', {});
    client.changeFieldControl('name', 'builtin', 'singleLine', {});
    client.changeFieldControl('description', 'builtin', 'markdown', {});
    const service = migration
        .createContentType('service')
        .name('Service')
        .description('')
        .displayField('name');

    service
        .createField('uid')
        .name('UID')
        .type('Symbol')
        .localized(false)
        .required(true)
        .validations([
            {
                unique: true,
            },
        ])
        .disabled(false)
        .omitted(false);

    service
        .createField('name')
        .name('Name')
        .type('Symbol')
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);
    service
        .createField('description')
        .name('Description')
        .type('Text')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);

    service
        .createField('url')
        .name('Url')
        .type('Symbol')
        .localized(false)
        .required(true)
        .validations([
            {
                regexp: {
                    pattern:
                        '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
                    flags: null,
                },
            },
        ])
        .disabled(false)
        .omitted(false);

    service
        .createField('client')
        .name('Client')
        .type('Link')
        .localized(false)
        .required(true)
        .validations([
            {
                linkContentType: ['client'],
            },
        ])
        .disabled(false)
        .omitted(false)
        .linkType('Entry');

    service.changeFieldControl('uid', 'builtin', 'singleLine', {});
    service.changeFieldControl('name', 'builtin', 'singleLine', {});
    service.changeFieldControl('description', 'builtin', 'markdown', {});
    service.changeFieldControl('url', 'builtin', 'singleLine', {});
    service.changeFieldControl('client', 'builtin', 'entryLinkEditor', {});
};
