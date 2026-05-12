import express from "express";
import { prisma } from "./lib/prisma"; // Förutsatt att du flyttat din prisma-klient hit

import cors from "cors";
// Tillåter alla domäner under utveckling

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// En test-route för att hämta något från din molndatabas
app.get("/triathletes", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Kunde inte hämta data" });
    }
});

app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});
