import About from '@/views/AboutView.vue'
import { shallowMount } from '@vue/test-utils'

describe('About.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(About, {
      shallow: true,
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
    expect(wrapper.text()).toContain('about')
  })
})
