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
    <button :disabled="isPlaying" @click="$emit('play')">Play</button>
    <button @click="$emit('reset')">Reset</button>
  </div>
</template>
