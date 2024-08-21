<template>
  <!-- Header -->
  <app-header></app-header>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <!-- Player -->
  <app-player></app-player>

  <!-- Auth Modal -->
  <app-auth></app-auth>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/Auth.vue'
import AppPlayer from '@/components/Player.vue'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/user'
import { auth } from '@/includes/firebase'

export default {
  name: 'App',
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: linear all 0.15s;
}
.fade-leave-to {
  transition: linear all 0.15s;
  opacity: 0;
}
</style>
