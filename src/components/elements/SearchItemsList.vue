<template>
  <div class="searchContainer">
    <input class="searchInput" v-model="searchText">
    <ItemsList
      @select="addElement"
      :elements="filteredItems"
      class="list"
      direction="row-reverse"
      button-text="+"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, ComputedRef } from 'vue'
import sortHelper from '@/helpers/sort'
import ItemsList from '@/components/elements/ItemsList.vue'
import Element from '../../interfaces/Element'
import Item from '@/interfaces/Item'
import SearchElement from '@/interfaces/SearchElement'

export default defineComponent({
  name: 'SearchItemsList',
  components: { ItemsList },
  props: {
    elements: {
      type: Array as () => Array<Element>,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const addElement = (id: number): void => emit('select', id)
    const searchText: Ref<string> = ref('')
    const calculateSearchWeight = (element: Element, searchString: string): number => {
      if (searchString.length > 0) {
        const elementSearch = element.name.match(new RegExp(searchText.value, 'g')) // Search in element
        let matches = elementSearch ? elementSearch.length : 0
        matches = element.items.reduce((accumulator: number, item: Item) => { // Sum searches of element and items
          const itemSearch = item.name.match(new RegExp(searchText.value, 'g')) // Search in item
          return itemSearch ? (accumulator + itemSearch.length) : accumulator
        }, matches)

        return matches
      }

      return 1
    }
    const filteredItems: ComputedRef<Array<Element>> = computed(() => {
      const sortProp = searchText.value.length > 0 ? 'searchWeight' : 'id'
      const sortOrder = searchText.value.length > 0 ? 'desc' : 'asc'

      return props.elements.map((element: Element) => {
        return {
          ...element,
          searchWeight: calculateSearchWeight(element, searchText.value)
        } as SearchElement
      }).filter((element: SearchElement) => element.searchWeight > 0)
        .sort(sortHelper(sortProp, sortOrder))
    })

    return { filteredItems, searchText, emit, addElement }
  }
})
</script>

<style scoped lang="scss">
  .searchContainer {
    text-align: right;
    .searchInput {
      border-radius: 4px;
      border-collapse: collapse;
      border: 1px solid rgba(0, 0, 0, 0.38);
      padding: 15px 10px;
    }
  }
</style>
