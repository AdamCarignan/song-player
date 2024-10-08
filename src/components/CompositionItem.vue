<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        @click.prevent="deleteSong"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        @click.prevent="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 rounded mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('composition_item.title') }}</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('composition_item.title_placeholder')"
            @input="updateUnsavedFlag(true)"
          />
          <error-message class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('composition_item.genre') }}</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('composition_item.genre_placeholder')"
            @input="updateUnsavedFlag(true)"
          />
          <error-message class="text-red-600" name="genre" />
        </div>
        <button
          :disabled="in_submission"
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
        >
          {{ $t('composition_item.submit') }}
        </button>
        <button
          :disabled="in_submission"
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="showForm = false"
        >
          {{ $t('composition_item.go_back') }}
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase'

export default {
  name: 'AppCompositionItem',
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    updateUnsavedFlag: {
      type: Function
    }
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required',
        genre: 'alpha_spaces'
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: "Please wait! We're updating the song."
    }
  },
  methods: {
    async edit(values) {
      this.in_submission = true
      this.show_alert = true
      this.alert_variant = 'bg-blue-500'
      this.alert_message = "Please wait! We're updating the song."

      try {
        await songsCollection.doc(this.song.docId).update(values)
      } catch (error) {
        this.in_submission = false
        this.alert_variant = 'bg-red-500'
        this.alert_message = 'Something went wrong. Please try again.'
        return
      }

      this.updateSong(this.index, values)

      this.updateUnsavedFlag(false)

      this.in_submission = false
      this.alert_variant = 'bg-green-500'
      this.alert_message = 'Success! The song has been updated.'
    },
    async deleteSong() {
      const storageRef = storage.ref()
      console.log(storageRef)
      const songRef = storageRef.child(`songs/${this.song.original_name}`)
      console.log(songRef)
      await songRef.delete()
      await songsCollection.doc(this.song.docId).delete()
      this.removeSong(this.index)
    }
  }
}
</script>
