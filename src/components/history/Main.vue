<template>
  <div class="container">
    <router-link to="/" class="button">На главную</router-link>
  </div>
  <div class="history-list">
    <ul>
      <li v-for='(action, index) in historyFiltered' :key='index'>
        <p>{{ index + 1 }}. {id: {{ action.element.id }}, name: {{action.element.name}}} was {{action.type}} at {{action.date}}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import Action from '@/interfaces/Action'

export default defineComponent({
  name: 'History',
  setup () {
    const store = useStore()
    const { params: { type } }: RouteLocationNormalizedLoaded = useRoute()
    const history: ComputedRef<Array<Action>> = computed(() => store.state.history)
    const historyFiltered: ComputedRef<Array<Action>> = computed(() => {
      return history.value.filter(action => type === 'all' || action.type === type)
    })

    return { historyFiltered }
  }
})
</script>

<style scoped lang="scss">
.container {
  margin: 20px;
}
.history-list {
  margin-top: 50px;
  text-align: left;
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
