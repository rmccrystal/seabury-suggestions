<template>
  <q-page class="page row justify-evenly">
    <SurveyForm />
  </q-page>
</template>

<script>

import SurveyForm from '../components/SurveyForm';
export default {
  name: 'PageSurvey',
  components: {SurveyForm},
};
</script>

<style scoped>

</style>
