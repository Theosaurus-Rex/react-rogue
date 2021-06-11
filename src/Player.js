class Player {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }

    //Increment position by x and y axis values
    move(dx, dy) {
        this.x += dx 
        this.y += dy
    }

    draw(context) {
        context.fillStyle = '#f00'
        context.textBaseline = 'hanging'
        context.font = '16px Helvetica'
        context.fillText('@', this.x * this.size, this.y * this.size)
    }

    // Method for copying player to check for wall collisions
    copyPlayer(){
        let newPlayer = new Player()
        Object.assign(newPlayer, this)
        return newPlayer
    }
}

export default Player