/**
 * Calculates ax^2+bx+c=0
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
function nullstellenBerechnen(a, b, c)
{
    var nullstellen = [];
    const determinant = Math.pow(b, 2) - 4 * a * c;

    if(determinant>=0)
    {
        const denominator = 2*a;
        const numeratorPlus = -b + Math.sqrt(determinant);
        const x1 = numeratorPlus/denominator;

        nullstellen.push(x1);
        if(determinant>0)
        {
            const numeratorMinus = -b - Math.sqrt(determinant);
            const x2 = numeratorMinus/denominator;
            nullstellen.push(x2);
        }
    }

    return nullstellen;
}