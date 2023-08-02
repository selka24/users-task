<template>
  <div>
    <div v-if="showUserModal">
      <default-modal @close-modal="handleCloseUserModal">
        <template #title>
          {{modalTitle}}
        </template>
        <template #content>
          <user-form/>
        </template>
      </default-modal>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters, mapMutations} from "vuex";

export default {
  components: {
    DefaultModal: () => import('../DefaultModal.vue'),
    UserForm: () => import('../views/UserForm.vue')
  },
  data() {
    return {
      name: '',
      age: 0,
      submitStatus: null
    }
  },
  computed:{
    ...mapState(['showUserModal']),
    ...mapGetters(['gCurrUserName']),
    modalTitle(){
      return `${this.gCurrUserName ? this.gCurrUserName : 'New User'} Info`
    }
  },
  methods: {
    ...mapMutations(['mutState','mutUserModal']),
    handleCloseUserModal(){
      this.mutUserModal();
      this.mutState({key: 'currUser', value: null});
    }
  }
}
</script>
