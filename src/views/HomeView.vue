<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis,
            congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet,
            venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{
            icon: 'headphones-alt',
            size: '2xl',
            color: 'green',
            position: 'right'
          }"
        >
          <span class="card-title">{{ $t('home.songs') }}</span>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <li
            v-for="song in songs"
            :key="song.docId"
            class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
          >
            <app-song-item :song="song" />
          </li>
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from '@/includes/firebase'
import AppSongItem from '@/components/SongItem.vue'
import IconSecondary from '@/directives/icon-secondary'

export default {
  name: 'HomeView',
  data() {
    return {
      songs: [],
      maxPerPage: 20,
      pendingRequest: false
    }
  },
  components: {
    AppSongItem
  },
  directives: {
    'icon-secondary': IconSecondary
  },
  methods: {
    async loadSongs() {
      if (this.pendingRequest) return
      this.pendingRequest = true
      let snapShots
      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docId).get()
        snapShots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get()
      } else {
        snapShots = await songsCollection.orderBy('modified_name').limit(this.maxPerPage).get()
      }

      snapShots.forEach((doc) => {
        this.songs.push({ docId: doc.id, ...doc.data() })
      })

      this.pendingRequest = false

      window.addEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

      if (bottomOfWindow) {
        this.loadSongs()
      }
    }
  },
  beforUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  async created() {
    this.loadSongs()
  }
}
</script>
