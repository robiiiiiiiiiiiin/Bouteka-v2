/**
 * Check the existance of a parameter in a mutli level object
 * 
 * @param {Object} o base object in which you want to look for a parameter
 * @param {String} path full path of the parameter you wanna check the existance for (e.g. 'param1.param2.param3')
 * @returns {Boolean} 
 */
export const checkPath = (o: {[k: string]: any} = {}, path: string): Boolean => {
    if (path.includes('.')) {
        if (o.hasOwnProperty(path.split('.')[0])) return checkPath(o[path.split('.')[0]], path.split('.').slice(1).join('.'));
        else return false
    } else return o.hasOwnProperty(path);
}

/**
 * Format a price to a fr-CH price
 * e.g. 41 -> 41,00
 * 
 * @param {String | number} price The price you want to convert
 * @returns {String} the formated price
 */
export const formatPrice = (price: string | number): string => {
    return parseFloat(price.toString()).toLocaleString('fr-CH', { minimumFractionDigits: 2 })
}