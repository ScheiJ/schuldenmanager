import { mount } from '@vue/test-utils'
import OnlyPersonsAndAmount from '@/components/OnlyPersonsAndAmount.vue'

describe('OnlyPersonsAndAmount.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(OnlyPersonsAndAmount, {
      propsData: { }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
