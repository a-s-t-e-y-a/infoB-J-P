import express from 'express';
import mainRouter from './mainRoute';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use('/api',mainRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
