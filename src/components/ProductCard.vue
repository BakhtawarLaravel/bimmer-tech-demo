<template>
  <div class="product-card">
    <!-- SVG Border -->
    <svg class="card-border-svg" viewBox="0 0 300 284" preserveAspectRatio="none">
      <path 
        d="M 0 0 L 300 0 L 300 253 L 267 284 L 0 284 Z"
        fill="none" 
        stroke="#333333" 
        stroke-width="2"
        vector-effect="non-scaling-stroke"
      />
    </svg>

    <!-- Header with icon and title -->
    <div class="card-header">
      <div class="header-content">
        <!-- Product Icon -->
        <div class="product-icon">
          <img src="/icons/bluetooth.svg" alt="Bluetooth Icon" />
        </div>
        
        <!-- Title -->
        <div class="title-section">
          <h2 class="main-title">{{ product.name }}</h2>
        </div>
      </div>
      
      <!-- Badge (Cable/USB/Digital) -->
      <div :class="badgeClass">
        {{ badgeText }}
      </div>
    </div>

    <!-- Card Content -->
    <div class="card-content">
      <p class="description">
        {{ product.smallDescription }}
      </p>
      
      <button class="learn-more-btn" @click="learnMore">
        Learn more →
      </button>
      
      <!-- Price Section -->
      <div class="price-section">
        <div class="price-container">
          <!-- Static discounted price (always shown) -->
          <span class="original-price">
            ${{ staticDiscountedPrice }}.-
          </span>
          <span class="current-price">${{ product.price }}.-</span>
        </div>
        
        <button class="select-btn" @click="toggleCart" :class="{ 'selected': isInCart }">
          <svg class="button-svg" viewBox="0 0 100 36" preserveAspectRatio="none">
            <!-- Fill background when not selected (default state) -->
            <defs>
              <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#317F6F;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1B7E8B;stop-opacity:1" />
              </linearGradient>
            </defs>
            <path 
              v-if="!isInCart"
              d="M 12 0 L 100 0 L 100 25 L 88 36 L 0 36 L 0 11 Z"
              fill="url(#defaultGradient)"
            />
            <!-- Always show stroke -->
            <path 
              d="M 12 0 L 100 0 L 100 25 L 88 36 L 0 36 L 0 11 Z"
              fill="none" 
              :stroke="isInCart ? '#267778' : 'transparent'"
              stroke-width="1.5"
              vector-effect="non-scaling-stroke"
            />
          </svg>
          <span class="button-text">{{ selectButtonText }}</span>
        </button>
      </div>
    </div>
    
    <!-- Angled Corner -->
    <div class="angled-corner"></div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    isInCart: {
      type: Boolean,
      default: false
    },
    isOtherProduct: {
      type: Boolean,
      default: false
    }
  },
  emits: ['learn-more', 'toggle-cart'],
  computed: {
    selectButtonText() {
      return this.isInCart ? 'Remove' : '+ Select';
    },
    badgeText() {
      if (this.product.cable) {
        return 'Cable';
      } else if (this.product.custom) {
        return 'Digital';
      } else {
        return 'USB';
      }
    },
    badgeClass() {
      if (this.product.cable) {
        return 'cable-badge';
      } else if (this.product.custom) {
        return 'digital-badge';
      } else {
        return 'usb-badge';
      }
    },
    staticDiscountedPrice() {
      // Calculate a static discounted price (20% higher than current price)
      return Math.round(this.product.price * 1.2);
    }
  },
  methods: {
    toggleCart() {
      this.$emit('toggle-cart', this.product);
    },
    learnMore() {
      this.$emit('learn-more', this.product);
    }
  }
}
</script>

<style scoped>
.product-card {
  position: relative;
  background-color: #010607;
  width: 100%;
  max-width: 300px;
  height: 284px;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 89%, 89% 100%, 0 100%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* SVG Border */
.card-border-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}

.card-header {
  background: #FFFFFF;
  height: 100px;
  padding: 16px 0 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}

.product-icon {
  width: 40px;
  height: 56px;
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

.default-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-section {
  flex: 1;
  min-width: 0;
  padding-right: 8px;
}

.main-title {
  font-family: 'Strait', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #267778;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.cable-badge,
.usb-badge,
.digital-badge {
  color: white;
  padding: 0;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  height: 100px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -16px -1px;
  flex-shrink: 0;
}

.cable-badge {
  background: #1DAE90;
}

.usb-badge {
  background: #1E99AA;
}

.digital-badge {
  background: #FF6B6B;
}

.card-content {
  padding: 20px 20px 16px 20px;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #010607;
  color: white;
}

.description {
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0%;
  color: #FFFFFF;
  margin: 0 0 16px 0;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.learn-more-btn {
  background: none;
  border: none;
  color: #267F7D;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-style: normal;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  cursor: pointer;
  text-align: left;
  padding: 0;
  margin-bottom: 16px;
  transition: color 0.2s ease;
  align-self: flex-start;
  text-transform: lowercase;
  /* text-decoration: underline; */
}

.learn-more-btn:hover {
  color: #60E6D7;
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  gap: 12px;
}

.price-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
}

.original-price {
  font-size: 14px;
  font-weight: 400;
  color: #E74C3C;
  text-decoration: line-through;
  line-height: 1;
  font-family: 'Spline Sans Mono', monospace;
}

.current-price {
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;        /* SemiBold = 600 */
  font-style: normal;      /* 'SemiBold' is handled by font-weight, not font-style */
  font-size: 18px;
  line-height: 100%;       /* or line-height: 1; */
  letter-spacing: 0;
  color: white;
}

/* SVG Button Styles */
.select-btn {
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
  min-width: 90px;
  height: 36px;
  font-size: 13px;
  padding: 10px 18px;
  text-transform: capitalize;
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

/* Selected (Remove) state styling */
.select-btn.selected .button-text {
  color: #267778;
}

/* Hover states */
.select-btn:hover:not(.selected) {
  transform: translateY(-1px);
}

.select-btn:hover:not(.selected) path[fill="url(#defaultGradient)"] {
  fill: #2d8688;
}

.select-btn:hover.selected {
  background: rgba(38, 119, 120, 0.1);
}

.select-btn:hover.selected .button-text {
  color: #2d8688;
}

.select-btn:hover.selected path[stroke="#267778"] {
  stroke: #2d8688;
}

/* Angled corner effect */
.angled-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background: transparent;
  pointer-events: none;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .product-card {
    height: 280px;
    max-width: 280px;
  }
  
  .main-title {
    font-size: 20px;
    max-height: 44px;
  }
  
  .header-content {
    gap: 12px;
  }
  
  .product-icon {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 320px) {
  .card-header {
    padding: 12px 0 12px 16px;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .select-btn {
    min-width: 80px;
    font-size: 12px;
  }
}
</style>