import dotenv from 'dotenv'

dotenv.config()

const USERNAME:string= process.env.MYUSERNAME || '';
const PASSWORD:string = process.env.PASSWORD || '';
 const DATABASENAME:string =  process.env.DATABASENAME || ''

 const MONGO_URI:string=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.bulhrac.mongodb.net/${DATABASENAME}?retryWrites=true&w=majority`


const PORT:number= 3000;

 const config = {

MONGO_URI,
PORT

 }

 export default config; 