<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full text-left text-sm font-light border-separate border-spacing-x-0 border-spacing-y-2">
            <thead class="border-b font-medium">
              <tr>
                <th v-for="col in columns"
                    :key="col.key"
                    scope="col"
                    class="px-6 py-4">
                  {{ col.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in items"
                  :key="idx"
                  class="border-[1px] transition duration-300 ease-in-out hover:bg-neutral-100"
              >
                <td v-for="col in columns"
                    :key="col.key"
                    class="whitespace-nowrap px-6 py-4 font-medium">
                  <slot :name="col.key" :item="item">{{item[col.key]}}</slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultTable",
  props: {
    columns: Array,
    items: Array
  }
}
</script>

<style scoped>
td {
  border-width:1px 0 1px 0;
}

td:first-child{
  border-width:1px 0 1px 1px;
  border-radius: 5px;
}
td:last-child{
  border-width:1px 1px 1px 0;
  border-radius: 5px;
}
</style>
