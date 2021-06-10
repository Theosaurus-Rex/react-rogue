import {Map} from 'rot-js'

class World {
    constructor(width, height, tilesize){
        this.width = width
        this.height = height
        this.tilesize = tilesize
        //Create a 2 dimensional array
        this.worldmap = new Array(this.width)
        // For each tile in the width, create an array of the length of height (columns)
        for (let x = 0; x < this.width; x++){
            this.worldmap[x] = new Array(this.height)
        }
        this.createCellularMap()
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
    }

    drawWall(context, x, y) {
        context.fillStyle = '#000'
        context.fillRect(x * this.tilesize, y * this.tilesize, this.tilesize, this.tilesize)
    }
}

export default World