import { model, Schema } from 'mongoose';

const SurveyEntrySchema = new Schema({
  choice: Number,
  survey: { type: Schema.Types.ObjectId, ref: 'surveys' },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SurveyEntryModel = model('surveyEntries', SurveyEntrySchema);

export default SurveyEntryModel;
