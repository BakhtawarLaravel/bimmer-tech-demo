<template>
  <div class="products-section">
    <h2 class="section-header">{{ title }}</h2>
    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :isInCart="isInCart(product.id)"
        :isOtherProduct="isOtherProduct"
        @learn-more="$emit('learn-more', $event)"
        @toggle-cart="$emit('toggle-cart', $event)"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductsGrid',
  components: {
    ProductCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      default: () => []
    },
    cartItems: {
      type: Array,
      default: () => []
    },
    isOtherProduct: {
      type: Boolean,
      default: false
    }
  },
  emits: ['learn-more', 'toggle-cart'],
  methods: {
    isInCart(productId) {
      return this.cartItems.some(item => item.id === productId);
    }
  }
}
</script>

<style scoped>
.products-section {
  margin-bottom: 40px;
}

.section-header {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
  text-transform: capitalize;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(266px, 1fr));
  gap: 12px;
  justify-items: center;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 10px;
  }
  
  .products-section {
    margin-bottom: 32px;
  }
  
  .section-header {
    margin-bottom: 16px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 320px) {
  .products-grid {
    gap: 8px;
  }
}
</style>