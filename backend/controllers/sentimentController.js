import analyzeSentiment from "../utills/sentimentAPI.js";

export const sentiment = async (req, res) => {
    const { comment } = req.body;
    if (!comment) {
        return res.status(400).json({ error: 'No comment provided' });
    }

    const score = analyzeSentiment(comment);
    let sentimentLabel = 'neutral';
    if (score > 0) sentimentLabel = 'positive';
    else if (score < 0) sentimentLabel = 'negative';

    res.json({ score, sentiment: sentimentLabel });
};