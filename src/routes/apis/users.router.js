const { Router } = require('express')
const { usersModel } = require('../../models/users.models')

const router = Router()



router.get('/', async (req, res) =>{
   
    try {
        const users = await usersModel.find({}) 
        res.send(users)
        
    } catch (error) {
        console.log(error)
    }
})


router.post('/', async (req, res) =>{
    try {
        const {first_name, last_name, email} = req.body
        // validación
        const result = await usersModel.create({
            first_name,
            last_name,
            email
        })
        console.log(first_name, last_name, email)
        res.status(201).send({ 
            status: 'success',
            payload: result        
        })
    } catch (error) {
        console.log(error)
    }
    
})

router.put('/:uid',  async (req, res) =>{

    const { uid } = req.params
    const userToReplace = req.body
   
    const result = await usersModel.updateOne({_id: uid}, userToReplace)
    res.status(201).send({ 
        status: 'success',
        payload: result 
    })
})


router.delete('/:uid', async  (req, res)=> {
    const { uid } = req.params

    const result = await usersModel.deleteOne({_id: uid})
    res.status(200).send({ 
        status: "success", 
        payload: result 
    })
})

module.exports = router




