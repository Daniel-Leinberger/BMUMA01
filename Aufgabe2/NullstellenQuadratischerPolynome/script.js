/**
 * Calculates ax^2+bx+c=0
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
function nullstellenBerechnen(a, b, c)
{
    var result = document.getElementById("result");
    var nullstellen = [];
    var text="";

    if(a==0&&b==0)
    {
        if (c == 0)
        {
            text = "Da 0 = 0 gibt es unendlich viele Lösungen. "
        }
        else
        {
            text = "Da a und b = 0, lautet die Gleichung " + c + " = 0. Es gibt keine Lösung!";
        }
    }
    else if(a==0&&b!=0)
    {
        let polynom = b+"x+"+c;
        text = "a = 0! Daher ändert sich das Polynom zu: "+polynom+"<br>";
        text+="x= "+geradenBerechnung(b, c);
    }
    else
    {
        let polynom = a+"x<sup>2</sup>+"+b+"x+"+c;
        nullstellen = mitternachtsformel(a,b,c);

        if(nullstellen.length==0)
        {
            text+="<br>Das angegebene Polynom besitzt <b>keine</b> Nullstellen";
        }
        else if(nullstellen.length==1)
        {
            text = "Das Polynom "+polynom+" hat die Nullstelle:<br>";
            text += "x = "+nullstellen.pop();
        }
        else {
            text = "Das Polynom " + polynom + " hat die Nullstellen:<br>";
            for (let x = 1; x <= 2; x++) {
                text += "x<sub>" + x + "</sub>= " + nullstellen.at(x - 1) + "<br>";
            }
        }
    }

    paintCanvas(a,b,c,nullstellen);
    result.innerHTML = text;
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {any[]} nullstellen
 */
function paintCanvas(a, b, c, nullstellen){
    const canvas = document.getElementById("polynom_canvas");
    const context = canvas.getContext("2d");
    const min = -10;
    const max = 10;
    const toCanvasX = function (x) {
        return (x + (max - min) / 2) * canvas.width / (max - min);
    };
    const toCanvasY = function (y) {
        return canvas.height - (y + (max - min) / 2) * canvas.height / (max - min);
    };

    context.beginPath();
    context.moveTo(toCanvasX(-10), toCanvasY(0));
    context.lineTo(toCanvasX(10), toCanvasY(0));
    context.moveTo(toCanvasX(0), toCanvasY(10));
    context.lineTo(toCanvasX(0), toCanvasY(-10));
    context.stroke();
    return;

}

function geradenBerechnung(b, c)
{
    let x = 0;
    if(b!=0)
    {
        x = -c/b;
    }
    return x;
}


function mitternachtsformel(a, b, c)
{
    let nullstellen = [];
    const discriminant = Math.pow(b, 2.0) - 4.0 * a * c;

    if(discriminant>=0)
    {
        const denominator = 2.0*a;
        const numeratorPlus = -b + Math.sqrt(discriminant);
        const x1 = numeratorPlus/denominator;
        nullstellen.push(x1);

        //Wenn >0 => 2 Nullstellen
        if(discriminant>0)
        {
            const numeratorMinus = -b - Math.sqrt(discriminant);
            const x2 = numeratorMinus/denominator;
            nullstellen.push(x2);
        }
    }
    return nullstellen;
}

