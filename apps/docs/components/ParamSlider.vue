<script setup lang="ts">
defineProps<{
  label: string
  modelValue: number
  min: number
  max: number
  step: number
}>()

defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>

<template>
  <div class="param-slider">
    <label>{{ label }}</label>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    />
    <span class="value">{{ modelValue.toFixed(2) }}</span>
  </div>
</template>
