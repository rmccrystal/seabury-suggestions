import express from 'express';
import SurveyModel from "../models/SurveyModel";
import SurveyEntryModel from "../models/SurveyEntryModel";
import {auth, authAdmin} from "../middleware/auth";
import {Survey, SurveyResults} from "./models";
import SuggestionModel from "../models/SuggestionModel";

const router = express.Router();

async function canSubmit(ip: string, surveyId: string): Promise<boolean> {
    let responses = await SurveyEntryModel.find({ip, survey: surveyId}).exec();
    console.log(responses)
    return responses.length < 4;    // only allow 4 responses per ip
}

router.post('/latest', async (req, res) => {
    const surveyList = await SurveyModel.find({}).sort('-date').exec();
    if (surveyList.length == 0) {
        return res.json({success: false, error: 'There are no surveys'});
    }
    const survey: Survey | any = surveyList[0];
    survey['canSubmit'] = await canSubmit(req.ip, survey._id);
    return res.json({success: true, data: survey});
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
    return res.json({success: true, data: newSurvey})
})

router.post('/submit', async (req, res) => {
    const {id, choice} = req.body;
    if (choice === undefined) {
        return res.json({success: false, error: 'No choice selected'})
    }
    if (!id) {
        return res.json({success: false, error: 'No survey ID provided'})
    }
    if(!await canSubmit(req.ip, id)) {
        return res.json({success: false, error: 'You have submitted too many times from the same IP'})
    }

    const survey: Document | any = await SurveyModel.findById(id).exec();
    if(!survey) {
        return res.json({success: false, error: 'That survey id invalid'})
    }

    if (choice < 0 || choice >= survey.options.length) {
        return res.json({success: false, error: 'Invalid selection'})
    }

    const entry = new SurveyEntryModel({choice: choice, survey: survey._id, ip: req.ip})
    await entry.save();

    return res.json({success: true});
})

router.post('/results', async (req, res) => {
    const {id} = req.body
    if(!id) {
        return res.json({success: false, error: 'No ID provided'})
    }

    // get the survey
    const survey: Document | any = await SurveyModel.findById(id).exec();
    if(!survey) {
        return res.json({success: false, error: 'Invalid survey ID'})
    }

    // Map of index to count
    let resultsMap: Map<number, number> = new Map<number, number>();
    // set all possibilities to 0
    for(let i = 0; i<survey.options.length; i++) {
        resultsMap.set(i, 0);
    }

    // Find all entries with the survey ID
    let entries: Document[] | any[] = await SurveyEntryModel.find({survey: survey.id}).exec()
    entries.forEach(entry => {
        let choice: number = entry.choice;
        // verify it is a valid choice
        if (choice < 0 || choice >= survey.options.length) {
            console.log(`For some reason there was an invalid choice: ${choice}`)
            return;
        }

        // increment the result
        resultsMap.set(choice, resultsMap.get(choice)!+1)
    });

    let results: Array<{option: string, result: number}> = [];

    resultsMap.forEach(((value, key) => results.push({option: survey.options[key], result: value})));

    let totalResults = results.reduce((tot, arr) => {
        return tot + arr.result
    }, 0);

    // @ts-ignore
    let surveyResults: SurveyResults = {_id: survey._id, results: results, question: survey.question, totalResults: totalResults};

    return res.json({success: true, data: surveyResults})
})

router.post('/getAll', auth, async (req, res) => {
    const surveyList = await SurveyModel.find({}).sort('-date').exec();
    return res.json({success: true, data: surveyList});
})

router.post('/delete', authAdmin, async (req, res) => {
    let {id} = req.body;
    await SurveyModel.deleteOne({_id: id}).exec()
    return res.send({success: true})
})

router.post('/clearResponses', authAdmin, async (req, res) => {
    let {id} = req.body;
    await SurveyEntryModel.deleteMany({survey: id}).exec()
    return res.send({success: true})
})

export default router;
