<template>
  <div>
    <SuggestionList :amount="50"/>
  </div>
</template>

<script>
    import SuggestionList from '../../components/admin/SuggestionList';
    export default {
        name: 'PageAdminIndex',
      components: {SuggestionList}
    }
</script>

<style scoped>

</style>
