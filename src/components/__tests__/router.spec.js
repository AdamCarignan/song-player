import { mount, RouterLinkStub } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('router', () => {
  test('renders router link', () => {
    const song = {
      docId: 'abc'
    }
    const wrapper = mount(SongItem, {
      shallow: true,
      propsData: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docId }
    })
  })
})
