<template>
<div>
  <q-card flat bordered class="bg-grey-1 survey-card q-pa-sm q-ma-md">
    <div class="text-h5">{{survey.question}}</div>
    <div class="text-body" v-for="(option, index) in survey.options" :key="index">
      {{option}}:
    </div>
    <q-btn flat round color="red-5" icon="delete" @click="$emit('delete')"/>
  </q-card>
</div>
</template>

<script lang="ts">
  import {Survey as SurveyModel, SurveyResults} from '../models'
  import {Ref, ref} from "@vue/composition-api";
  import {getSurveyResults} from "src/api/api";
  import {Notify} from "quasar";
  import {deleteSurvey} from "src/api/adminApi";

  export default {
    name: 'SurveyItem',
    props: {
      survey: {
        type: Object as () => SurveyModel,
      }
    },
    setup(props: any) {
      const results: Ref<SurveyResults> = ref({})
      const getResults = () => {
        getSurveyResults(props.survey._id)
          .then((_results) => {
            results.value = _results
          })
        .catch(err => {
          Notify.create({
            message: err.toString(),
            position: 'top',
            type: 'negative',
          });
        })
      }

      return {results}
    }
  }
</script>

<style scoped>

</style>
