<template>
  <div class="container">
    <router-link to="/history/remove" class="button">История удалений</router-link>
    <router-link to="/history/all" class="button">История</router-link>
    <router-link to="/history/add" class="button">История добавлений</router-link>
  </div>
  <div class="container-list" v-if="isLoading">
    <p class="loader">...Loading</p>
  </div>
  <div class="container-list" v-else>
    <SearchItemsList
      @select="addElement"
      :elements="elements"
      class="list"
    />
    <ItemsList
      @select="removeElement"
      :elements="selectedElements"
      class="list selected-items"
      button-text="-"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ComputedRef } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import { ADD_ELEMENT, GET_ELEMENTS, REMOVE_ELEMENT } from '@/store/actions'
import ItemsList from '@/components/elements/ItemsList.vue'
import SearchItemsList from '@/components/elements/SearchItemsList.vue'

export default defineComponent({
  name: 'Elements',
  components: { ItemsList, SearchItemsList, RouterLink },
  setup () {
    const store = useStore()
    const elements: ComputedRef<Array<Element>> = computed(() => store.getters.elementsOrdered)
    const selectedElements: ComputedRef<Array<Element>> = computed(() => store.getters.selectedElementsOrdered)
    const isLoading: ComputedRef<Array<Element>> = computed(() => store.state.isElementsLoading)
    const isLoaded: ComputedRef<Array<Element>> = computed(() => store.state.isElementsLoaded)

    const addElement = (id: number): void => {
      store.dispatch(ADD_ELEMENT, id)
    }

    const removeElement = (id: number): void => {
      store.dispatch(REMOVE_ELEMENT, id)
    }

    onMounted(() => {
      !isLoaded.value && store.dispatch(GET_ELEMENTS)
    })

    return {
      elements,
      selectedElements,
      isLoading,
      addElement,
      removeElement
    }
  }
})
</script>

<style scoped lang="scss">
.container-list {
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
  display: flex;
  flex-direction: row;
  .list {
    flex: 1;
    width: 40%;
    padding-inline-start: 0;
    margin-right: 25px;
  }
  .selected-items {
    flex: 1;
    margin-top: 63px;
    margin-left: 25px;
  }
  .loader {
    width: 100%;
    font-size: 2em;
  }
}
</style>
