<script setup lang="ts">
defineProps<{
  isPlaying: boolean
}>()

defineEmits<{
  play: []
  reset: []
}>()
</script>

<template>
  <div class="playback-controls">
    <button class="play-btn" :disabled="isPlaying" @click="$emit('play')" title="Play animation">
      <svg viewBox="0 0 24 24"><polygon points="6,3 21,12 6,21" /></svg>
    </button>
    <button class="reset-btn" @click="$emit('reset')" title="Reset">
      <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
      reset
    </button>
  </div>
</template>
