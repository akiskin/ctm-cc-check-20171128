//"Intergation" function used in components
function processCreditCard(cc) {
    let ti = cc.replace(/[^0-9]/g, ''); //"trusted" input
    return {cc: ti, type: identifyCard(ti), valid: luhnChk(ti)};
}

//Luhm Check
// Credits to https://gist.github.com/2134376 Phil Green (ShirtlessKirk)
export function luhnChk(luhn) {

    let ti = luhn.replace(/[^0-9]/g, ''); //"trusted" input

    if (ti === '') { return false } //no need to calc

    var len = ti.length,
        mul = 0,
        prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
        sum = 0;

    while (len--) {
        sum += prodArr[mul][parseInt(ti.charAt(len), 10)];
        mul ^= 1;
    }

    return sum % 10 === 0 && sum > 0;
};

//Finding out card type
export function identifyCard(cc) {

    let ti = cc.replace(/[^0-9]/g, ''); //"trusted" input

    if (ti === '') { return 'Unknown' } //no need to check further

    //Amex
    if (ti.startsWith('34') && ti.length === 15) { return 'AMEX'}
    if (ti.startsWith('37') && ti.length === 15) { return 'AMEX'}

    //Discover
    if (ti.startsWith('6011') && ti.length === 16) { return 'Discover'}
    
    //MC
    if (['51','52','53','54','55'].indexOf(ti.substr(0,2)) >= 0 && ti.length === 16) { return 'MasterCard'}

    //Visa
    if (ti.startsWith('4') && ti.length === 13) { return 'Visa'}
    if (ti.startsWith('4') && ti.length === 16) { return 'Visa'}
    
    return 'Unknown';
}

export default processCreditCard;