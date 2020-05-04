import express from 'express';
import { Suggestion } from './models';
import SuggestionModel from '../models/SuggestionModel';

// /api/suggestions
const router = express.Router();

router.post('/create', async (req, res) => {
  const suggestion: Suggestion = req.body;
  if (suggestion?.content?.length < 10) {
    res.send({ success: false, error: 'Your message must be 10 or more characters' });
    return;
  }
  try {
    const newSuggestion = new SuggestionModel(suggestion);
    await newSuggestion.save();
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false, error: e.message || e || 'Unknown error occurred' });
  }
});

export default router;
