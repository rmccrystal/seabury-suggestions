<template>
  <q-layout>
    <q-page-container>
      <q-page class="row items-center justify-evenly">
        <q-card flat bordered class="login-card bg-grey-1">
          <div class="text-center text-h5 q-mb-md">Sign in</div>
          <q-input
            outlined
            v-model="username"
            label="Username"
            class="q-mb-md"
          />
          <q-input
            outlined
            type="password"
            v-model="password"
            label="Password"
            class="q-mb-sm"
          />
          <div v-if="error" class="text-red-5">
            {{error}}
          </div>
          <q-btn
            label="Login"
            style="width: 100%"
            class="q-mt-sm"
            color="blue"
            push
            :loading="loading"
            @click="submit"
          />
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
  import {ref, SetupContext} from '@vue/composition-api';
  import {login} from "src/api/api";

  export default {
    name: 'PageLogin',
    setup({}, ctx: SetupContext) {
      const username = ref('');
      const password = ref('');
      const loading = ref(false);

      const error = ref('');

      const submit = () => {
        loading.value = true
        login(username.value, password.value)
          .then(() => {
            ctx.root.$router.push('/admin');
          })
          .catch(err => {
            error.value = err;
          })
          .finally(() => {
            loading.value = false;
          })
      }

      return {username, password, error, submit, loading}
    }
  }
</script>

<style scoped>
  .login-card {
    padding: 2rem;
    width: 25rem;
  }
</style>
