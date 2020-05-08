import express from 'express';
import { Suggestion } from './models';
import SuggestionModel from '../models/SuggestionModel';
import {auth, authAdmin} from "../middleware/auth";
import SurveyEntryModel from "../models/SurveyEntryModel";

// /api/suggestions
const router = express.Router();

router.post('/create', async (req, res) => {
  const suggestion: Suggestion = req.body;
  if (suggestion?.content?.length < 10) {
    return res.send({ success: false, error: 'Your message must be 10 or more characters' });
  }
  try {
    const newSuggestion = new SuggestionModel(suggestion);
    await newSuggestion.save();
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false, error: e.message || e || 'Unknown error occurred' });
  }
});

router.post('/get', auth, async (req, res) => {
  let amount: number = req.body.amount;
  if(!amount || typeof req.body.amount != 'number') {
    amount = 100;
  }

  try {
    let suggestionList = await SuggestionModel.find({}).sort('-date').exec();
    if (suggestionList.length > amount) {
      // cap length
      suggestionList = suggestionList.slice(0, amount);
    }

    return res.send({success: true, data: suggestionList})
  } catch (e) {
    return res.send({ success: false, error: e.message || e || 'Unknown error occurred' });
  }
})

router.post('/delete', authAdmin, async (req, res) => {
  let {id} = req.body;
  await SuggestionModel.deleteOne({_id: id}).exec()
  return res.send({success: true})
})


export default router;
