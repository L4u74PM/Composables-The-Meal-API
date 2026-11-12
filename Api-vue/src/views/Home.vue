<script setup>
import { onMounted } from 'vue'
import { useFetch } from '../composables/useFetch'
import SearchBar from '../components/SearchBar.vue'
import MealCard from '../components/MealCard.vue'

const { data: meals, error, loading, fetchData } = useFetch()

// Carga inicial
onMounted(() => {
  fetchData('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
})

// Se ejecuta al recibir el emit de SearchBar
const searchMeals = (searchTerm) => {
  fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
}
</script>

<template>
  <main>
    <div class="search-container">
      <SearchBar @search="searchMeals" />
    </div>

    <p v-if="loading">Carregant receptes...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else-if="meals && meals.length === 0">No s'han trobat receptes.</p>

    <section v-else class="meals-grid">
      <MealCard 
        v-for="meal in meals" 
        :key="meal.idMeal" 
        :meal="meal" 
      />
    </section>
  </main>
</template>