const milkcarton = {
    color: 'white',
    height: 8,
    width: 4,
    volume: 30,
    texture: 'smooth',
    getVolume: () => {
        return this.width * this.height * this.width
    }
}

class Milkcarton {
    constructor (width = 4, height = 8, color = 'white' ) {
        this.color = color;
        this.height = height;
        this.width = width;
        this.volume = this.getVolume();
        this.texture = 'smooth';
    }

    getVolume() {
        return this.height * this.width * this.width;
    }


    getSurfaceArea() {
        const sides = this.height * this.width * 4;
        const bottoms = this.width * this.width * 2;
        return sides + bottoms;
    }
}

const milkcarton2 = new Milkcarton(2, 8)
console.log(milkcarton2.height, milkcarton2.color)
const milkcarton3 = new Milkcarton(10, 5, 'red')
console.log(milkcarton3.getSurfaceArea())
const milkcarton4 = new Milkcarton()
const milkcarton5 = new Milkcarton()

console.log(milkcarton)
console.log(milkcarton2)

const ballRadius = 5;
const ballColor = 'white';
const ballDensity = 100;
const ballPosition = {x: 5, y:10};
const ballVelocity = {dx:5, dy:7};

const ball = {
    radius: 5,
    color: 'blue'
}

class Ball {
    constructor(color = 'white') {
    this.radius = 5;
    this.color = color;
    this.density = 100;
    this.position = {x: 5, y:10};
    this.velocity = {dx:5, dy:7};
    this.diamter = this.getDiameter()
    }

    getDiameter(){
        return this.radius * 2
    }
}

const blueBall = new Ball('blue')
console.log(blueBall)


console.log(ball)
console.log(ball.radius)
console.log(this)
console.log(window.ball)
