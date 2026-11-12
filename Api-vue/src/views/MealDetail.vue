<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '../composables/useFetch'

const route = useRoute()
const { data, error, loading, fetchData } = useFetch()

const loadMeal = (id) => {
  fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
}

onMounted(() => {
  loadMeal(route.params.idMeal)
})

// Vigila si cambia el parámetro idMeal en la URL
watch(
  () => route.params.idMeal,
  (newId) => {
    if (newId) loadMeal(newId)
  }
)

const meal = computed(() => (data.value && data.value.length > 0 ? data.value[0] : null))

// Extrae los ingredientes y sus cantidades
const ingredients = computed(() => {
  if (!meal.value) return []
  const list = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal.value[`strIngredient${i}`]
    const measure = meal.value[`strMeasure${i}`]
    if (ingredient && ingredient.trim() !== '') {
      list.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim())
    }
  }
  return list
})
</script>

<template>
  <main class="meal-detail">
    <p v-if="loading">Carregant detall de la recepta...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <article v-else-if="meal">
      <h2>{{ meal.strMeal }}</h2>
      <div class="detail-header">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
        <div class="ingredients">
          <h3>Ingredients</h3>
          <ul>
            <li v-for="(item, index) in ingredients" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="instructions">
        <h3>Instruccions</h3>
        <p>{{ meal.strInstructions }}</p>
      </div>
    </article>
  </main>
</template>