import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("YEAH!!!!!!!........MongoDB connected!!!!"))
  .catch((msg) => console.log(msg));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
});
const Product = mongoose.model("Product", productSchema);
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Simple HTML Page</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f9;
                    color: #333;
                }
                header {
                    background-color: #4CAF50;
                    color: white;
                    text-align: center;
                    padding: 20px 0;
                }
                h1 {
                    font-size: 2.5em;
                }
                section {
                    padding: 20px;
                    margin: 20px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    color: #4CAF50;
                }
                p {
                    font-size: 1.1em;
                    line-height: 1.6em;
                }
                footer {
                    background-color: #333;
                    color: white;
                    text-align: center;
                    padding: 10px;
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                }
                .hello-thailand {
                    background-color: #f0f8ff;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Welcome to My Simple Page</h1>
            </header>
        
            <section>
                <h2>About This Page</h2>
                <p>This is a simple HTML page created for demonstration purposes. It's a basic structure with a header and a content section.</p>
            </section>

            <!-- Added a new styled section for "Hello Thailand" -->
            <section class="hello-thailand">
                <h2>Hello Thailand!</h2>
                <p>Welcome to Thailand, the land of smiles.</p>
            </section>
        
            <footer>
                <p>&copy; 2025 Simple HTML Page</p>
            </footer>
        </body>
        </html>
    `);
});

app.post("/products", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});
  

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));