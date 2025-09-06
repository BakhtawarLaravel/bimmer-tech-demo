<template>
  <div id="app">
    <div class="container">
      <h1 class="section-title">Check your coding options</h1>

      <!-- Filter Controls -->
      <FilterControls :categories="categories" :selected-categories="selectedCategories" :selected-type="selectedType"
        :sort-by="sortBy" @toggle-category="toggleCategory" @update-selected-type="updateSelectedType"
        @update-sort-by="updateSortBy" @clear-filters="clearFilters" />

      <!-- Selected Products -->
      <ProductsGrid v-if="filteredProducts.length > 0" :title="selectedProductsHeader" :products="filteredProducts"
        :cart-items="cartItems" :is-other-product="false" @learn-more="openModal" @toggle-cart="toggleCart" />

      <!-- Other Products -->
      <ProductsGrid v-if="otherProducts.length > 0" title="Other coding options" :products="otherProducts"
        :cart-items="cartItems" :is-other-product="true" @learn-more="openModal" @toggle-cart="toggleCart" />

      <!-- Empty State -->
      <EmptyState v-if="filteredProducts.length === 0 && otherProducts.length === 0" />

      <!-- Cart Summary -->
      <CartSummary :cart-items="cartItems" @checkout="handleCheckout" />
    </div>

    <!-- Product Modal -->
    <ProductModal :product="selectedProduct" :isInCart="selectedProduct ? isInCart(selectedProduct.id) : false"
      @close="closeModal" @toggle-cart="toggleCart" />
  </div>
</template>

<script>
// Import components
import FilterControls from './components/FilterControls.vue'
import ProductsGrid from './components/ProductsGrid.vue'
import ProductModal from './components/ProductModal.vue'
import CartSummary from './components/CartSummary.vue'
import EmptyState from './components/EmptyState.vue'
import ProductData from './data/product.js'

export default {
  name: 'App',
  components: {
    FilterControls,
    ProductsGrid,
    ProductModal,
    CartSummary,
    EmptyState
  },
  data() {
    return {
      selectedProduct: null,
      selectedCategories: [],
      selectedType: 'all',
      sortBy: 'default',
      cartItems: [],
      categories: [
        { key: 'sound', name: 'Sound' },
        { key: 'infotainment', name: 'Infotainment' },
        { key: 'doors_trunk', name: 'Doors & Trunk' },
        { key: 'navigation', name: 'Navigation' },
        { key: 'display', name: 'Display' },
        { key: 'service_diagnostic', name: 'Service & Diagnostic' },
        { key: 'video', name: 'Video' },
        { key: 'control', name: 'Control' }
      ],
      products: ProductData
    }
  },
  computed: {
    selectedProductsHeader() {
      let header = 'Selected';
      if (this.selectedType !== 'all') {
        header += ` ${this.selectedType.toUpperCase()}`;
      }
      header += ' products';

      if (this.selectedCategories.length > 0) {
        const categoryNames = this.selectedCategories.map(key =>
          this.categories.find(cat => cat.key === key)?.name
        ).filter(Boolean);
        header += ': ' + categoryNames.join(' / ');
      }

      return header + ':';
    },

    allDisplayableProducts() {
      return this.products.filter(product => product.showOnStartUp);
    },

    typeFilteredProducts() {
      let filtered = this.allDisplayableProducts;

      if (this.selectedType === 'usb') {
        filtered = filtered.filter(p => !p.cable);
      } else if (this.selectedType === 'cable') {
        filtered = filtered.filter(p => p.cable);
      }

      return filtered;
    },

    filteredProducts() {
      if (this.selectedCategories.length === 0) {
        return [];
      }

      let filtered = this.typeFilteredProducts.filter(product => {
        return this.selectedCategories.some(category =>
          product.filters && product.filters[category]
        );
      });

      return this.sortProducts(filtered);
    },

    otherProducts() {
      // Only show other products when categories are selected
      if (this.selectedCategories.length === 0) {
        return this.sortProducts(this.typeFilteredProducts);
      }

      // When categories are selected, show products that DON'T match the filter
      let others = this.typeFilteredProducts.filter(product => {
        return !this.selectedCategories.some(category =>
          product.filters && product.filters[category]
        );
      });

      return this.sortProducts(others);
    }
  },
  methods: {
    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      } else {
        this.selectedCategories.push(category);
      }
    },

    updateSelectedType(newType) {
      this.selectedType = newType;
    },

    updateSortBy(newSortBy) {
      this.sortBy = newSortBy;
    },

    clearFilters() {
      this.selectedCategories = [];
      this.selectedType = 'all';
      this.sortBy = 'default';
    },

    sortProducts(products) {
      const sorted = [...products];
      console.log('Sorting products with:', this.sortBy, 'Total products:', sorted.length);

      switch (this.sortBy) {
        case 'price-low':
          const lowToHigh = sorted.sort((a, b) => a.price - b.price);
          console.log('Price low to high:', lowToHigh.map(p => `${p.name}: ${p.price}`));
          return lowToHigh;
        case 'price-high':
          const highToLow = sorted.sort((a, b) => b.price - a.price);
          console.log('Price high to low:', highToLow.map(p => `${p.name}: ${p.price}`));
          return highToLow;
        default:
          console.log('Default sorting');
          return sorted;
      }
    },

    openModal(product) {
      this.selectedProduct = product;
    },

    closeModal() {
      this.selectedProduct = null;
    },

    isInCart(productId) {
      return this.cartItems.some(item => item.id === productId);
    },

    toggleCart(product) {
      const existingIndex = this.cartItems.findIndex(item => item.id === product.id);

      if (existingIndex > -1) {
        this.cartItems.splice(existingIndex, 1);
      } else {
        // Add product data that CartSummary will need
        this.cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          cable: product.cable || false,
          custom: product.custom || false,
          icon: product.icon || 'bluetooth.svg'
        });
      }
    },

    handleCheckout(checkoutData) {
      if (checkoutData.action === 'remove-item') {
        // Handle item removal from cart summary
        this.toggleCart(checkoutData.item);
      } else if (checkoutData.action === 'checkout') {
        // Handle the actual checkout process
        this.processCheckout(checkoutData);
      }
    },

    processCheckout(checkoutData) {
      const { cartItems, addons, pricing, acceptedTerms } = checkoutData;

      console.log('Processing checkout:', {
        cartItems,
        addons,
        pricing,
        acceptedTerms
      });

      // Here you would integrate with your payment processor
      // For now, just show a success message
      alert(`Checkout successful! Total: $${pricing.total}
            
Items: ${cartItems.length}
Cable included: ${addons.cable ? 'Yes' : 'No'}
Ethernet adapter: ${addons.ethernet ? 'Yes' : 'No'}
            
Thank you for your order!`);

      // Optionally clear the cart after successful checkout
      // this.cartItems = [];
    }
  }
}
</script>

