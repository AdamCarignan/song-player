<template>
  <div :id="`song-id-${song.docId}`">
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docId } }"
        class="font-bold block text-gray-600 composition-name"
        >{{ song.modified_name }}</router-link
      >
      <span class="text-gray-500 text-sm">{{ song.display_name }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        custom
        :to="{ name: 'song', params: { id: song.docId }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'AppSongItem',
  props: ['song'],
  components: { router }
}
</script>

<style scoped></style>
