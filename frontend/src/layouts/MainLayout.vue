<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-indigo text-white">
      <q-toolbar>
        <q-tabs v-model="tab" class="tabs" shrink>
          <q-tab
            v-for="(link, index) in links"
            :key="index"
            :name="link.link"
            :label="link.label"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
  import {reactive, ref, SetupContext, watchEffect} from '@vue/composition-api';

  export default {
    name: 'MainLayout',
    setup({}, ctx: SetupContext) {
      const links = reactive([
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Survey',
          link: '/survey'
        },
        // {
        //   label: 'Posts',
        //   link: '/posts',
        // },
      ]);

      const tab = ref(ctx.root.$router.currentRoute.path);
      watchEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        ctx.root.$router.push(tab.value).catch(() => {});
      })

      return {links, tab};
    }
  }
</script>

<style>
  .tabs {
    margin: auto;
  }
</style>
