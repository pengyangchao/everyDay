'use strict';
var game = {

    data: null, RN: 4, CN: 4,

    start() {
        this.data = [];

        for (var i = 0; i < this.RN; i++) {
            this.data[i] = [];

            for (var j = 0; j < this.CN; j++) {
                this.data[i][j] = 0;
            }
        }

        this.randomNum();
        this.randomNum();

        console.log(this.data.join('\n'));

        this.updateView();
    },

    updateView(){
        for(var r=0;r<this.RN;r++)
        {
            for(var c=0;c<this.CN;c++)
            {
                var n=this.data[r][c];
                var div=document.getElementById('c'+r+c);
                if(n!=0){
                    div.innerHTML=n;
                    div.className='cell n'+n;
                }
            }
        }
    },

    randomNum() {
        while (true) {
            var r = Math.floor(Math.random() * this.RN);
            var c = Math.floor(Math.random() * this.CN);

            if (this.data[r][c] == 0) {
                this.data[r][c] = Math.random() < 0.5 ? 2 : 4;
                break;
            }
        }
    },



}
game.start();


