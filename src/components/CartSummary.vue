<template>
  <div v-if="cartItems.length > 0" class="summary-section">
    <!-- Floating Header -->
    <div class="floating-header">
      <h2 class="summary-title">Summary</h2>
    </div>

    <!-- Inner Card Container -->
    <div class="inner-card">
      <!-- Cart Items -->
      <div class="cart-items">
        <div class="summary-item" v-for="item in cartItems" :key="item.id">
          <div class="product-icon">
            <img :src="`/icons/bluetooth.svg`" :alt="`${item.name} Icon`" />
          </div>
          <div class="item-info">
            <div class="item-name">
              {{ item.name }}
              <span v-if="getBadgeText(item)" class="item-badge" :class="getBadgeClass(item)">
                {{ getBadgeText(item) }}
              </span>
            </div>
          </div>
          <div class="item-actions">
            <div class="price-container">
              <span class="original-price">${{ getOriginalPrice(item) }}.-</span>
              <span class="current-price">${{ item.price }}.-</span>
            </div>
            <button class="remove-btn" @click="removeItem(item)" title="Remove item">×</button>
          </div>
        </div>
      </div>

      <!-- Additional Items -->
      <div class="additional-items">
        <div class="addon-item cable-item">
          <div class="addon-checkbox-container">
            <input type="checkbox" v-model="includeCable" class="addon-checkbox" id="cable-addon" />
          </div>
          <div class="addon-main">
            <div class="addon-header">
              <label for="cable-addon" class="addon-name">Cable</label>
              <span class="addon-price">${{ cablePrice }}.-</span>
            </div>
            <div class="addon-desc">
              A coding cable is required to activate some of these options. If you already have a
              suitable cable, untick this box.
            </div>
          </div>
        </div>

        <div class="addon-item ethernet-item">
          <div class="addon-checkbox-container">
            <input type="checkbox" v-model="includeEthernet" class="addon-checkbox" id="ethernet-addon" />
          </div>
          <div class="addon-main">
            <div class="addon-header">
              <label for="ethernet-addon" class="addon-name">Ethernet adapter</label>
              <div class="addon-pricing">
                <span class="original-price">${{ ethernetOriginalPrice }}.-</span>
                <span class="addon-price">${{ ethernetPrice }}.-</span>
              </div>
            </div>
            <div class="addon-desc">
              Your coding cable connects through the ethernet port. If your laptop does not have
              an ethernet port, you will need an ethernet-USB adapter.
            </div>
          </div>
        </div>
      </div>

      <!-- Total Price - Inside Inner Card -->
      <div class="summary-total">
        <span>Total Price:</span>
        <div class="total-info">
          <span class="minimum-order" :class="{ 'minimum-met': finalTotal >= 70 }">
            Minimum order $70
          </span>
          <span class="total-amount">${{ finalTotal }}.-</span>
        </div>
      </div>
    </div>

    <!-- Terms and Checkout - Outside Inner Card -->
    <div class="terms-section">
      <div class="terms-checkbox-container">
        <input type="checkbox" v-model="acceptTerms" class="terms-checkbox" id="terms">
        <label for="terms" class="terms-label">
          I accept BimmerTech's terms & conditions.
        </label>
      </div>

      <p class="disclaimer">
        I understand that I am purchasing software changes to features already implemented by
        <span class="link">BMW</span> and that BimmerTech has no influence on the availability
        of features or their intended usage. <span class="link">Read more</span>
      </p>

      <button class="checkout-btn" :disabled="!canCheckout" @click="proceedToCheckout" :title="checkoutButtonTitle">
        <svg class="button-svg" viewBox="0 0 100 36" preserveAspectRatio="none">
          <defs>
            <linearGradient id="checkoutGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#317F6F;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1B7E8B;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="disabledGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#cccccc;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#999999;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M 12 0 L 100 0 L 100 25 L 88 36 L 0 36 L 0 11 Z"
            :fill="canCheckout ? 'url(#checkoutGradient)' : 'url(#disabledGradient)'" />
        </svg>
        <span class="button-text">Proceed to Checkout</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartSummary',
  props: {
    cartItems: {
      type: Array,
      default: () => []
    }
  },
  emits: ['checkout'],
  data() {
    return {
      acceptTerms: false,
      includeCable: true,
      includeEthernet: true,
      cablePrice: 49,
      ethernetPrice: 31.49,
      ethernetOriginalPrice: 34.99
    }
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    },
    addonsTotal() {
      let total = 0;
      if (this.includeCable) total += this.cablePrice;
      if (this.includeEthernet) total += this.ethernetPrice;
      return total;
    },
    finalTotal() {
      return parseFloat((this.cartTotal + this.addonsTotal).toFixed(2));
    },
    canCheckout() {
      return this.acceptTerms && this.finalTotal >= 70;
    },
    checkoutButtonTitle() {
      if (!this.acceptTerms) {
        return 'Please accept terms and conditions';
      }
      if (this.finalTotal < 70) {
        return `Minimum order is $70. Current total: $${this.finalTotal}`;
      }
      return 'Proceed to checkout';
    },
    requiresCable() {
      return this.cartItems.some(item => item.cable === true);
    }
  },
  watch: {
    // Auto-check cable if cart contains cable items
    cartItems: {
      handler(newItems) {
        if (this.requiresCable && !this.includeCable) {
          this.includeCable = true;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getBadgeText(item) {
      if (item.cable) return 'Cable option';
      if (item.custom) return 'Digital';
      return 'USB option';
    },
    getBadgeClass(item) {
      if (item.cable) return 'cable-badge';
      if (item.custom) return 'digital-badge';
      return 'usb-badge';
    },
    getOriginalPrice(item) {
      return Math.round(item.price * 1.2);
    },
    getProductIcon(item) {
      // Return the icon filename, falling back to a default
      return item.icon || 'bluetooth.svg';
    },
    removeItem(item) {
      // Emit toggle-cart event to parent to remove the item
      this.$emit('checkout', { action: 'remove-item', item });
    },
    proceedToCheckout() {
      if (this.canCheckout) {
        const checkoutData = {
          action: 'checkout',
          cartItems: this.cartItems,
          addons: {
            cable: this.includeCable,
            ethernet: this.includeEthernet
          },
          pricing: {
            cartTotal: this.cartTotal,
            cablePrice: this.includeCable ? this.cablePrice : 0,
            ethernetPrice: this.includeEthernet ? this.ethernetPrice : 0,
            total: this.finalTotal
          },
          acceptedTerms: this.acceptTerms
        };

        this.$emit('checkout', checkoutData);
      }
    }
  }
}
</script>

<style scoped>
.summary-section {
  position: relative;
  background: #f5f5f5;
  width: 100%;
  margin: 15px auto;
  padding: 50px 20px 20px;
  clip-path: polygon(0 0, 100% 0, 100% 86%, 93% 100%, 0 100%);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 2px solid #317F6F;
}

.floating-header {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 45px;
  z-index: 10;
  clip-path: polygon(0 0, 100% 0, 100% 65%, 95% 100%, 0 100%);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.summary-title {
  font-family: 'Strait', sans-serif;
  font-size: 28px;
  font-weight: 400;
  margin-top: 10px;
  color: #267778;
}

/* Inner Card Container */
.inner-card {
  background: white;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.cart-items {
  padding: 20px 20px 0;
}

.summary-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f4;
  gap: 12px;
}

.summary-item:last-child {
  border-bottom: none;
}

.product-icon {
  width: 28px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.product-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-family: 'Strait', sans-serif;
  font-size: 14px;
  color: #267778;
  line-height: 1.2;
  font-weight: 500;
}

.item-badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 500;
  color: white;
  width: fit-content;
  text-transform: uppercase;
  margin-left: 5px;
  border-radius: 4px;
}

.cable-badge {
  color: #1DAE90;
  border: 1px solid #1DAE90;
  background-color: #ffffff;
}

.usb-badge {
  color: #1E99AA;
  border: 1px solid #1E99AA;
  background-color: #ffffff;
}

.digital-badge {
  background: #FF6B6B;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.price-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.original-price {
  font-size: 11px;
  color: #E74C3C;
  text-decoration: line-through;
  font-family: 'Spline Sans Mono', monospace;
}

.current-price {
  font-size: 14px;
  font-weight: 600;
  color: #267778;
  font-family: 'Spline Sans Mono', monospace;
}

.remove-btn {
  width: 22px;
  height: 22px;
  border: none;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #E74C3C;
  color: white;
}

.additional-items {
  padding: 16px 20px 20px;
  border-top: 1px solid #e9ecef;
  margin-top: 8px;
}

.addon-item {
  padding: 12px 0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.addon-checkbox-container {
  display: flex;
  align-items: flex-start;
  margin-top: 1px;
}

.addon-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #267778;
  cursor: pointer;
  flex-shrink: 0;
  appearance: auto;
  -webkit-appearance: checkbox;
  -moz-appearance: checkbox;
}

.addon-item:last-child {
  border-bottom: none;
}

.addon-main {
  width: 100%;
}

.addon-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}

.addon-name {
  font-size: 14px;
  color: #267778;
  font-weight: 500;
  cursor: pointer;
}

.addon-desc {
  font-size: 11px;
  color: #666;
  line-height: 1.4;
  margin-top: 4px;
}

.addon-price {
  font-size: 14px;
  font-weight: 600;
  color: #267778;
  flex-shrink: 0;
  font-family: 'Spline Sans Mono', monospace;
}

.addon-pricing {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  flex-shrink: 0;
}

/* Total Price Section */
.summary-total {
  background: linear-gradient(180deg, #317F6F 0%, #1B7E8B 100%);
  padding: 16px 20px;
  color: #ffffff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 52%, 97% 100%, 0 100%);
  margin: 0;
}

.total-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.minimum-order {
  font-size: 10px;
  color: #ffffff;
  transition: color 0.2s ease;
}

.minimum-order.minimum-met {
  color: #ffffff;
}

.total-amount {
  font-size: 18px;
  font-weight: 600;
  color: white;
  font-family: 'Spline Sans Mono', monospace;
}

/* Terms Section */
.terms-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.terms-checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.terms-checkbox {
  width: 18px;
  height: 18px;
  margin-top: 1px;
  accent-color: #267778;
  cursor: pointer;
  flex-shrink: 0;
  appearance: auto;
  -webkit-appearance: checkbox;
  -moz-appearance: checkbox;
}

.terms-label {
  font-size: 12px;
  color: #333;
  cursor: pointer;
  line-height: 1.4;
}

.disclaimer {
  font-size: 11px;
  color: #666;
  line-height: 1.4;
  margin: 0;
}

.link {
  color: #267778;
  text-decoration: underline;
  cursor: pointer;
}

.link:hover {
  color: #60E6D7;
}

/* Checkout Button */
.checkout-btn {
  position: relative;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Strait', sans-serif;
  transition: transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  line-height: 1;
  outline: none;
  border: none;
  background: transparent;
  min-width: 180px;
  height: 36px;
  font-size: 14px;
  padding: 10px 24px;
  text-transform: capitalize;
  align-self: center;
  margin-top: 8px;
}

.checkout-btn:disabled {
  cursor: not-allowed;
}

.button-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.button-text {
  position: relative;
  z-index: 2;
  pointer-events: none;
  transition: color 0.2s ease;
  color: white;
}

.checkout-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.checkout-btn:hover:not(:disabled) path[fill="url(#checkoutGradient)"] {
  fill: #2d8688;
}

.checkout-btn:disabled .button-text {
  color: #666;
}

@media (max-width: 768px) {
  .summary-section {
    max-width: 340px;
    margin: 10px auto;
    padding: 45px 16px 16px;
  }

  .floating-header {
    height: 40px;
  }

  .summary-title {
    font-size: 24px;
  }

  .cart-items,
  .additional-items {
    padding-left: 16px;
    padding-right: 16px;
  }

  .summary-total {
    padding-left: 16px;
    padding-right: 16px;
  }

  .checkout-btn {
    min-width: 160px;
    font-size: 13px;
  }
}
</style>