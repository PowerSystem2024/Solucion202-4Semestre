import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client')));
dotenv.config({ path: path.join(__dirname, '.env') });

// Mercado Pago config
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN, // TEST-xxx
});

// Crear preferencia
app.post('/create_preference', async (req, res) => {
    
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío o inválido' });
    }

    const items = cart.map((p) => ({
      title: p.productName,
      quantity: Number(p.quantity),
      currency_id: 'ARS',
      unit_price: Number(p.price),
    }));

    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items,
        back_urls: {
          success: 'http://localhost:3000/success',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending',
        },
      //auto_return: 'approved',
      },
    });

    return res.json({ init_point: response.init_point });
  } catch (err) {
    console.error('ERROR COMPLETO:', err);
    return res.status(500).json({ error: 'Error al crear preferencia' });
  }
});

// Respuestas simples después del pago
app.get('/success', (req, res) => res.send('Pago aprobado ✅'));
app.get('/failure', (req, res) => res.send('Pago fallido ❌'));
app.get('/pending', (req, res) => res.send('Pago pendiente 🕒'));

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
