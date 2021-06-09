import React, { useRef, useEffect, useState } from 'react' 
import InputManager from './InputManager'
import Player from './Player'

const ReactRogue = ({width, height, tileSize}) => {
    const canvasRef = React.useRef(null)
    const [player, setPlayer] = useState(new Player(1, 2, tileSize))
    let inputManager = new InputManager()
    const handleInput = (action, data) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`)
        let newPlayer = new Player()
        //Copy properties from player to newPlayer
        Object.assign(newPlayer, player)
        newPlayer.move(data.x, data.y)
        setPlayer(newPlayer)
    }

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
        player.draw(ctx)
    })
    return (
        <canvas 
            ref={canvasRef}
            width={width * tileSize} 
            height={height * tileSize} 
            style={{border: '1px solid black'}}>
        </canvas>
    )
}

export default ReactRogue