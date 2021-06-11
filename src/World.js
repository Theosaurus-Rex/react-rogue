import {Map} from 'rot-js'
import Player from './Player'

class World {
    constructor(width, height, tilesize){
        this.width = width
        this.height = height
        this.tilesize = tilesize
        this.entities = [new Player(0,0,16)]
        //Create a 2 dimensional array
        this.worldmap = new Array(this.width)
        // For each tile in the width, create an array of the length of height (columns)
        for (let x = 0; x < this.width; x++){
            this.worldmap[x] = new Array(this.height)
        }
        
    }

    get player(){
        return this.entities[0]
    }

    moveToSpace(entity){
        for (let x = entity.x; x < this.width; x++) {
            for (let y = entity.y; y < this.height; y++) {
                if(this.worldmap[x][y] === 0) {
                    entity.x = x
                    entity.y = y
                    return
                }
            }
        }
    }

    isWall(x, y) {
        return(
            this.worldmap[x] === undefined 
            || this.worldmap[y] === undefined 
            || this.worldmap[x][y] === 1
        )
    }

    movePlayer(dx, dy){
        let tempPlayer = this.player.copyPlayer()
        tempPlayer.move(dx, dy)
        if(this.isWall(tempPlayer.x, tempPlayer.y)){
            console.log(`Way blocked at ${tempPlayer.x}:${tempPlayer.y}!`)
        } else {
        this.player.move(dx, dy)
        }

    }

    createCellularMap() {
        let map = new Map.Cellular(this.width, this.height, {connected:true})
        map.randomize(0.5)

        // Make sure walls surround edges of map
        let userCallback = (x, y, value) => {
            if (x === 0 || y === 0 || x === this.width -1 || y === this.height -1){
                this.worldmap[x][y] = 1
                return
            }
            this.worldmap[x][y] = (value === 0) ? 1 : 0
        }
        map.create(userCallback)
        // Leave spaces for moving between maps
        map.connect(userCallback, 1)
    }

    // Loop over the map array
    draw(context) {
        for (let x=0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                // If 1, draw a wall
                 if (this.worldmap[x][y] === 1) this.drawWall(context, x, y)
            }
        }
        this.entities.forEach(entity => {
            entity.draw(context)
        })
    }

    drawWall(context, x, y) {
        context.fillStyle = '#000'
        context.fillRect(x * this.tilesize, y * this.tilesize, this.tilesize, this.tilesize)
    }
}

export default World