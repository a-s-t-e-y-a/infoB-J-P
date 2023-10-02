import express from 'express';
import mainRouter from './mainRoute';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors middleware

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 5555;

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: '*', // Replace with your Next.js dev server port
  credentials: true,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use('/api', mainRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
