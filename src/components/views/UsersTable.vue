<template>
  <div>
    <div class="w-full flex">
      <default-button @click="openForm" class="ml-auto">+ Create New User</default-button>
    </div>
    <user-modal/>
    <default-table :columns="tableCells" :items="users">
     <template #act="{item}">
       <div class="flex gap-5">
         <font-icon icon="fa-solid fa-pen" class="cursor-pointer" @click="openForm(item)"/>
         <font-icon icon="fa-solid fa-trash" class="cursor-pointer" @click="deleteUser(item)"/>
       </div>
     </template>
    </default-table>
  </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from "vuex";
import DefaultTable from "@/components/DefaultTable.vue";
import UserModal from "@/components/views/UserModal.vue";
import DefaultButton from "@/components/DefaultButton.vue";
import {defaultUser} from "@/helpers/constants";
import {flattenObj} from "@/helpers/helperFunctions";

export default {
  name: 'UsersTable',
  components: {
    DefaultButton,
    UserModal,
    DefaultTable
  },
  data(){
    return {
      showForm: false,
      tableCells: [
        {label: 'ID', key: 'id'},
        {label: 'Name', key: 'name'},
        {label: 'Email', key: 'email'},
        {label: 'Phone', key: 'phone'},
        {label: 'Actions', key: 'act'}
      ]
    }
  },
  computed: {
    ...mapState(['users'])
  },
  methods:{
    ...mapMutations(['mutState', 'mutUserModal']),
    ...mapActions(['actDeleteUser']),
    openForm(user){
      let value;
      if(user){
        // eslint-disable-next-line
        const {company, ...rest} = user; //remove company info because interferes with user's name
        value = rest
      } else {
        value = defaultUser
      }
      this.mutState({key:'currUser', value: flattenObj(value)})
      this.mutUserModal()
    },
    deleteUser(user){
      this.actDeleteUser(user);
    }
  }
}
</script>
