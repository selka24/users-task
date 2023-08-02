<template>
  <div id="app" class="p-3">
    <users-table/>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import UsersTable from "./components/views/UsersTable.vue";
export default {
  name: 'App',
  data(){
    return {
      show:false
    }
  },
  components: {
    UsersTable,
  },
  methods: {
    ...mapActions(['actGetUsers'])
  },
  async created() {
     await this.actGetUsers();
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
