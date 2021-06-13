class Entity {
    constructor(x, y, size, attributes){
        this.x = x
        this.y = y
        this.size = size
        this.attributes = {...attributes}
    }

    // Fallback method
    action(verb, world) {
        // Log the verb that isn't getting handled by the child class
        console.log(`Verb: ${verb}`)
    }

    draw(context) {
        context.fillStyle = this.attributes.color || 'White'
        context.textBaseline = 'hanging'
        context.font = '16px Helvetica'
        context.fillText(
            this.attributes.ascii, 
            // If attributes includes an offset value, add it on
            this.x * this.size + 
                (this.attributes.offset ? this.attributes.offset.x : 0), 
            this.y * this.size + 
                (this.attributes.offset ? this.attributes.offset.y : 0))
    }
}

export default Entity