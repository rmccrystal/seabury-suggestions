<template>
  <q-page class="row justify-evenly">
    <SuggestionForm class="suggestions"/>
  </q-page>
</template>

<script lang="ts">
import SuggestionForm from 'components/SuggestionForm.vue';

export default {
  name: 'PageIndex',
  components: { SuggestionForm },
};
</script>

<style>
  .suggestions {
    padding-top: 5%;
  }
</style>
