<template>
  <main>
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <app-upload ref="upload" :addSong="addSong"></app-upload>
        </div>
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <app-composition-item
                v-for="(song, index) in songs"
                :song="song"
                :updateSong="updateSong"
                :index="index"
                :removeSong="removeSong"
                :updateUnsavedFlag="updateUnsavedFlag"
              ></app-composition-item>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AppUpload from '@/components/Upload.vue'
import { songsCollection, auth } from '@/includes/firebase'
import AppCompositionItem from '@/components/CompositionItem.vue'

export default {
  name: 'manage',
  components: {
    AppUpload,
    AppCompositionItem
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false
    }
  },
  async created() {
    // Firebase query
    const snapShot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()
    snapShot.forEach(this.addSong)
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(doc) {
      const song = { ...doc.data(), docId: doc.id }
      this.songs.push(song)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  },
  //   beforeRouteLeave(to, from, next) {
  //     this.$refs.upload.cancelUploads()
  //     next()
  //   },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next()
    } else {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave)
    }
  }
}
</script>
