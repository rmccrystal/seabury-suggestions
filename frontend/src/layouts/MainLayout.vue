<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-indigo text-white">
      <q-toolbar class="content-center">
        <q-btn
          flat
          v-for="(link, index) in links"
          :key="index"
          :label="link.label"
          :to="link.link" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          label: 'Seabury Suggestions',
          link: '/',
        },
        {
          label: 'Posts',
          link: '/posts',
        },
        {
          label: 'About',
          link: '/about',
        },
      ],
    };
  },
};
</script>