<!-- Keep your existing styles -->

<style>
/* Import Google Fonts - BMW-style typography + Strait font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Strait&display=swap');

/* CSS Variables for BMW Design System */
:root {
  /* BMW Color Palette */
  --primary-teal: #4ECDC4;
  --primary-blue: #5DADE2;
  --accent-red: #E74C3C;
  --dark-bg: #1A1A1A;
  --card-bg: #FFFFFF;
  --text-white: #FFFFFF;
  --text-dark: #1A1A1A;
  --text-muted: #6B7280;
  --border-light: rgba(255, 255, 255, 0.2);
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.15);

  /* BMW Typography */
  --font-family-primary: 'Strait', sans-serif;
  /* --font-family-secondary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; */
  --font-family-strait: 'Strait', sans-serif;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Font Sizes */
  --font-size-xs: 11px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 28px;
  --font-size-4xl: 32px;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 32px;
  --spacing-4xl: 40px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;
}

/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-base);
  line-height: 1.5;
  color: var(--text-white);
  background-color: #000000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Improve text rendering on high-DPI displays */
@media (-webkit-min-device-pixel-ratio: 2),
(min-resolution: 192dpi) {
  body {
    -webkit-font-smoothing: subpixel-antialiased;
  }
}

/* App Container */
#app {
  background-color: #000000;
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-4xl) var(--spacing-xl);
}

/* Typography Styles */
.section-title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  margin-bottom: var(--spacing-4xl);
  text-align: left;
  color: var(--text-white);
  letter-spacing: -0.02em;
}

/* Button Base Styles */
button {
  font-family: inherit;
  font-size: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

button:focus {
  outline: 2px solid var(--primary-teal);
  outline-offset: 2px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Input Base Styles */
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input:focus,
select:focus,
textarea:focus {
  outline: 2px solid var(--primary-teal);
  outline-offset: 2px;
}

/* Link Styles */
a {
  color: var(--primary-teal);
  text-decoration: none;
  transition: color var(--transition-normal);
}

a:hover {
  color: #60E6D7;
}

a:focus {
  outline: 2px solid var(--primary-teal);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Utility Classes */
.text-primary {
  color: var(--primary-teal);
}

.text-secondary {
  color: var(--primary-blue);
}

.text-muted {
  color: var(--text-muted);
}

.font-light {
  font-weight: var(--font-weight-light);
}

.font-regular {
  font-weight: var(--font-weight-regular);
}

.font-medium {
  font-weight: var(--font-weight-medium);
}

.font-semibold {
  font-weight: var(--font-weight-semibold);
}

.font-bold {
  font-weight: var(--font-weight-bold);
}

.font-strait {
  font-family: var(--font-family-strait);
}

.font-spline-mono {
  font-family: var(--font-family-spline-mono);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .container {
    max-width: 768px;
    padding: var(--spacing-3xl) var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .container {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .section-title {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-3xl);
  }
}

@media (max-width: 480px) {
  .container {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .section-title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-2xl);
  }
}

@media (max-width: 320px) {
  .container {
    padding: var(--spacing-md);
  }
}

/* Performance Optimizations */
.container {
  will-change: transform;
}

/* Print Styles */
@media print {
  * {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }

  .container {
    max-width: none;
    margin: 0;
    padding: 0;
  }

  .section-title {
    color: black !important;
  }
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  :root {
    --border-light: rgba(255, 255, 255, 0.8);
    --text-muted: #FFFFFF;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Dark Mode Support (already dark, but for consistency) */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000000;
    color: var(--text-white);
  }
}

/* Selection Styles */
::selection {
  background-color: var(--primary-teal);
  color: white;
}

::-moz-selection {
  background-color: var(--primary-teal);
  color: white;
}

/* Scrollbar Styles */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--dark-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-teal);
  border-radius: var(--radius-lg);
}

::-webkit-scrollbar-thumb:hover {
  background: #60E6D7;
}

/* Loading Animation Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply fade-in animation to main content */
.container>* {
  animation: fadeIn var(--transition-slow) ease-out;
}

/* Focus Management */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-cable);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: var(--radius-sm);
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
</style>