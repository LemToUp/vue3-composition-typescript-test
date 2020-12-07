<template>
  <ul>
    <li :style="{flexDirection: direction}" v-for='(element, index) in elements' :key='index'>
      <button @click="emit('select', element.id)">{{ buttonText }}</button>
      <p>{{ element.name }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Element from '../../interfaces/Element'

export default defineComponent({
  name: 'ItemsList',
  props: {
    elements: {
      type: Array as () => Array<Element>,
      default: () => []
    },
    buttonText: {
      type: String,
      default: 'Add'
    },
    direction: {
      type: String,
      default: 'row'
    }
  },
  setup (props, { emit }) {
    return { emit }
  }
})
</script>

<style scoped lang="scss">
  ul {
    flex: auto;
    li {
      height: 50px;
      display: flex;
      button {
        margin: 10px;
        width: 24px;
        height: 30px;
      }
    }
  }
</style>
