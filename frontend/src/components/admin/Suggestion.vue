<template>
  <q-card flat bordered class="suggestion">
    <q-card-section>
      <div class="text-h6">{{suggestion.title}}</div>
      <div class="text-subtitle2">{{time}}</div>
    </q-card-section>
    <q-card-section>
      {{suggestion.content}}
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat round color="red-5" icon="delete" @click="$emit('delete')"/>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
  import {SuggestionEntry} from "components/models";
  import moment from 'moment'
  import {computed} from "@vue/composition-api";

  export default {
    name: 'Suggestion',
    props: {
      suggestion: {
        type: Object as () => SuggestionEntry
      }
    },
    setup(props: any) {
      const suggestion: SuggestionEntry = props.suggestion;
      const time = computed(() => moment(suggestion.date).fromNow())
      return {time}
    }
  }
</script>

<style scoped>
.suggestion {
  margin: 0.5rem;
}
</style>
