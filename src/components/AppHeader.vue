<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >{{ $t('header.title') }}</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <!-- <li>
            <router-link :to="{ name: 'about' }" class="px-2 text-white">{{ $t("header.about") }}</router-link>
          </li> -->
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleModal">{{
              $t('header.auth')
            }}</a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">{{
                $t('header.manage')
              }}</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">{{
                $t('header.log_out')
              }}</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale"
              >{{ $t('header.change_language') }} {{ currentLocale }}</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  data() {
    return {
      title: 'Song Player'
    }
  },
  computed: {
    ...mapStores(useModalStore, useUserStore),
    currentLocale() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English'
    }
  },
  methods: {
    toggleModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
    },
    signOut() {
      this.userStore.signOut()
      this.$route.meta.requiresAuth ? this.$router.push({ name: 'home' }) : null
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'fr' : 'en'
    }
  }
}
</script>

<style scoped></style>
