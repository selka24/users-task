<template>
  <div class="modal-overlay">
    <div class="modal shadow-lg rounded-[5px] p-5">
      <div class="flex">
        <slot name="title">
          Title
        </slot>
        <button class="ml-auto" @click="$emit('close-modal')">
          <font-icon icon="fa-solid fa-close"/>
        </button>
      </div>
      <hr class="ml-[-1.25rem] mr-[-1.25rem] mt-5 mb-5"/>
      <slot name="content">
        Content
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "DefaultModal"
}
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #0000006e;
}

.modal {
  background-color: white;
  width: 100%;
  height: min-content;
  max-width: 800px;
  margin-top: 10%;
}
</style>
