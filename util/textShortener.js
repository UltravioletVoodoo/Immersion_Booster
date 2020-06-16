export default function shorten(text, length) {
    if (text.length > length) {
        return text.split('').splice(0, length - 3).join('') + '...'
    }
    return text
}