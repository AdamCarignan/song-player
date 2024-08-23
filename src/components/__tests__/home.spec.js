import Home from '@/views/HomeView.vue'
import SongItem from '@/components/SongItem.vue'

import { mount } from '@vue/test-utils'

describe('Home.vue', () => {
  test('Renders list of songs', () => {
    const songs = [{}, {}, {}]
    const wrapper = mount(Home, {
      shallow: true,
      data() {
        return { songs }
      },
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
    const items = wrapper.findAllComponents(SongItem)
    expect(items).toHaveLength(songs.length)
    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i])
    })
  })
})
