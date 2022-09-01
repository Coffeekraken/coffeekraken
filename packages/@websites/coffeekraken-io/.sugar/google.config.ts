export default function(api) {
    return {
        ga: api.env.devsCut ? null : 'UA-91271113-1'
    }
}