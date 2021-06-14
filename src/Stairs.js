import Entity from './Entity'
import Spawner from './Spawner'

class Stairs extends Entity {
    attributes = {name: 'Stairs', color: 'black', ascii: '>', offset: {x:2, y:2}}

    action(verb, world) {
        if (verb === 'bump') {
            world.addToHistory('You descend the stairs...')
            // Generate a new floor
            world.createCellularMap()
            // Reset player position on entering new floor
            world.player.x = 0
            world.player.y = 0
            world.moveToSpace(world.player)
            // Delete all entities except Player
            world.entities = world.entities.filter(e => e === world.player)
            // Generate new entities
            let spawner = new Spawner(world)
            spawner.spawnLoot(4)
            spawner.spawnMonsters(6)
            spawner.spawnStairs()
        }
    }
}

export default Stairs