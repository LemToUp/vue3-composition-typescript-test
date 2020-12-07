<template>
  <div>
    <Elements/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Elements from '@/components/elements/Main.vue'

export default defineComponent({
  name: 'Main',
  components: {
    Elements
  }
})
</script>
