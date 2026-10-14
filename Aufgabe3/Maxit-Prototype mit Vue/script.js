var app= new Vue({
    el: '#app',
    data: {
        scorePlayer1: 0,
        scorePlayer2: 0,
        activeRow: 4,
        activeColumn: 4,
        activePlayer: 0,
        background: 'img/invis.gif',
        pictureCards: [],
        discoveredCards: 0,
        gridSize: 8,
        gameOver: false,
        gameOverMessage: ""
    },
    methods: {
        getColumnIndex(index){
            return index % this.gridSize;
        },
        getRowIndex(index){
            return Math.floor(index / this.gridSize);
        },
        isActiveRowColumn(index){
            if(this.activePlayer === 0){
                return this.getRowIndex(index) == this.activeRow;
            }
            else{
                return this.getColumnIndex(index)==this.activeColumn;
            }
        },
        isDiscovered(index){
            return this.pictureCards[index].discovered;
        },
        clickMethod(index){
            if(!this.isDiscovered(index)&&this.isActiveRowColumn(index))
            {
                let columnIndex=this.getColumnIndex(index);
                let rowIndex=this.getRowIndex(index);
                console.log("Hier wurde geklickt. Spalte: "+columnIndex+" Zeile: "+rowIndex);

                let card = this.pictureCards[index];
                card.discovered = true;

                let value = card.value;
                switch(this.activePlayer){
                    case 0:
                        this.scorePlayer1 += value;
                        this.activePlayer = 1;
                        break;
                    case 1:
                        this.scorePlayer2 += value;
                        this.activePlayer = 0;
                        break;
                }
                this.activeColumn=this.getColumnIndex(index);
                console.log("Neue aktive Spalte: "+this.activeColumn);
                this.activeRow = this.getRowIndex(index);
                console.log("Neue aktive Zeile: "+this.activeRow);

                if (this.isGameOver())
                {
                    this.gameOver = true;
                    this.gameOverMessage = this.getWinnerMessage();
                }
            }
            /* TODO: implement b)*/
        },
        computerMove(){
            /* TODO: implement b)*/
    

        },
        maxColumnValue(columnIndex){
            let maxValues = [];
            for (let row = 0; row < this.gridSize; row++)
            {
                const index = row * this.gridSize + columnIndex;
                if(maxValues===[])
                {
                    maxValues.push(this.pictureCards[index]);
                }
                else if(maxValues.at(0).value<this.pictureCards[index].value)
                {
                    //Sollten mehr als eine Karte mit vorherigen maxValues enthalten sein
                    //Einfach komplett alles löschen, da wir eine neue maxValue haben.
                    maxValues=[];
                    maxValues.push(this.pictureCards[index]);
                }
                else if(maxValues.at(0).value===this.pictureCards[index].value)
                {
                    //Mehrere Karten mit gleichen maxValues
                    maxValues.push(this.pictureCards[index]);
                }
            }
            console.log("Der höchste Wert der Spalte ist: "+maxValues.at(0).value);
            return maxValues;
        },
        maxRowValue(rowIndex){
            let maxValue = null;
            for (let column = 0; column < this.gridSize; column++)
            {
                //Überspringt, die Punktkarte in der aktuell aktiven Spalte,
                //da diese bei der Wahl des Computers nicht mehr vom Spieler verwendet werden kann.
                if(column===this.activeColumn)
                {
                    continue;
                }

                const index = rowIndex * this.gridSize + column;
                if(maxValue===null)
                {
                    maxValue=index;
                }
                else if(maxValue<index)
                {
                    maxValue=index;
                }
            }
            console.log("Der höchste Wert der Zeile ist: "+maxValue);
            return maxValue;
        },
        isGameOver(){

            let gameOver = true;

            if (this.activePlayer === 0)
            {
                for (let column = 0; column < this.gridSize; column++)
                {
                    const index = this.activeRow * this.gridSize + column;

                    if (!this.pictureCards[index].discovered)
                    {
                        gameOver = false;
                        break;
                    }
                }
            }
            else
            {
                for (let row = 0; row < this.gridSize; row++)
                {
                    const index = row * this.gridSize + this.activeColumn;

                    if (!this.pictureCards[index].discovered)
                    {
                        gameOver = false;
                        break;
                    }
                }
            }

            return gameOver;
        },
        getWinnerMessage() {
            if (this.scorePlayer1 > this.scorePlayer2)
            {
                return "Glückwunsch! Spieler 1 hat mit "+this.scorePlayer1+" Punkten gewonnen!";
            }

            if (this.scorePlayer2 > this.scorePlayer1)
            {
                return "Glückwunsch! Spieler 2 hat mit "+this.scorePlayer2+" Punkten gewonnen!";
            }

            return "Das Spiel endet unentschieden.";
        }
    },
    mounted(){
        const image_positives = [
            {pic: 'img/p1.png', value: 1, discovered: false},
            {pic: 'img/p2.png', value: 2, discovered: false},
            {pic: 'img/p3.png', value: 3, discovered: false},
            {pic: 'img/p4.png', value: 4, discovered: false},
            {pic: 'img/p5.png', value: 5, discovered: false},
            {pic: 'img/p6.png', value: 6, discovered: false},
            {pic: 'img/p7.png', value: 7, discovered: false},
            {pic: 'img/p8.png', value: 8, discovered: false},
            {pic: 'img/p9.png', value: 9, discovered: false},
            {pic: 'img/p10.png', value: 10, discovered: false}
        ];

        const image_negatives = [
            {pic: 'img/m1.png', value: -1, discovered: false},
            {pic: 'img/m2.png', value: -2, discovered: false},
            {pic: 'img/m3.png', value: -3, discovered: false},
            {pic: 'img/m4.png', value: -4, discovered: false},
            {pic: 'img/m5.png', value: -5, discovered: false},
            {pic: 'img/m6.png', value: -6, discovered: false},
            {pic: 'img/m7.png', value: -7, discovered: false},
            {pic: 'img/m8.png', value: -8, discovered: false},
            {pic: 'img/m9.png', value: -9, discovered: false},
            {pic: 'img/m10.png', value: -10, discovered: false}
        ];

        const images = new Array(this.gridSize * this.gridSize);
        for(var i = 0; i < images.length /2; i++)
        {
            images[i] = image_positives[Math.floor(Math.random()*image_positives.length)];
            images[i+images.length/2]=image_negatives[Math.floor(Math.random()*image_negatives.length)];
        }

        const shuffleArray = array =>{
            for(let i = array.length - 1; i> 0;i--){
                const j= Math.floor(Math.random()*(i+1));
                [array[i],array[j]]=[array[j],array[i]];
            }
        }
        shuffleArray(images);
        this.pictureCards=JSON.parse(JSON.stringify(images));
    },
});