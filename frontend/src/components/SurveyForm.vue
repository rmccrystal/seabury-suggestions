<template>
  <q-card v-if="displayState === 'SURVEY'" flat bordered class="survey-card bg-grey-1">
    <div class="text-h5">{{survey.question}}</div>
    <q-option-group
      :options="surveyOptions"
      type="radio"
      v-model="selectedOption"
    />
    <q-card-actions>
      <q-btn
        label="Submit"
        :loading="submitResponseLoading"
        style="width: 100%"
        type="submit"
        @click="submitResponse"
      />
    </q-card-actions>
  </q-card>
  <q-card v-else-if="displayState === 'RESULTS'" flat bordered class="bg-grey-1 survey-card">
    <div class="text-h5">{{results.question}}</div>
    <div class="result"
         :key="index"
         v-for="(result, index) in results.results">
      <div class="text-subtitle1">{{result.option}}</div>
      <div
        class="result-bar text-subtitle2"
        :style="{width: `${(result.result/results.totalResults) * 100}%`}">
        {{result.result}}
      </div>
    </div>
  </q-card>
  <div v-else-if="displayState === 'SURVEY_LOADING' || displayState === 'RESULTS_LOADING'">
    <q-spinner
      color="primary"
      size="4rem"
      :thickness="2"
    />
  </div>
</template>

<script lang="ts">
  import {Survey, SurveyResults} from './models';
  import {getLatestSurvey, getSurveyResults, submitSurvey} from '../api/api';
  import {computed, onMounted, ref, Ref} from '@vue/composition-api';
  import {Notify} from 'quasar';

  type DisplayState = 'SURVEY_LOADING' | 'SURVEY' | 'RESULTS_LOADING' | 'RESULTS'

  export default {
    name: 'SurveyForm',
    setup() {
      const displayState: Ref<DisplayState> = ref('SURVEY_LOADING');
      const survey: Ref<Survey> = ref({});

      const results: Ref<SurveyResults> = ref({})
      const loadResults = () => {
        getSurveyResults(survey.value._id)
          .then(resultsResponse => {
            displayState.value = 'RESULTS';
            results.value = resultsResponse;
          })
          .catch(err => {
            displayState.value = 'RESULTS';
            Notify.create({
              message: err.toString(),
              position: 'top',
              type: 'negative',
            });
          })
      }

      const updateSurvey = () => {
        displayState.value = 'SURVEY_LOADING';
        getLatestSurvey()
          .then(newSurvey => {
            survey.value = newSurvey;
            // if we can't submit just go straight to results
            if(newSurvey.canSubmit === false) {
              displayState.value = 'RESULTS_LOADING'
              loadResults();
              return
            } else {
              displayState.value = 'SURVEY';
            }
          })
          .catch(err => {
            displayState.value = 'SURVEY';
            Notify.create({
              message: err.toString(),
              position: 'top',
              type: 'negative',
            });
          })
      }
      onMounted(updateSurvey);

      setInterval(() => {
        // Only load results if we are on the results page and results have been loaded already
        if(results.value._id && displayState.value === 'RESULTS') {
          // Get the survey results from the current displayed survey
          getSurveyResults(results.value._id)
            .then(resultsResponse => {
              results.value = resultsResponse
            })
        }
      }, 1000);

      // these are used with the form itself
      const surveyOptions = computed(() => survey.value.options.map((value, index) => ({label: value, value: index})))
      const selectedOption = ref(0);

      const submitResponseLoading = ref(false)
      const submitResponse = () => {
        submitResponseLoading.value = true;
        submitSurvey(survey.value._id, selectedOption.value)
          .then(() => {
            submitResponseLoading.value = false;
            displayState.value = 'RESULTS_LOADING'
            loadResults();
          })
          .catch(err => {
            displayState.value = 'SURVEY';
            submitResponseLoading.value = false;
            Notify.create({
              message: err.toString(),
              position: 'top',
              type: 'negative',
            });
          })
      }


      return {
        displayState,
        survey,
        selectedOption,
        surveyOptions,
        submitResponse,
        submitResponseLoading,
        results
      }
    },
  };
</script>

<style scoped lang="scss">
  .survey-card {
    width: 80%;
    max-width: 40rem;
    padding: 1rem;
  }

  .result {
    width: 100%;
    margin-top: 0.5rem;
  }

  .result-bar {
    background-color: $blue-4;
    border: $blue-7 solid 1px;
    border-radius: 3px;
    text-align: center;
    min-width: 1rem;
    transition: width 0.4s;
  }
</style>
