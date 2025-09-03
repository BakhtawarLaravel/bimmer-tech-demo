<template>
  <div v-if="cartItems.length > 0" class="summary-section">
    <h2 class="summary-title">Summary</h2>
    <div class="summary-item" v-for="item in cartItems" :key="item.id">
      <span class="summary-item-name">{{ item.name }}</span>
      <span class="summary-item-price">${{ item.price }}</span>
    </div>
    <div class="summary-total">
      <span>Total Price</span>
      <span>${{ cartTotal }}</span>
    </div>
    <CustomButton
      :text="cartTotal < 70 ? 'Minimum order $70' : 'Continue to checkout'"
      variant="primary"
      size="large"
      :disabled="cartTotal < 70"
      @click="$emit('checkout')"
      class="checkout-custom-btn"
    />
  </div>
</template>

<script>
import CustomButton from './CustomButton.vue'

export default {
  name: 'CartSummary',
  components: {
    CustomButton
  },
  props: {
    cartItems: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    }
  }
}
</script>

<style scoped>
.summary-section {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  color: #000;
  margin-top: 50px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.summary-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f4;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item-name {
  font-size: 15px;
  color: #3c4043;
  font-weight: 500;
}

.summary-item-price {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
}

.summary-total {
  background: #4ECDC4;
  margin: 24px -32px 0px;
  padding: 24px 32px;
  color: #000;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  border-radius: 0;
  align-items: center;
}

.checkout-custom-btn {
  width: 100%;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .summary-section {
    padding: 24px;
    margin-top: 40px;
  }

  .summary-total {
    margin: 20px -24px 0px;
    padding: 20px 24px;
  }
}
</style>