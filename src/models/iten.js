import mongoose from "mongoose";

const itenSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String}
}, {versionKey: false})

const iten = mongoose.model("livros", itenSchema)

export default iten