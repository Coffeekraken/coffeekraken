export default {
    title: 'Contact us!',
    intro: 'We are always happy to hear from you!',

    address: {
        title: 'Address',
        name: 'Buzzbrothers',
        street: 'Rue Vautier 37',
        city: '1227 Carouge',
        phone: '+41 22 300 51 40',
        email: 'hello@buzzbrothers.ch',
    },
    socials: {
        facebookUrl: '/',
        twitterUrl: '/',
        instagramUrl: '/',
    },
    image: {
        url: 'https://clipart-library.com/new_gallery/24-245092_old-telephone-black-manufactured-by-indian-telephone-corded.png',
    },
    imageSide: 'right',
    // map: {
    //     markers: [
    //         {
    //             lat: 46.618038,
    //             lng: 7.05728,
    //         },
    //         {
    //             lat: 45.618038,
    //             lng: 8.05728,
    //         },
    //     ],
    // },
    form: {
        ajax: true,
        action: '/',
        lnf: {
            labelType: 'block',
        },
        actions: {
            submit: {
                type: 'submit',
                label: 'Send my message!',
                color: 'accent',
            },
        },
        fields: {
            name: {
                type: 'text',
                label: 'Name',
                name: 'name',
                placeholder: 'Firstname lastname',
                rules: {
                    required: true,
                },
            },
            email: {
                type: 'text',
                label: 'Email',
                name: 'email',
                placeholder: 'something@something.com',
                rules: {
                    required: true,
                    email: true,
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
                rules: {
                    required: true,
                },
            },
        },
        spacing: 30,
    },
    spaces: {
        paddingBlock: 80,
    },
};
