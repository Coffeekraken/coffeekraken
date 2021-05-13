import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
export default {
    id: 'gravatar',
    args: {
        email: ''
    },
    process: function gravatar({ email, settings }) {
        const hash = __md5.encrypt(email);
        return `https://www.gravatar.com/avatar/${hash}`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmF2YXRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RCxlQUFlO0lBQ2IsRUFBRSxFQUFFLFVBQVU7SUFDZCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsT0FBTyxFQUFFLFNBQVMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUM1QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sbUNBQW1DLElBQUksRUFBRSxDQUFDO0lBQ25ELENBQUM7Q0FDRixDQUFDIn0=