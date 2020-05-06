import express from 'express';
import SurveyModel from "../models/SurveyModel";
import {authAdmin} from "../middleware/auth";

const router = express.Router();

router.post('/latest', async (req, res) => {
    const surveyList = await SurveyModel.find({}).sort('-date').exec();
    if (surveyList.length == 0) {
        return res.json({success: false, error: 'There are no surveys'});
    }
    const survey = surveyList[0];
    return res.json({success: true, survey});
});

router.post('/create', authAdmin, async (req, res) => {
    const options: string[] = req.body['options'];
    const question: string = req.body['question'];
    if(!options) {
        return res.json({success: false, error: 'No options specified'})
    }
    if(!question) {
        return res.json({success: false, error: 'No question specified'})
    }
    if(options.length < 1) {
        return res.json({success: false, error: 'You need more than one option'})
    }

    const newSurvey = new SurveyModel({question, options});
    await newSurvey.save();
    return res.json({success: true, survey: newSurvey})
})

export default router;
