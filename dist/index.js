'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const dotenv_1 = __importDefault(require('dotenv'));
// import { dot } from 'node:test/reporters';
// Initiate express app
const app = (0, express_1.default)();
dotenv_1.default.config();
// Define server port
const port = process.env.PORT;
// Create a default route
app.get('/', (req, res) => {
  res.send('Express & TypeScript Catballs');
});
// Start listening to requests on the defined port
app.listen(port);
