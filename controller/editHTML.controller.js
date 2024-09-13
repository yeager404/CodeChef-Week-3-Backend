const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.editHTML = async(req, res)=> {
    try{
        const code = req.body.code;
        const change = req.body.changes;
        const final_prompt = `THe HTML code is ${code}. Make these changes in it: ${change}`;
        const result = await model.generateContent(final_prompt);
        const data = result.response.candidates[0].content.parts[0].text;
        const regex = /```([\s\S]*?)```/;
        const match = data.match(regex);
        const mod_code = match[1].trim();
        
        console.log(result.response.text); // Updated this line to access text directly

        res.status(200).json({
        success: true,
        data: mod_code,
        message: "Content retrieved successfully",
        });
    }catch(err){
        console.log("Error fetching content.", err.message);
        res.status(500).json({
        success: false, // Corrected the success flag to false on error
        message: "Failed to connect to API",
        error: err.message,
        });
    }
}