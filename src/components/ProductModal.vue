<template>
  <div v-if="product" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div>
          <h2 class="modal-title">{{ product.name }}</h2>
          <span class="product-type-badge">
            {{ product.cable ? 'Cable' : 'USB' }}
          </span>
        </div>
        <button class="modal-close" @click="$emit('close')">&times;</button>
      </div>
      
      <div class="modal-body">
        <div v-if="product.video" v-html="product.video" class="modal-video"></div>
        <div v-else-if="product.image" class="modal-image">
          <img :src="product.image" :alt="product.name" style="width: 100%; border-radius: 8px;">
        </div>
        
        <div class="modal-description" v-html="product.description || product.smallDescription"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 20px; font-weight: 600;">${{ product.price }}</div>
        </div>
      </div>
      
      <div class="modal-actions">
        <CustomButton
          text="Close"
          variant="secondary"
          size="medium"
          @click="$emit('close')"
          class="modal-close-btn"
        />
        <CustomButton
          :text="isInCart ? 'Remove from Cart' : 'Add to Cart'"
          :variant="isInCart ? 'outline' : 'primary'"
          size="medium"
          @click="handleCartToggle"
          class="modal-action-btn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from './CustomButton.vue'

export default {
  name: 'ProductModal',
  components: {
    CustomButton
  },
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

  methods: {
    handleCartToggle() {
      this.$emit('toggle-cart', this.product);
      this.$emit('close');
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
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  color: #000;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 24px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #f1f3f4;
  padding-bottom: 20px;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
  line-height: 1.3;
}

.product-type-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
  background: #f1f3f4;
  color: #5f6368;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #5f6368;
  padding: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background-color: #f1f3f4;
  color: #1a1a1a;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  max-height: calc(90vh - 180px);
}

.modal-description {
  font-size: 15px;
  line-height: 1.6;
  color: #3c4043;
  margin-bottom: 24px;
}

.modal-video {
  width: 100%;
  height: 350px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 24px;
}

.modal-actions {
  padding: 0 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  border-top: 1px solid #f1f3f4;
  padding-top: 20px;
}

/* Custom scrollbar for modal */
.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: #f1f3f4;
  border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #dadce0;
  border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #9aa0a6;
}

@media (max-width: 768px) {
  .modal-content {
    margin: 20px 10px;
    max-width: calc(100vw - 20px);
  }

  .modal-header,
  .modal-body,
  .modal-actions {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>