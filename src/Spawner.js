import Loot from './Loot'
import Monster from './Monster'

const lootTable = [
    {name: 'Long Sword', color: 'darkgrey', ascii: '/', offset: {x: 6, y: 3}},
    {name: 'Health Potion', color: 'red', ascii: '!', offset: {x: 6, y: 3}},
    {name: 'Gold Coin', color: 'yellow', ascii: '$', offset: {x: 3, y: 3}},
    {name: 'Light Armor', color: 'lightgrey', ascii: '#', offset: {x: 4, y: 3}}
]

const monsterTable = [
    {name: 'Giant Rat', color: 'brown', ascii: 'R', offset: {x: 2, y: 3}, health: 2},
    {name: 'Goblin', color: 'lightgreen', ascii: 'G', offset: {x: 2, y: 3}, health: 3},
    {name: 'Ogre', color: 'darkgreen', ascii: 'O', offset: {x: 2, y: 3}, health: 8},
    {name: 'Dragon', color: 'purple', ascii: 'D', offset: {x: 2, y: 3}, health: 15}
]

class Spawner {
    constructor(world) {
        this.world = world
    }
    spawn(spawnCount, createEntity){
        for (let count = 0; count < spawnCount; count++){
            let entity = createEntity()
            this.world.add(entity)
            this.world.moveToSpace(entity)
        }  
    }

    spawnLoot(spawnCount){
        this.spawn(spawnCount, () => {
            return new Loot(
                getRandomInt(this.world.width - 2), 
                getRandomInt(this.world.height - 2), 
                this.world.tilesize, 
                lootTable[getRandomInt(lootTable.length)]
            )
        })
    }

    spawnMonsters(spawnCount){
        this.spawn(spawnCount, () => {
            return new Monster(
                getRandomInt(this.world.width - 2), 
                getRandomInt(this.world.height - 2), 
                this.world.tilesize, 
                monsterTable[getRandomInt(monsterTable.length)]
            )
        })
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

export default Spawner