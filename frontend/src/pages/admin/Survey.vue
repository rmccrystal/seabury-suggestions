<template>
  <div class="row q-pa-lg">
    <CreateSurvey style="width: 50rem" />
    <SurveyList />
  </div>
</template>

<script lang="ts">
    import CreateSurvey from "components/admin/CreateSurvey.vue";
    import SurveyList from "components/admin/SurveyList.vue";
    export default {
        name: 'PageSurvey',
      components: {SurveyList, CreateSurvey},
    }
</script>

<style scoped>

</style>
