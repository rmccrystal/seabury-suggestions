import { model, Schema } from 'mongoose';

const SuggestionSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10000,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SuggestionModel = model('suggestions', SuggestionSchema);

export default SuggestionModel;
