<template>
  <main>
    <div class="about">
      <h1>{{ $t('about.title') }}</h1>
      <p>
        {{ $t('about.content') }}
      </p>
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
