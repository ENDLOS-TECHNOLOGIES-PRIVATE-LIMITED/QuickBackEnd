import config from '../config/config'
import {connect} from 'mongoose'
export const connectToMongo = () => {

    connect(config.MONGO_URI).then(() => console.log(' connected with db successfully'))
    .catch(error =>console.log(error.message))
}








