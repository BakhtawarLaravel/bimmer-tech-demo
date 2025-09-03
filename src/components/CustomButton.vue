<template>
  <div class="button-wrapper">
    <!-- SVG button for outline variant -->
    <button 
      v-if="variant === 'outline'" 
      :class="['svg-button', `svg-button--${size}`, { 'svg-button--disabled': disabled }]"
      :disabled="disabled" 
      @click="$emit('click', $event)"
    >
      <svg class="button-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
        <polygon 
          points="12,0 100,0 100,25 88,50 0,50 0,25" 
          :fill="disabled ? 'rgba(0,0,0,0.1)' : 'transparent'"
          stroke="#ffffff" 
          stroke-width="3" 
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <span class="button-text">{{ text }}</span>
    </button>

    <!-- Regular CSS button for other variants -->
    <button 
      v-else
      :class="buttonClasses" 
      :disabled="disabled" 
      @click="$emit('click', $event)"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'outline', 'primary-white'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      return [
        'custom-button',
        `custom-button--${this.variant}`,
        `custom-button--${this.size}`,
        {
          'custom-button--disabled': this.disabled
        }
      ]
    }
  }
}
</script>

<style scoped>
.button-wrapper {
  display: inline-block;
}

/* Base button styles */
.svg-button, .custom-button {
  position: relative;
  cursor: pointer;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  line-height: 1;
  letter-spacing: 0;
  outline: none;
  border: none;
  background: transparent;
}

/* SVG Button Styles */
.svg-button {
  color: #fff;
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
}

/* Consistent sizing for all buttons */
.svg-button--small, .custom-button--small {
  width: 140px;
  height: 30px;
  font-size: 13px;
  padding: 0 18px 0 25px;
}

.svg-button--medium, .custom-button--medium {
  width: 160px;
  height: 32px;
  font-size: 14px;
  padding: 0 20px 0 28px;
}

.svg-button--large, .custom-button--large {
  width: 180px;
  height: 34px;
  font-size: 15px;
  padding: 0 22px 0 30px;
}

/* For longer text, allow expansion but keep narrower */
.svg-button {
  min-width: 130px;
  width: auto;
  max-width: 180px;
}

.custom-button {
  min-width: 130px;
  width: auto;
  max-width: 180px;
  border: 2px solid #ffffff;
  clip-path: polygon(12% 0%, 100% 0%, 100% 50%, 88% 100%, 0% 100%, 0% 50%);
}

/* SVG Button interactions */
.svg-button:hover:not(:disabled) {
  transform: translateY(-1px);
  color: #000;
}

.svg-button:hover:not(:disabled) .button-svg polygon {
  fill: #ffffff;
  stroke: #ffffff;
}

.svg-button:active:not(:disabled) {
  transform: translateY(0);
}

.svg-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Regular button styles */
.custom-button:focus {
  outline: 2px solid #4ECDC4;
  outline-offset: 2px;
}

.custom-button--primary {
  background-color: #4ECDC4;
  color: #000;
  border-color: #fff;
}

.custom-button--primary:hover:not(:disabled) {
  background-color: #45b8b1;
  border-color: #fff;
  transform: translateY(-1px);
}

.custom-button--primary:active:not(:disabled) {
  transform: translateY(0);
}

/* New primary-white variant for Type buttons */
.custom-button--primary-white {
  background-color: #ffffff;
  color: #000;
  border-color: #fff;
}

.custom-button--primary-white:hover:not(:disabled) {
  background-color: #e6e6e6;
  border-color: #fff;
  transform: translateY(-1px);
}

.custom-button--primary-white:active:not(:disabled) {
  transform: translateY(0);
}

.custom-button--secondary {
  background-color: #6c757d;
  color: #fff;
  border-color: #fff;
}

.custom-button--secondary:hover:not(:disabled) {
  background-color: #fff;
  border-color: #fff;
  transform: translateY(-1px);
}

.custom-button--secondary:active:not(:disabled) {
  transform: translateY(0);
}

.custom-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.custom-button--disabled:hover {
  transform: none !important;
}

/* Font loading stability */
.svg-button, .custom-button {
  font-display: swap;
}
</style>