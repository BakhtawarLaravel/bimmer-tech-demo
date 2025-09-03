<template>
  <div class="product-card" :class="{ 'in-cart': isInCart, 'cable-product': product.cable, 'usb-product': !product.cable }">
    <!-- Header with title and badge -->
    <div class="product-header">
      <h3 class="product-name">{{ product.name }}</h3>
      <span class="product-type-badge" :class="{ 'cable-badge': product.cable, 'usb-badge': !product.cable }">
        {{ product.cable ? 'CABLE' : 'USB' }}
      </span>
    </div>

    <!-- Description with line breaks -->
    <p class="product-description">{{ formattedDescription }}</p>

    <!-- Learn more link -->
    <div class="learn-more-section">
      <button 
        class="learn-more-link"
        @click="$emit('learn-more', product)"
      >
        Learn more →
      </button>
    </div>

    <!-- Footer with price and select button -->
    <div class="product-footer">
      <div class="product-price">
        <span class="original-price" v-if="product.originalPrice">${{ product.originalPrice }}</span>
        <span class="current-price">${{ product.price }}.-</span>
      </div>
      <CustomButton
        :text="isInCart ? 'Remove' : '+ Select'"
        :variant="cartButtonVariant"
        size="small"
        @click="$emit('toggle-cart', product)"
        class="select-button"
      />
    </div>
  </div>
</template>

<script>
import CustomButton from './CustomButton.vue'

export default {
  name: 'ProductCard',
  components: {
    CustomButton
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    isInCart: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cartButtonVariant() {
      return this.isInCart ? 'secondary' : 'primary';
    },
    formattedDescription() {
      // Replace line breaks in the description with proper formatting
      return this.product.smallDescription.replace(/\n/g, '<br>');
    }
  }
}
</script>

<style scoped>
.product-card {
  background: #1a1a1a;
  padding: 20px;
  color: #ffffff;
  position: relative;
  transition: all 0.2s ease;
  border: 1px solid #333333;
  height: fit-content;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  width: 280px;
  font-family: Arial, sans-serif;
  /* Angled bottom-right corner */
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border-color: #4ECDC4;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  background: white;
  margin: -20px -20px 16px -20px;
  padding: 15px 20px;
  min-height: 80px;
}

.product-name {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #000000;
  line-height: 1.3;
  text-align: left;
}

.product-type-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cable-badge {
  background: #FFD166;
  color: #000000;
}

.usb-badge {
  background: #4ECDC4;
  color: #000000;
}

.product-description {
  font-size: 14px;
  color: #cccccc;
  margin-bottom: 16px;
  line-height: 1.5;
  flex-grow: 1;
  text-align: left;
  white-space: pre-line;
}

.learn-more-section {
  margin-bottom: 20px;
  text-align: left;
}

.learn-more-link {
  background: none;
  border: none;
  color: #4ECDC4;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 0;
}

.learn-more-link:hover {
  color: #5fded5;
  text-decoration: underline;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.original-price {
  font-size: 14px;
  color: #888888;
  text-decoration: line-through;
}

.current-price {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}

.select-button {
  flex-shrink: 0;
}

/* Override button styles to match requirements */
.select-button:deep(.custom-button) {
  background: #4ECDC4;
  color: #ffffff !important;
  border: none !important;
  /* border-radius: 6px; */
  padding: 8px 16px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  clip-path: polygon(12% 0%, 100% 0%, 100% 50%, 88% 100%, 0% 100%, 0% 50%);
}

.select-button:deep(.custom-button:hover) {
  background: #5fded5;
  transform: translateY(-1px);
}

/* Variant for when item is in cart */
.product-card.in-cart .select-button:deep(.custom-button) {
  background: #333333;
  color: #ffffff !important;
  border: none !important;
}

.product-card.in-cart .select-button:deep(.custom-button:hover) {
  background: #444444;
}
</style>