const {Pokemon, Type} = require('../db/db.js')
const axios = require ('axios')
const {API, IMAGE3D, POKE} = process.env

let totalPokemon ={}

async function getTotalPokemon(req, res){
    res.status(200).send(totalPokemon)
}

async function getPokemon(req, res){
    const {id} = req.params
    let poke ={}
    let response = {}
    try{
        if(id[0]==="A"){
            response = await Pokemon.findOne({
                where:{id_pokemon: id},
                include: Type 
            })
        }else{
            response = await axios(`${API}${POKE}${id}`)
        }

        if( !(response.id_pokemon || response.data.id) ) res.status(404).send({error: 'pokemon not found'})

        poke.id=response.id_pokemon || response.data.id
        poke.name=response.name? response.name.toUpperCase() : response.data.species.name.toUpperCase()
        poke.imageFront=response.imageFront || response.data.sprites.other['official-artwork']['front_default']        
        poke.imageBack=response.imageFront?(response.imageBack?response.imageBack:'') : response.data.sprites['back_default']
        poke.imageIcon=response.imageFront? (response.imageIcon?response.imageIcon:'') : response.data.sprites['front_default']
        poke.bigImage=response.imageFront || `${IMAGE3D}${response.data.species.name}.png` 
        poke.types=response.types? response.types.map(e=>e.name) : response.data.types.map(e=>e.type.name)
        poke.height = response.height || response.data.height
        poke.weight = response.weight || response.data.weight/10
        poke.stats=
            response.hp? [
                {name: "hp", value: response.hp},
                {name: "attack", value: response.attack},
                {name: "special-attack", value: response['special-attack']},
                {name: "defense", value: response.defense},
                {name: "special-defense", value: response['special-defense']},
                {name: "speed", value: response.speed}]
                : response.data.stats.map(e => {return {name: e.stat.name, value : e.base_stat}});
        res.status(200).send(poke)
    }catch(error){
        res.status(400).send(error.message)
    }
}

async function createPokemon(req,res){
    const {name, types} = req.body
    try{
        const checkName = await Pokemon.findOne({where:{name: name}})
        if (checkName){
            res.status(400).send({error: 'Name', detail:'This pokemon name already exists. Try another'})
        }else{
            const id = ( await Pokemon.findAll() ).length+1
            console.log('A'+id)
            const pokemon = await Pokemon.create({
                id_pokemon: 'A'+id,
                name: name,
                imageFront: req.body.images.front,
                imageBack: req.body.images.backIcon,
                imageIcon: req.body.images.icon,
                height: req.body.stats.Height,
                weight: req.body.stats.Weight,
                hp: req.body.stats.Hp,
                attack: req.body.stats.Attack,
                'special-attack': req.body.stats['Special Attack'],
                defense: req.body.stats.Defense,
                'special-defense': req.body.stats['Special Defense'],
                speed: req.body.stats.Speed
            })

            const dbTypes = await Type.findAll({
                where:{name: types}
            });
            
            await pokemon.setTypes(dbTypes);

            res.status(200).send({
                message: 'pokemon created successfully',
                id: 'A'+id,
                pokemon: await Pokemon.findOne( { where: {name: name} } )
            } )
        }
    }catch(e){
        console.error(e.message)
        res.status(500).send({error: e.message})
    }
    getTotalQuantity()
}

async function getTotalQuantity(){
    length=50
    let sum =0
    let check=true
    while (check){
        let response = await axios(`https://pokeapi.co/api/v2/pokemon?offset=${sum}&limit=${length}`)
        let results = response.data.results 
        length = results.length
        sum+= length

        let indexArray = results.map(element=>{
            return parseInt(element.url.split('/')[6])
        })
        for (let i=0; i<indexArray.length-1; i++){
            if(indexArray[i+1]-indexArray[i]!==1){
                sum=indexArray[i]
                check=false
            }
        }
    }

    let local = ( await Pokemon.findAll() ).length
    totalPokemon = {api: sum, created: local}
    console.log('totals', totalPokemon)
}
getTotalQuantity()

module.exports = {getPokemon, createPokemon, getTotalPokemon}