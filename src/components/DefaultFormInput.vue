<template>
  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="inputProperties.id">
      {{ label }}
    </label>
    <input :value="value"
           @change="$emit('change', $event)"
           v-bind="inputProperties"
           :class="[
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
              (error ? 'border-red-500' : '')
           ]"
    >
    <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
  </div>
</template>
<script>
export default {
  name: "DefaultFormInput",
  props: ['inputProperties', 'value', 'error', 'label'],
}
</script>
<style scoped>

</style>
