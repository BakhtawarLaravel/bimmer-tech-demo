<template>
  <div v-if="product" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <!-- Close Button - separate from header -->
      <button class="modal-close" @click="$emit('close')">×</button>

      <!-- Floating Header Card -->
      <div class="floating-header">

         <!-- Badge on righside (like ProductCard) -->
        <div :class="badgeClass">
          {{ badgeText }}
        </div>

        <!-- Product Icon -->
        <div class="product-icon">
          <img src="/icons/bluetooth.svg" alt="Bluetooth Icon" />
        </div>

        <!-- Title Section -->
        <div class="title-section">
          <h2 class="modal-title">{{ product.name }}</h2>
        </div>

        <!-- Price Section -->
        <div class="price-section">
          <div class="price-container">
            <span class="original-price">${{ staticDiscountedPrice }}.-</span>
            <span class="current-price">${{ product.price }}.-</span>
          </div>

          <!-- Select Button -->
          <button class="select-btn" @click="handleCartToggle" :class="{ 'selected': isInCart }">
            <svg class="button-svg" viewBox="0 0 100 36" preserveAspectRatio="none">
              <defs>
                <linearGradient id="modalDefaultGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#317F6F;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#1B7E8B;stop-opacity:1" />
                </linearGradient>
              </defs>
              <path v-if="!isInCart" d="M 12 0 L 100 0 L 100 25 L 88 36 L 0 36 L 0 11 Z"
                fill="url(#modalDefaultGradient)" />
              <path d="M 12 0 L 100 0 L 100 25 L 88 36 L 0 36 L 0 11 Z" fill="none"
                :stroke="isInCart ? '#267778' : 'transparent'" stroke-width="1.5" vector-effect="non-scaling-stroke" />
            </svg>
            <span class="button-text">{{ selectButtonText }}</span>
          </button>
        </div>

       
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <!-- Description -->
        <div class="modal-description" v-html="product.description || product.smallDescription"></div>

        <!-- Video or Image - Center aligned with border -->
        <div class="media-container">
          <div v-if="product.video" class="modal-video" v-html="product.video"></div>
          <div v-else-if="product.image" class="modal-image">
            <img :src="product.image" :alt="product.name">
          </div>
        </div>

        <!-- Additional Select Button at bottom -->
        <div class="bottom-select-section">
          <button class="select-btn bottom-select" @click="handleCartToggle" :class="{ 'selected': isInCart }">
            <svg class="button-svg" viewBox="0 0 100 28" preserveAspectRatio="none">
              <defs>
                <linearGradient id="modalBottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#317F6F;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#1B7E8B;stop-opacity:1" />
                </linearGradient>
              </defs>
              <path v-if="!isInCart" d="M 8 0 L 100 0 L 100 20 L 92 28 L 0 28 L 0 8 Z"
                fill="url(#modalBottomGradient)" />
              <path d="M 8 0 L 100 0 L 100 20 L 92 28 L 0 28 L 0 8 Z" fill="none"
                :stroke="isInCart ? '#267778' : 'transparent'" stroke-width="1.5" vector-effect="non-scaling-stroke" />
            </svg>
            <span class="button-text">{{ selectButtonText }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductModal',

  props: {
    product: {
      type: Object,
      default: null
    },
    isInCart: {
      type: Boolean,
      default: false
    }
  },

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
      return Math.round(this.product.price * 1.2);
    }
  },

  methods: {
    handleCartToggle() {
      this.$emit('toggle-cart', this.product);
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(1px);
}

.modal-content {
  background: #212121;
  max-width: 1000px;
  min-height: 600px;
  width: 100%;
  color: #FFFFFF;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
  border: 2px solid #333333;
  position: relative;
  padding-top: 80px;
  overflow: hidden;
}

/* Close Button - outside of header */
.modal-close {
  position: absolute;
  top: 1px;
  right: 1px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #FFFFFF;
  padding: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 20;
}

.modal-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #CCCCCC;
}

/* Floating Header - EXACT match to Figma */
.floating-header {
  position: absolute;
  margin-top:20px;
  margin-bottom:40px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  /* padding: 16px 0 16px 20px; */
  display: flex;
  align-items: center;
  /* gap: 16px; */
  width: 85%;
  height: 100px;
  z-index: 10;
  clip-path: polygon(0 0, 100% 0, 100% 62%, 96% 100%, 0 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-icon {
  width: 45px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 20px;
  margin-left: 20px;
}

.product-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.title-section {
  flex: 1;
  min-width: 0;
  padding-right: 8px;
}

.modal-title {
  font-family: 'Strait', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #267778;
  margin: 0;
}

/* Price Section */
.price-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 40px;
}

.price-container {
  display: flex;
  flex-direction: column;
  /* gap: 2px; */
  align-items: flex-end;
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
  font-weight: 600;
  font-style: normal;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0;
  color: #267778;
}

/* Badge Styling - EXACT placement on right side */
.cable-badge,
.usb-badge,
.digital-badge {
  color: white;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-orientation: mixed;
  height: 100px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Modal Body */
.modal-body {
  padding: 40px 24px 24px;
  background-color: #212121;
}

.modal-description {
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #FFFFFF;
  margin-top: 24px;
  margin-bottom: 24px;
}

/* Media Container - Properly centered */
.media-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  width: 100%;
}

.modal-video {
  width: 100%;
  max-width: 304px;
  border: 2px solid #267778;
  display: flex;
  justify-content: center;
}

.modal-video iframe {
  width: 100%;
  height: 600px; /* increased from 500px to 600px */
  border: none;
  display: block;
}

.modal-image {
  width: 100%;
  max-width: 600px;
  border: 1px solid #267778;
  display: flex;
  justify-content: center;
}

.modal-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Select Button Styling */
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
  /* margin-right: 40px; */
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

.select-btn.selected .button-text {
  color: #267778;
}

.select-btn:hover:not(.selected) {
  transform: translateY(-1px);
}

.select-btn:hover:not(.selected) path[fill="url(#modalDefaultGradient)"],
.select-btn:hover:not(.selected) path[fill="url(#modalBottomGradient)"] {
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

/* Bottom Select Section */
.bottom-select-section {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-top: 20px;
}

.bottom-select {
  min-width: 120px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-content {
    margin: 10px;
    max-width: calc(100vw - 20px);
    padding-top: 50px;
  }

  .floating-header {
    width: 90%;
    height: 90px;
    top: -25px;
    padding: 12px 0 12px 16px;
    gap: 12px;
  }

  .modal-title {
    font-size: 20px;
  }

  .modal-body {
    padding: 30px 16px 16px;
  }

  .modal-video iframe {
    height: 400px; /* increased from 300px to 400px */
    width: 400px; /* increased from 300px to 400px */
  }
}

@media (max-width: 480px) {
  .floating-header {
    gap: 10px;
    padding: 10px 0 10px 12px;
    height: 80px;
    top: -20px;
  }

  .product-icon {
    width: 32px;
    height: 40px;
  }

  .cable-badge,
  .usb-badge,
  .digital-badge {
    height: 80px;
    width: 36px;
    font-size: 10px;
  }

  .modal-title {
    font-size: 18px;
  }

  .current-price {
    font-size: 18px;
  }

  .price-section {
    gap: 12px;
  }

  .modal-video iframe {
    height: 350px; /* increased from 250px to 350px */
  }
}
</style>