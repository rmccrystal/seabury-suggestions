<template>
  <q-card class="q-pa-md">
    <div class="text-h4">Create a survey</div>
    <q-input outlined dense v-model="question" class="create-survey-input" label="Question" />
    <q-separator/>
    <q-input
      v-for="(option, index) in options"
      :key="index"
      :label="`Option ${index+1}`"
      outlined
      v-model="options[index]"
      dense
      class="create-survey-input"
    >
      <template>
        <q-btn round dense flat icon="close" color="grey" @click="removeOption(index)"/>
      </template>
    </q-input>
    <q-btn round dense flat icon="add" @click="newOption"/>
    <q-btn dense flat label="Create" style="float: right" @click="create" />
  </q-card>
</template>

<script lang="ts">
  import {ref, SetupContext} from '@vue/composition-api'
  import {createSurvey} from "src/api/adminApi";
  import {Notify} from "quasar";
    export default {
        name: 'CreateSurvey',
      setup({}, ctx: SetupContext) {
        const question = ref('')
        const options = ref([''])
        const test = ref('')

        const newOption = () => {
          options.value.push('')
        }

        const removeOption = (index: number) => {
          options.value.splice(index, 1)
        }

        const create = () => {
          createSurvey(question.value, options.value)
            .then(() => {
              question.value = ''
              options.value = ['']
            })
            .catch(err => {
              Notify.create({
                message: err.toString(),
                position: 'top',
                type: 'negative',
              });
            })
        }

        return {question, options, create, newOption, removeOption}
      }
    }
</script>

<style scoped>
.create-survey-input {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
