import Element from '@/interfaces/Element'
import Item from '@/interfaces/Item'

const generateElements = function (entity: number, itemsEntity: number): Array<Element> {
  return [...Array(entity).keys()].map(i => {
    const elementId = i + 1
    return {
      id: elementId,
      name: `Element ${elementId}`,
      items: [...Array(itemsEntity).keys()].map(k => {
        const itemId = (elementId * itemsEntity) + k + 1
        return { id: itemId, name: `Item ${itemId}` } as Item
      })
    } as Element
  })
}

export default function (entity = 100, itemsEntity = 10): Promise<Array<Element>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateElements(entity, itemsEntity))
    }, 1000)
  })
}
