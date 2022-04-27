export default function firstLetterUpperCase (arr) {
    if (arr) {
        let str = arr?.split('');
        str[0] = str[0].toUpperCase();
        return str.join('');
    }
};