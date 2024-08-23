import SongItem from '@/components/SongItem.vue'
import { mount, RouterLinkStub } from '@vue/test-utils'

describe('SongItem.vue', () => {
  test('renders song.display_name', () => {
    const song = {
      display_name: 'song name'
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
    const compositionAuthor = wrapper.find('.text-gray-500')
    expect(compositionAuthor.text()).toBe(song.display_name)
  })
  test('renders song.docId in id attribute', () => {
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
    const compositionAuthor = wrapper.find('.text-gray-500')
    expect(wrapper.attributes().id).toBe(`song-id-${song.docId}`)
  })
})
