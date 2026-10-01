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
        nullstellen.push(geradenBerechnung(b,c));
        text+="x= "+nullstellen.at(0);
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
            text += "x = "+nullstellen.at(0);
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

//------------------------------ Canvas ------------------------------
/*
 * Konstanten für Canvas werden herausgezogen, damit sie überall verwendet werden können.
 */

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

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {any[]} nullstellen
 */
function paintCanvas(a, b, c,nullstellen){

    context.clearRect(0,0,canvas.width, canvas.height);
    context.beginPath();

    //X
    context.moveTo(toCanvasX(min), toCanvasY(0));
    context.lineTo(toCanvasX(max), toCanvasY(0));
    //Y
    context.moveTo(toCanvasX(0), toCanvasY(max));
    context.lineTo(toCanvasX(0), toCanvasY(min));

    context.stroke();

    paintPolynom(a,b,c);

    paintNullstellen(nullstellen);
}

function paintPolynom(a,b,c)
{
    let calculateY = function (x) {
        return a * Math.pow(x, 2) + b * x + c;
    }

    context.beginPath();
    context.moveTo(toCanvasX(min),toCanvasY(calculateY(min)));

    for(let x=min+0.1; x<=max; x+=0.1)
    {
        context.lineTo(toCanvasX(x),toCanvasY(calculateY(x)));
    }

    context.stroke();
}

/**
 * Zeichnet die Nullstellen als rote Kreise mit Radius 3 ein
 * @param nullstellen
 */
function paintNullstellen(nullstellen)
{
    nullstellen.forEach(x =>
        {
            if(x>=min && x<=max)
            {
                context.beginPath();

                context.arc(
                    toCanvasX(x),
                    toCanvasY(0),
                    3,
                    0,
                    2 * Math.PI //https://www.w3schools.com/tags/canvas_arc.asp
                );

                context.fillStyle = "red";
                context.fill();
            }
        }
    );
}



