<template>
  <div class="row">
    <SurveyItem v-for="(survey, index) in surveys" :key="index" :survey="survey" @delete="delSurvey(survey._id)"/>
  </div>
</template>

<script lang="ts">
  import {onMounted, ref, Ref} from '@vue/composition-api';
  import {deleteSurvey, getAllSurveys} from '../../api/adminApi';
  import {Notify} from 'quasar';
  import Survey from "pages/admin/Survey.vue";
  import {Survey as SurveyModel} from '../models'
  import SurveyItem from "components/admin/SurveyItem.vue";

  export default {
    name: 'SurveyList',
    components: {SurveyItem},
    setup() {
      const surveys: Ref<SurveyModel[]> = ref([])

      const updateSurveys = () => {
        getAllSurveys()
          .then(_surveys => {
            surveys.value = _surveys
          })
          .catch(err => {
            Notify.create({
              message: err.toString(),
              position: 'top',
              type: 'negative',
            });
          })
      }

      onMounted(updateSurveys)

      const delSurvey = (id: string) => {
        deleteSurvey(id)
          .then(() => {
            updateSurveys()
          })
          .catch(err => {
            Notify.create({
              message: err.toString(),
              position: 'top',
              type: 'negative',
            });
          })
      }

      return {surveys, delSurvey}
    }
  }
</script>

<style scoped>

</style>
