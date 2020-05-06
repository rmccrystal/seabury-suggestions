import {model, Schema} from 'mongoose';

const SurveySchema = new Schema({
    question: String,
    options: [String], // possible options for the survey
    date: {
        type: Date,
        default: Date.now,
    },
});

const SurveyModel = model('surveys', SurveySchema);

export default SurveyModel;
