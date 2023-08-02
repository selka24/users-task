<template>
  <div>
    <form @submit.prevent="submit">
      <div class="flex -mx-2">
        <div class="w-1/2 px-2">
          <user-info/>
        </div>
        <div class="w-1/2 px-2">
          <user-address/>
        </div>
      </div>
      <div class="flex">
        <default-button class="ml-auto">
          Save
        </default-button>
      </div>
    </form>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import UserAddress from "@/components/views/UserAddress.vue";
import UserInfo from "@/components/views/UserInfo.vue";
import DefaultButton from "@/components/DefaultButton.vue";
import {userAddressValidations, userFieldValidations} from "@/validations/userValidations";

export default {
  name: "UserForm",
  components: {DefaultButton, UserInfo, UserAddress},
  computed:{
    ...mapState(['currUser']),
    ...mapGetters(['gUserPrepareForInsert'])
  },
  validations:{
    currUser: {
      ...userFieldValidations,
      ...userAddressValidations
    }
  },
  methods:{
    ...mapMutations(['mutState']),
    ...mapActions(['actCreateUser', 'actUpdateUser']),
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if(this.currUser.id){
          this.actUpdateUser(this.gUserPrepareForInsert)
        } else {
          this.actCreateUser(this.gUserPrepareForInsert);
        }
      }
    }
  }
}
</script>
