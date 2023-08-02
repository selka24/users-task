<template>
  <div class="flex flex-wrap justify-between relative">
    <div class="flex absolute right-0 items-center">
      <input :checked="googleLocationActive" @change="handleGoogleActivation" type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500" id="googleCheckbox">
      <label for="googleCheckbox" class="text-sm text-gray-500 ml-2">Use Google Location</label>
    </div>
    <div v-for="input in formAddressInput"
         :key="input.key"
         :class="['mb-4', (input.key === 'lat' || input.key === 'lng') ? 'w-[45%]' : 'w-full']"
    >
      <default-form-input
        v-if="checkIfLatLng(input.key)"
        v-bind="getInputProperties(input)"
        @change="handleInputChange"
        :value="currUser[input.key]"
        :error="getErrorMsg(input.label, $v.currUser[input.key])"
      />
    </div>
  </div>
</template>
<script>
import {mapMutations, mapState} from "vuex";
import {getErrorMsg, userAddressValidations} from "@/validations/userValidations";
import loadPlacesApi from "@/mixins/loadPlacesApi";
import {retrieveGooglePlacesInfo} from "@/helpers/helperFunctions";
import DefaultFormInput from "@/components/DefaultFormInput.vue";
import {getInputProperties} from "@/helpers/helperFunctions";

export default {
  name: "UserAddress",
  components: {DefaultFormInput},
  mixins: [loadPlacesApi],
  data(){
    return{
      googleLocationActive: false,
      formAddressInput: [
        {label: 'Address', key: 'street', placeholder: 'Don Bosko 1', type: 'text'},
        {label: 'City', key: 'city', placeholder: 'Tirana', type: 'text'},
        {label: 'Zip Code', key: 'zipcode', placeholder: '1001', type: 'text'},
        {label: 'Latitude', key: 'lat', placeholder: '43.00001', type: 'text'},
        {label: 'Longitude', key: 'lng', placeholder: '43.00001', type: 'text'}
      ]
    }
  },
  validations:{
    currUser: userAddressValidations
  },
  computed:{
    ...mapState(['currUser']),
  },
  methods:{
    getErrorMsg,
    ...mapMutations(['mutState']),
    getInputProperties,
    checkIfLatLng(key){
      if(key === 'lat' || key === 'lng')
        return this.googleLocationActive
      return true
    },
    handleGoogleActivation(){
      this.googleLocationActive = !this.googleLocationActive;
      if(this.googleLocationActive){
        this.initAutocomplete('street', this.handleGooglePlaceChange);
      } else {
        this.removeAutoComplete();
      }
    },
    handleGooglePlaceChange(){
        const place = this.autocomplete.getPlace()
        const address = retrieveGooglePlacesInfo(place) //retrieve only needed information from Places Api
        if(address) this.mutateAddress(address);
    },
    handleInputChange(e){
      const {id, value} = e.target;
      this.mutateAddress({[id]: value})
      this.$v.currUser[id].$touch();
    },
    mutateAddress(newAddress){
      this.mutState({
        key: 'currUser',
        value: {
          ...this.currUser,
          ...newAddress
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
