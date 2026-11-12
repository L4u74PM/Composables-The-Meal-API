<script setup>
import { ref } from 'vue'

const query = ref('')
const emit = defineEmits(['search'])

const handleSearch = () => {
  if (query.value.trim() !== '') {
    emit('search', query.value.trim())
  }
}
</script>

<template>
  <form @submit.prevent="handleSearch" class="search-bar">
    <input 
      v-model="query" 
      type="text" 
      placeholder="Cerca una recepta..." 
    />
    <button type="submit">Buscar</button>
  </form>
</template>