import express from "express"
import conectaNaDataBase from "./config/dbconnect.js"
import iten from "./models/iten.js"
import cors from "cors"

const conexao = await conectaNaDataBase()

conexao.on("error", (erro) => {
    console.error("erro de conexão: ", erro)
})

conexao.once("once", () => {
    console.log("Conexão com o banco de dados feita")
})

const app = express()
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    method: ["Get, PUT, POST, DELETE"],
    header: ["Content-Type"],
    preflightContinue: false,
    optionsSuccessStatus: 200
}));

app.get("/", (req, res) => {
    res.status(200).send("Teste nodeJS")
})

// ok
app.get("/itens", async (req, res) => {
    const listaItens = await iten.find({})
    res.status(200).json(listaItens)
})

// ok TESTAR NOVAMENTE
app.get("/itens/:id", async (req, res) => {
    const id = req.params.id
    const itenEncontrado = await iten.findById(id)
    res.status(200).json(itenEncontrado)
})

// ok
app.post("/itens", async (req, res) => {
    const novoIten = await iten.create(req.body)
    res.status(201).json({message: "Criado com sucesso.", iten: novoIten})
})

// ok
app.put("/itens/:id", async (req, res) => {
    try {
        const id = req.params.id
        const itenAlterado = await iten.findByIdAndUpdate(id, req.body)
        res.status(200).json({ message: `Iten atualizado: ${itenAlterado}`})

    } catch (erro) {
        res.status(500).json({ message: `${erro.message} - falha na atualização do iten`})
    }
})

app.delete("/itens/:id", async (req, res) => {
    try {
        const id = req.params.id
        await iten.findByIdAndDelete(id)
        res.status(200).json({ message: "Iten Excluído"})

    } catch (erro) {
        res.status(500).json({ message: `${erro.message} - falha na Exclusão`})
    }
})

export default app