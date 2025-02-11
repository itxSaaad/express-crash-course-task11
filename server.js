import colors from 'colors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import postRoutes from './routes/postRoutes.js';

// import logger from './middlewares/logger.middleware.js';
import errorHandler from './middlewares/error.middleware.js';
import notFound from './middlewares/notFound.middleware.js';

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (NODE_ENV === 'development') {
  // app.use(logger);
  app.use(morgan('dev'));
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
// app.get('/', (req, res) => {
//   res.send(
//     `<section style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
//       <h1 style="color: #4CAF50;">Hello, Code Wizard!</h1>
//       <h3 style="color: #FF9800;">Got a moment?</h3>
//       <p style="font-size: 1.2em;">Your API is not just running; it's sprinting like Usain Bolt!</p>
//       <div style="margin-top: 20px;">
//         <p style="font-size: 1.5em; font-weight: bold;">Everything is Awesome!</p>
//         <p style="font-size: 1.2em;">💻✨🚀</p>
//       </div>
//       <footer style="margin-top: 30px; font-size: 0.8em; color: #9E9E9E;">
//         <p>Need more magic? Explore the code and unleash your creativity!</p>
//         <p>Happy Coding, Developer! 🎉</p>
//       </footer>
//     </section>`
//   );
// });

// Serve static files
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Code Wizard',
    message: 'Hello, Code Wizard!',
    people: [{ name: 'John Doe' }, { name: 'Jane Doe' }, { name: 'Jim Doe' }],
  });
});

app.use('/api/posts', postRoutes);

// Error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server is running in ${NODE_ENV} mode on Port ${PORT}!`.yellow.bold
  );
});
