import { ref } from 'vue'

export function useFetch() {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async (url) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      const json = await response.json()
      data.value = json.meals || []
    } catch (err) {
      error.value = err.message || 'Error al carregar les dades'
      data.value = []
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData }
}