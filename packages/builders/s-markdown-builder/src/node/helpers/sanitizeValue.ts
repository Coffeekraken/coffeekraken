export default function sanitizeValue (string) {
    string = string?.toString?.() ?? '';
    return string.replace(/\n/gm, ' ')
}