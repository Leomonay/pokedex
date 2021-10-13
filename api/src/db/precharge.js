const {createPokemon} = require('../controllers/pokemonController')

const createdPokes=[
    // {
    //     "name": "pepitogrillo",
    //     "types": [ "bug", "psychic" ],
    //     "images": {
    //         "icon": "https://pa1.narvii.com/6467/6eeaaf30234f850eb234cbdafcaa936cdbfa807c_hq.gif",
    //         "front": "https://www.pngall.com/wp-content/uploads/9/Pinocchio-Jiminy-Cricket-PNG-Free-Download.png",
    //         "backIcon": "https://2img.net/r/ihimizer/img197/8240/pinocho20.gif"
    //     },
    //     "stats": {
    //         "Hp": 75,
    //         "Height": 65,
    //         "Weight": 15,
    //         "Attack": 55,
    //         "Special Attack": 100,
    //         "Defense": 75,
    //         "Special Defense": 120,
    //         "Speed": 95
    //     },
    // },
    {
        "name": "jengi",
        "types": [ "normal", "fairy" ],
        "images": {
        "front": "http://assets.stickpng.com/thumbs/59f878753cec115efb36238a.png",
        "backIcon":'',
        "icon":'',
        },
        "stats": {
        "Hp": 80,
        "Height": 120,
        "Weight": 30,
        "Attack": 80,
        "Special Attack": 70,
        "Defense": 90,
        "Special Defense": 70,
        "Speed": 80
        },
    },
    {
        "name": "stitch",
        "types": [ "dark", "electric" ],
        "images": {
            "icon": "https://www.pnguniverse.com/wp-content/uploads/2020/10/Stitch.png",
            "front": "https://1.bp.blogspot.com/-wGkDh9SVEBc/Xqg4U3Heu_I/AAAAAAAAU-I/SKVmrARUHT8n8LyhF_C52aDaIboCwfxowCLcBGAsYHQ/s1600/L%2526S%2Bclipart%2B%252317.png",
            "backIcon": "https://i.ibb.co/pKFhsHR/stich-back.png"
        },
        "stats": {
            "Hp": 80,
            "Height": 100,
            "Weight": 60,
            "Attack": 110,
            "Special Attack": 85,
            "Defense": 95,
            "Special Defense": 75,
            "Speed": 110
        },
    },
    {
        "name": "nemo",
        "types": [ "water" ],
        "images": {
            "icon": "",
            "front": "https://i.ibb.co/FDCC0ZG/58f37974a4fa116215a92420.png",
            "backIcon": ""
        },
        "stats": {
            "Hp": 80,
            "Height": 35,
            "Weight": 25,
            "Attack": 85,
            "Special Attack": 105,
            "Defense": 95,
            "Special Defense": 60,
            "Speed": 85
        },
    },
    {
        "name": "22",
        "types": [ "ghost" ],
        "images": {
            "icon": "https://www.disneyclips.com/images5/images/soul-222.png",
            "front": "https://vkclub.su/_data/stickers/soul22/sticker_vk_soul22_022.png",
            "backIcon": ""
        },
        "stats": {
            "Hp": 80,
            "Height": 60,
            "Weight": 5,
            "Attack": 25,
            "Special Attack": 125,
            "Defense": 60,
            "Special Defense": 130,
            "Speed": 70
        },
    },
    {
        "name": "grogu",
        "types": [ "fighting", "psychic" ],
        "images": {
            "icon": "https://www.pnguniverse.com/wp-content/uploads/2021/03/Grogu-the-child.png",
            "front": "https://i.ibb.co/g3YLgMW/Grogu-main.png",
            "backIcon": "https://i.ibb.co/N1ZDXs7/Grogu-back.png"
        },
        "stats": {
            "Hp": 80,
            "Height": 60,
            "Weight": 60,
            "Attack": 80,
            "Special Attack": 130,
            "Defense": 75,
            "Special Defense": 100,
            "Speed": 75
        },
    },
]

async function precharge(){
    for await (let poke of createdPokes){
        const req={body:poke}
        res={}
        try{
            await createPokemon(req,res)
        }catch(e){}
        console.log(poke.name, 'charged')
    }
}

module.exports = {precharge}