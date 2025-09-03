<template>
    <div id="app">
        <div class="container">
            <h1 class="section-title">Check your coding options</h1>

            <!-- Filter Controls -->
            <FilterControls 
                :categories="categories" 
                :selected-categories="selectedCategories"
                :selected-type="selectedType" 
                :sort-by="sortBy" 
                @toggle-category="toggleCategory"
                @update-selected-type="updateSelectedType"
                @update-sort-by="updateSortBy"
                @clear-filters="clearFilters" 
            />

            <!-- Selected Products -->
            <ProductsGrid v-if="filteredProducts.length > 0" :title="selectedProductsHeader"
                :products="filteredProducts" :cart-items="cartItems" :is-other-product="false" @learn-more="openModal"
                @toggle-cart="toggleCart" />

            <!-- Other Products -->
            <ProductsGrid v-if="otherProducts.length > 0" title="Other coding options" :products="otherProducts"
                :cart-items="cartItems" :is-other-product="true" @learn-more="openModal" @toggle-cart="toggleCart" />

            <!-- Empty State -->
            <EmptyState v-if="filteredProducts.length === 0 && otherProducts.length === 0" />

            <!-- Cart Summary -->
            <CartSummary :cart-items="cartItems" @checkout="checkout" />
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

        // Add these new methods to properly handle type and sort updates
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
                this.cartItems.push({
                    id: product.id,
                    name: product.name,
                    price: product.price
                });
            }
        },

        checkout() {
            const cartTotal = this.cartItems.reduce((total, item) => total + item.price, 0);
            if (cartTotal >= 70) {
                alert(`Proceeding to checkout with items worth $${cartTotal}`);
                console.log('Cart items:', this.cartItems);
            }
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #000;
    color: #fff;
    line-height: 1.5;
}

#app {
    background-color: #000;
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.section-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 40px;
    text-align: left;
    color: #fff;
}

@media (max-width: 768px) {
    .container {
        padding: 20px 16px;
    }

    .section-title {
        font-size: 28px;
        margin-bottom: 32px;
    }
}
</style>