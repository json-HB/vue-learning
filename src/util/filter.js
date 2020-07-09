export const demoFilter = function(value, type, str) {
    console.log(value, type, str);
    if (!value) return '';
    value = value.toString();
    value = value.charAt(0).toUpperCase() + value.slice(1);
    if (type != void 0 && str != '') {
        if (type == 'concat') {
            value = value.concat(` ${str}`);
        }
    }
    return value;
};
