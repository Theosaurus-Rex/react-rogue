import Entity from './Entity'

class Monster extends Entity {
    action(verb, world) {
        if(verb == 'bump') {
            // Attack monster
            world.addToHistory(`Player attacks ${this.attributes.name}!`)
            // TODO: Add formula for different player attack values based on weapons
            this.attributes.health = this.attributes.health - 1
            if(this.attributes.health <= 0) {
                world.addToHistory(`${this.attributes.name} was defeated!`)
                world.remove(this)
            } else {
                world.addToHistory(`${this.attributes.name}'s health is reduced to ${this.attributes.health}`)
                // TODO: Add formula for different monster attack values
                world.player.attributes.health = world.player.attributes.health - 1
                if(world.player.attributes.health <= 0) {
                    world.addToHistory(`You have died!`)
                } else {
                    world.addToHistory(
                        `You currently have ${world.player.attributes.health} health.`
                    )
                }
            }
        }
    }
}

export default Monster