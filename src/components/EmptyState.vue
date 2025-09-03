<template>
  <div class="empty-state">
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      default: 'No products found'
    },
    message: {
      type: String,
      default: 'Try adjusting your filters to see more options.'
    }
  }
}
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #9aa0a6;
}

.empty-state h3 {
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
}

.empty-state p {
  font-size: 15px;
  line-height: 1.5;
}
</style>