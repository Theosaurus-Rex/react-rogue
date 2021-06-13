import Entity from './Entity'

class Player extends Entity {

    inventory = []
    
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

    add(item){
        this.inventory.push(item)
    }


    // Method for copying player to check for wall collisions
    copyPlayer(){
        let newPlayer = new Player()
        Object.assign(newPlayer, this)
        return newPlayer
    }
}

export default Player