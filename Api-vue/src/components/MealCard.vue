<script setup>
defineProps({
  meal: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="meal-card">
    <img :src="meal.strMealThumb" :alt="meal.strMeal" />
    <div class="card-body">
      <h3>{{ meal.strMeal }}</h3>
      <p>{{ meal.strArea }} - {{ meal.strCategory }}</p>
      <RouterLink :to="{ name: 'Meal', params: { idMeal: meal.idMeal } }">
        Recepta
      </RouterLink>
    </div>
  </article>
</template>