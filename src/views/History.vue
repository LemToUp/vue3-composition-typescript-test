<template>
  <div>
    <HistoryPage/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HistoryPage from '@/components/history/Main.vue'

export default defineComponent({
  name: 'History',
  components: {
    HistoryPage
  }
})
</script>
