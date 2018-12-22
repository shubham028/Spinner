
            var canvas = document.querySelector('canvas');

            var ctx = canvas.getContext('2d');

            var width = canvas.width = 420;
            var height = canvas.height = 420;

            function random(min, max) {
                var num = Math.floor(Math.random() * (max - min + 1)) + min;
                return num;
            }
            function Shape(x, y,color) {
                this.x = x;
                this.y = y;
                this.color = color;
            }
            function Ball(x, y, size, color,noOfSegments = 6, pieColors = [],speed=30,stopRotating = false) {
                Shape.call(this, x, y,color)

                this.size = size;
                this.noOfSegments = noOfSegments;
                this.segmentWidth = 360 / this.noOfSegments;
                this.pieAngle = 2 * Math.PI / this.noOfSegments;
                this.pieColors = pieColors;
                this.rotate = false;
                this.speed = speed;
                this.stopRotating = stopRotating;
            }
            Ball.prototype = Object.create(Shape.prototype);
            Ball.prototype.constructor = Ball;
            
            function Pie(x, y, size,color,pieAngle,pos) {
                Shape.call(this, x, y,color);
                this.size = size;
                this.pieAngle = pieAngle;
                this.pos = pos;
            }
            Pie.prototype = Object.create(Shape.prototype);
            Pie.prototype.constructor = Pie;


            Ball.prototype.draw = function () {
                for (var i = 0; i < this.noOfSegments; i++) {
                    var pie = new Pie(this.x,this.y,this.size,this.pieColors[i],this.pieAngle,i)
                    pie.draw();
                }
                
                 ctx.lineWidth = 3;
                ctx.strokeStyle = this.color;
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                ctx.stroke();
            }
            
            Pie.prototype.draw = function () {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.size, this.pos * this.pieAngle, (this.pos + 1) * this.pieAngle, false);
                ctx.fill();

            }
            ball = new Ball(width / 2 , height / 2 , 200, 'black',6, ['green', 'yellow', 'red', 'pink', 'blue', 'orange']);
            //ball.draw()
            counter = 0;

            function loop() {
                if (ball.rotate) {
                    ctx.clearRect(0, 0, width, height);
                    ctx.translate(ball.x, ball.y);
                    ctx.rotate(2 * Math.PI / ball.speed);
                    ctx.translate(-(ball.x), -(ball.y));
                }
                if(ball.rotate == true && ball.stopRotating == true){
                    counter +=1;
                    if(counter%5 == 0){
                        ball.speed +=1;
                    }
                    if( ball.speed == 160){
                         ball.rotate = false;
                         ball.stopRotating = false;
                         ball.speed= 30;
                         counter  = 0;
                    }
                }
                ball.draw();
                requestAnimationFrame(loop);
            }
            function startrotatig(){
                ball.speed = 30;
                ball.rotate = true;
            }
            
            function stoprotatig(){
                ball.stopRotating = true;
            }
            loop();

        