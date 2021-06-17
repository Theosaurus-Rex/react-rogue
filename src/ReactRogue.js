import React, { useEffect, useState } from 'react' 
import InputManager from './InputManager'
import Spawner from './Spawner'
import World from './World'

const ReactRogue = ({width, height, tileSize}) => {
    const canvasRef = React.useRef(null)
    const [world, setWorld] = useState(new World(width, height, tileSize))
    let inputManager = new InputManager()
    const handleInput = (action, data) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`)
        let newWorld = new World()
        //Copy properties from world to newWorld
        Object.assign(newWorld, world)
        newWorld.movePlayer(data.x, data.y)
        setWorld(newWorld)
    }

    // Render the starting level
    // Second argument makes it only render once
    useEffect(() => {
        console.log("Create Map")
        let newWorld = new World()
        Object.assign(newWorld, world)
        newWorld.createCellularMap()
        newWorld.moveToSpace(world.player)
        let spawner = new Spawner(newWorld)
        spawner.spawnLoot(4)
        spawner.spawnMonsters(6)
        spawner.spawnStairs()
        setWorld(newWorld)
    }, [])

    useEffect(() => {
        console.log('Bind input')
        inputManager.bindKeys()
        inputManager.subscribe(handleInput)
        return () => {
            inputManager.unbindKeys()
            inputManager.unsubscribe(handleInput)
        }
    })

    // Updates the DOM when the canvas is drawn to
    useEffect(() => {
        console.log("Draw to canvas")
        const ctx = canvasRef.current.getContext('2d')
        // Clear entire canvas
        ctx.clearRect(0, 0, width*tileSize, height * tileSize)
        //Draw world before drawing player
        world.draw(ctx)
    })
    return (
        <div style={{display: flex}}>
            <canvas 
                ref={canvasRef}
                width={width * tileSize} 
                height={height * tileSize} 
                style={{border: '1px solid black', background: 'Gray'}}>
            </canvas>
            {/* // Player inventory */}
            <ul style={{margin: 10px}}>
                {world.player.inventory.map((item, index) => (<li key={index}>{item.attributes.name}</li>))}
            </ul>

            {/* // World History Log */}
            <ul style={{margin: 10px}}>
                {world.history.map((item, index) => (<li key={index}>{item}</li>))}
            </ul>
        </div>
    )
}

export default ReactRogue