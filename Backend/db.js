import mongoose from 'mongoose';

const connectToMongo = async() =>{
   await mongoose
   .connect('mongodb+srv://mongodb:mongodb@cluster0.kgajz7s.mongodb.net/mongodb?retryWrites=true&w=majority&appName=Cluster0')
   .then(()=>console.log("DB Connected"))
   .catch((error)=>console.error("DB Error",error))
}

export default connectToMongo;