<template>
  <q-layout view="hhh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>

        <q-toolbar-title>
          Admin Console
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right"/>
      </q-toolbar>
    </q-header>
    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      :width="300"
      :breakpoint="700"
      content-class="bg-grey-3"
      bordered>
      <q-list v-for="(link, index) in links" :key="index">
        <q-item clickable :active="link.link === tab" v-ripple @click="tab = link.link">
          <q-item-section avatar>
            <q-icon :name="link.icon"/>
          </q-item-section>
          <q-item-section>
            {{ link.label }}
          </q-item-section>
        </q-item>

        <q-separator v-if="link.separator"/>
      </q-list>

    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

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
    name: 'AdminLayout',
    setup({}, ctx: SetupContext) {
      const links = reactive([
        {
          label: 'Suggestions',
          link: '/admin',
          icon: 'home'
        },
        {
          label: 'Survey',
          link: '/admin/survey',
          icon: 'email'
        },
        {
          label: 'Posts',
          link: '/admin/posts',
          icon: 'description'
        },
      ]);

      const tab = ref(ctx.root.$router.currentRoute.path);
      watchEffect(() => {
        ctx.root.$router.push(tab.value).catch(() => {});
      })

      const left = ref(true);
      const right = ref(false);

      return {links, tab, left, right};
    }
  }
</script>

<style>
  .tabs {
    margin: auto;
  }
</style>
