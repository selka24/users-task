<template>
<div>
  <div v-for="formInfo in formUserInfo" :key="formInfo.key" class="mb-4">
    <default-form-input
      v-bind="getInputProperties(formInfo)"
      @change="handleInfoChange"
      :value="currUser[formInfo.key]"
      :error="getErrorMsg(formInfo.label, $v.currUser[formInfo.key])"
    />
  </div>
</div>
</template>
<script>
import DefaultFormInput from "@/components/DefaultFormInput.vue";
import {getErrorMsg, userFieldValidations} from "@/validations/userValidations";
import {mapMutations, mapState} from "vuex";
import {getInputProperties} from "@/helpers/helperFunctions";

export default {
  name: "UserInfo",
  components: {DefaultFormInput},
  validations: {
    currUser: userFieldValidations
  },
  data(){
    return {
      formUserInfo: [
        {label: 'Full name', key: 'name', placeholder: 'John Gonzales', type: 'text'},
        {label: 'Username', key: 'username', placeholder: 'john13', type: 'text'},
        {label: 'Email', key: 'email', placeholder: 'john13@gmail.com', type: 'email'},
        {label: 'Phone Nr', key: 'phone', placeholder: '+355 69 76 76 654', type: 'text'}
      ],
    }
  },
  computed:{
    ...mapState(['currUser'])
  },
  methods:{
    getErrorMsg,
    getInputProperties,
    ...mapMutations(['mutState']),
    handleInfoChange(e){
      const {id, value} = e.target
      this.mutState({
        key: 'currUser',
        value: {...this.currUser, [id]: value}
      })
      this.$v.currUser[id].$touch();
    }
  }
}
</script>
