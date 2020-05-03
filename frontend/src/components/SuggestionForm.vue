<template>
  <div class="suggestion-form-container" v-if="!submitted">
    <p class="text-h2">Make a suggestion</p>
    <p class="text-subtitle1">Your opinion matters. Your suggestion will be anonymously sent to the
      student council for review.</p>
    <div class="suggestion-form">
      <q-input
        v-model="title"
        filled
        type="text"
        label="Title (optional)"
        class="title-input"
      />
      <q-input
        v-model="content"
        outlined
        filled
        label="Suggestion"
        type="textarea"
        class="content-input"
      />
      <q-btn
        class="submit-button"
        label="submit"
        unelevated
        :loading="loading"
        color="primary"
        @click="submit"
      />
    </div>
  </div>
  <div class="form-submitted-message" v-else>
    <p class="text-h2">Thank you!</p>
    <p class="text-subtitle1">
      Your suggestion will be reviewed by the student
      council and may be responded to on the posts page.
    </p>
    <q-btn
      @click="reset"
      flat
      label="Submit another"
      style="width: 100%"
    />
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
import { submitSuggestion } from 'src/api/suggestionForm';
import { Notify } from 'quasar';

export default {
  name: 'SuggestionForm',
  setup() {
    const title = ref('');
    const content = ref('');


    const submitted = ref(false);
    // True when the submission is pending
    const loading = ref(false);

    const submit = () => {
      if (content.value.length < 10) {
        Notify.create({
          message: 'Your message must be over 10 characters',
          position: 'top',
        });
        return;
      }
      loading.value = true;
      submitSuggestion({ title: title.value, content: content.value })
        .then(() => {
          // we successfully submitted
          submitted.value = true;
          loading.value = false;
          title.value = '';
          content.value = '';
        })
        .catch((err) => {
          console.log(`Error submitting: ${err}`);
          loading.value = false;
          Notify.create({
            message: `Error submitting: ${err}`,
            position: 'top',
            type: 'negative',
          });
          // notify error
        });
    };

    // runs when you click make another suggestion
    const reset = () => {
      submitted.value = false;
    };

    return {
      title, content, submitted, submit, loading, reset,
    };
  },
};
</script>

<style scoped>
  .suggestion-form-container {
    width: 85%;
    max-width: 60rem;
  }

  .suggestion-form {
    width: 100%;
  }

  .suggestion-form > * {
    margin-top: 0.75rem;
  }

  .title-input {
    width: 100%;
  }

  .content-input {
    width: 100%;
  }

  .submit-button {
    width: 100%;
  }
</style>
