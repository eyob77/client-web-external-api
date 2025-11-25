import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import axios from "axios";


dotenv.config();
const PORT = process.env.PORT || 6000

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
    
}));
app.get("/",(req,res)=>{
    res.status(200).json({message:"hi"})
})
app.post("/weather", async (req, res) => {
    try {
        const { lat, lng } = req.body;

        if (!lat || !lng) return res.status(400).json({ message: "lat and lng required" });

        const params = "waveHeight,airTemperature";
        const url = "https://api.stormglass.io/v2/weather/point?";

        const response = await axios.get(url, {
            params: { lat, lng, params },
            headers: {
                Authorization: process.env.STORMGLASS_API_KEY
            },
        });
        const simplified = response.data.hours.slice(0, 5).map(h => ({
        time: h.time,
        temperature: h.airTemperature.ecmwf
        }));

        res.status(200).json({simplified});
    } catch (error) {
        console.error("Error fetching weather:", error.response?.data || error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});



app.listen(PORT,()=>{
    console.log("running on "+PORT)
})