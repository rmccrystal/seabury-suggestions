<template>
  <div class="suggestion-list row content-stretch">
    <Suggestion
      v-for="(suggestion, index) in suggestions"
      :suggestion="suggestion"
      :key="index"
      @delete="del(suggestion)"
    />
  </div>
</template>

<script lang="ts">
  import {SetupContext, ref, Ref, onMounted} from "@vue/composition-api";
  import {SuggestionEntry} from "components/models";
  import {deleteSuggestion, getSuggestions} from "src/api/adminApi";
  import {Notify} from "quasar";
  import Suggestion from "components/admin/Suggestion.vue";

  export default {
    name: 'SuggestionList',
    components: {Suggestion},
    props: {
      amount: {
        type: Number,
        default: 50
      }
    },
    setup(props: any, ctx: SetupContext) {
      const amount: number = props.amount;

      const loading = ref(true);
      const suggestions: Ref<SuggestionEntry[]> = ref([])

      const updateSuggestionList = () => {
        loading.value = true;
        getSuggestions(amount)
          .then(suggestionResponse => {
            loading.value = false
            suggestions.value = suggestionResponse
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

      const del = (suggestion: SuggestionEntry) => {
        deleteSuggestion(suggestion._id)
          .then(() => {
            updateSuggestionList()
          })
          .catch(err => {
            updateSuggestionList()
            Notify.create({
              message: err.toString(),
              position: 'top',
              type: 'negative',
            });
          })
      }

      onMounted(updateSuggestionList);
      onMounted(() => {
        setInterval(() => {
          updateSuggestionList()
        }, 1000)
      })

      return {loading, suggestions, del}
    }
  }
</script>

<style scoped>
  .suggestion-list {
  }
</style>
