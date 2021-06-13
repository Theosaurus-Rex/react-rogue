import Entity from './Entity'

class Player extends Entity {
    
    attributes = {
        name: 'Player',
        ascii: '@',
        health: 10,
        color: '#f00'
    }

    //Increment position by x and y axis values
    move(dx, dy) {
        this.x += dx 
        this.y += dy
    }

    

    // Method for copying player to check for wall collisions
    copyPlayer(){
        let newPlayer = new Player()
        Object.assign(newPlayer, this)
        return newPlayer
    }
}

export default Player