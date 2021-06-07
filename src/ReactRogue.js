import React, { useRef, useEffect } from 'react' 

const ReactRogue = ({width, height, tileSize}) => {
    const canvasRef = React.useRef(null)
    // Updates the DOM when the canvas is drawn to
    useEffect(() => {
        console.log("Draw to canvas")
        const ctx = canvasRef.current.getContext('2d')
        // Clear entire canvas
        ctx.clearRect(0, 0, width*tileSize, height * tileSize)
        ctx.fillStyle='#000'
        ctx.fillRect(12, 22, 16, 16)
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