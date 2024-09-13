const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.createHTML = async (req, res) => {
  try {
    const theme = req.body.theme;
    const prompt = req.body.prompt;
    const final_prompt = `Generete HTML code on the theme: ${theme}. The prompt for HTML is: ${prompt}`;
    const result = await model.generateContent(final_prompt);
    const data = result.response.candidates[0].content.parts[0].text;
    const regex = /```([\s\S]*?)```/;
    const match = data.match(regex);
    const code = match[1].trim();

    res.status(200).json({
      success: true,
      data: code,
      message: "Content retrieved successfully",
    });
  } catch (err) {
    console.log("Error fetching content.", err.message);
    res.status(500).json({
      success: false, // Corrected the success flag to false on error
      message: "Failed to connect to API",
      error: err.message,
    });
  }
};
