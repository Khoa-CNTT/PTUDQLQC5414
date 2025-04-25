import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export default function analyzeSentiment(text) {
    const result = sentiment.analyze(text);
    return result.score;
}