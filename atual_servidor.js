
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Para lidar com multipart/form-data
const fetch = require('node-fetch'); // Para fazer requisições de servidor para servidor

const app = express();
// PORTA PARA O SERVIÇO PRINCIPAL (http://41.231.37.153)
// No seu caso, este servidor estaria rodando em 41.231.37.153
const PORT_MAIN_SERVICE = 80; // Porta padrão HTTP

// --- Configuração CORS ---
// Permite requisições de todas as origens para facilitar o teste.
// EM PRODUÇÃO, restrinja isso para as origens específicas do seu frontend.
app.use(cors({
    origin: '*', // Permite todas as origens (para teste)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'next-action'] // Inclua 'next-action'
}));

// --- Middleware para analisar JSON para o endpoint interno ---
// Certifique-se de que bodyParser.json() seja usado ANTES das rotas que o necessitam.
// Não aplicamos globalmente para não interferir com multer.
app.use(bodyParser.json({ limit: '50mb' })); // Limite de tamanho se esperar JSON grande

// --- Configuração Multer para multipart/form-data (para o endpoint principal) ---
// Define onde o arquivo será armazenado (neste caso, na memória)
const upload = multer({ storage: multer.memoryStorage() });

// --- Rota Principal para receber FormData e arquivo de http://41.231.37.153 ---
// Esta rota está na raiz '/' para simular seu http://41.231.37.153
app.post('/', upload.single('uploadedFile'), async (req, res) => {
    console.log(`\n--- Requisição POST recebida em http://41.231.37.153/ ---`);

    // Obter o cabeçalho 'next-action'
    const nextAction = req.headers['next-action'];
    console.log('Header "next-action":', nextAction);

    // O payloadData virá como string no corpo do FormData
    const payloadDataString = req.body.payloadData;
    let receivedPayload = {};
    if (payloadDataString) {
        try {
            receivedPayload = JSON.parse(payloadDataString);
            console.log('Payload Data (JSON):', receivedPayload);
        } catch (error) {
            console.error('Erro ao analisar payloadData como JSON:', error);
            // Se o JSON estiver malformado, você ainda pode enviá-lo como string
            console.log('Payload Data (String):', payloadDataString);
        }
    } else {
        console.log('Nenhum payloadData encontrado no FormData.');
    }

    // O arquivo estará em req.file se foi enviado
    if (req.file) {
        console.log('Arquivo recebido:', {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            // buffer: req.file.buffer.toString('base64').substring(0, 50) + '...' // Para mostrar o início do conteúdo
        });
        // Você pode salvar o arquivo aqui:
        // fs.writeFileSync(`./uploads/${req.file.originalname}`, req.file.buffer);
    } else {
        console.log('Nenhum arquivo enviado.');
    }

    // --- Lógica para o segundo envio (se houver, como discutido antes) ---
    // Se o seu servidor em 41.231.37.153 deve reencaminhar informações para 192.168.15.13:4444,
    // essa lógica deve ser implementada AQUI.
    // O navegador está chamando sendHashesToInternalService() diretamente após receber uma resposta OK deste servidor.
    // Portanto, este servidor APENAS responde ao navegador.

    // Enviar uma resposta de sucesso para o cliente
    return res.status(200).json({
        message: 'Dados e/ou arquivo recebidos com sucesso no serviço principal.',
        payloadReceived: receivedPayload,
        fileReceived: req.file ? { name: req.file.originalname, size: req.file.size } : null
    });
});


// --- Rota para o "serviço interno" (http://192.168.15.13:4444/alocamento-dinamico) ---
// Para fins de teste, vou simular este serviço na mesma porta, mas em um caminho diferente.
// Em um cenário real, estaria em outra porta ou IP.
// Esta rota deve receber JSON diretamente do navegador
app.post('/alocamento-dinamico', async (req, res) => {
    console.log(`\n--- Requisição POST recebida em http://192.168.15.13:4444/alocamento-dinamico ---`);
    const receivedJson = req.body; // body-parser.json() já analisou
    console.log('Payload JSON recebido:', receivedJson);

    // Aqui você processaria o payload JSON (hashes simulados, etc.)
    // e enviaria uma resposta de volta.

    return res.status(200).json({
        status: 'success',
        message: 'Payload JSON recebido no serviço de alocamento dinâmico.',
        receivedData: receivedJson
    });
});


// --- Tratamento de Erros Genérico ---
app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err.stack);
    // Verifica se os cabeçalhos já foram enviados para evitar ERR_HTTP_HEADERS_SENT
    if (res.headersSent) {
        return next(err); // Deixa o handler de erro padrão do Express lidar
    }
    res.status(500).json({
        error: 'Erro interno do servidor',
        details: err.message
    });
});


// Inicia o servidor na porta do serviço principal
// No seu caso real, este seria o servidor em 41.231.37.153
// Para testar na sua máquina, use uma porta livre (ex: 3000) e ajuste o frontend.
const SERVER_PORT = process.env.PORT || PORT_MAIN_SERVICE; 
app.listen(SERVER_PORT, () => {
    console.log(`Servidor principal rodando na porta ${SERVER_PORT}`);
    // Se você estiver testando localmente, informe a URL para o cliente
    console.log(`Serviço principal disponível em http://localhost:${SERVER_PORT}`);
    console.log(`Serviço interno (simulado) disponível em http://localhost:${SERVER_PORT}/alocamento-dinamico`);
});


