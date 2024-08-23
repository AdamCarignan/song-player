import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('Snapshot SongItem.vue', () => {
  test('Renders Correctly', () => {
    const song = {
      docId: 'abc',
      modified_name: 'song name modified',
      display_name: 'song name',
      comment_count: 3
    }
    const wrapper = shallowMount(SongItem, {
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
    expect(wrapper.element).toMatchSnapshot()
  })
})
