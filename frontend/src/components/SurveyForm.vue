<template>
  <div>
    <div v-if="!loading">
      <p class="text-h3">{{survey.question}}</p>
      <q-option-group
        :options="surveyOptions"
        type="radio"
        v-model="selectedOption"
      />
    </div>
    <div v-else>
      <q-spinner
        color="primary"
        size="4rem"
        :thickness="2"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import {Survey} from './models';
  import {getLatestSurvey} from '../api/api';
  import {computed, onMounted, ref, Ref} from '@vue/composition-api';
  import {Notify} from 'quasar';

  export default {
    name: 'SurveyForm',
    setup() {
      const loading = ref(true);
      const survey: Ref<Survey> = ref({});

      const updateSurvey = () => {
        loading.value = true;
        getLatestSurvey()
          .then(newSurvey => {
            loading.value = false;
            survey.value = newSurvey;
          })
          .catch(err => {
            loading.value = false;
            Notify.create({
              message: err.toString(),
              position: 'top',
              type: 'negative',
            });
          })
      }

      onMounted(updateSurvey);

      // these are used with the form itself
      const surveyOptions = computed(() => survey.value.options.map((value, index) => ({label: value, value: index})))
      const selectedOption = ref(0);

      return {loading, survey, selectedOption, surveyOptions}
    },
  };
</script>

<style scoped>

</style>
