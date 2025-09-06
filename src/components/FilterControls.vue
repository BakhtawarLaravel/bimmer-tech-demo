<template>
  <div class="filter-controls">
    <!-- Categories Filter -->
    <div class="categories-section">
      <div class="categories-header">
        <span class="categories-label">Categories:</span>
        <button class="clear-filters" @click="clearFilters">Clear filters</button>
      </div>
      <div class="categories-filter">
        <button
          v-for="category in categories"
          :key="category.key"
          :class="['filter-button', { 'active': selectedCategories.includes(category.key) }]"
          @click="toggleCategory(category.key)"
        >
          <svg class="button-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
            <!-- Fill background when active -->
            <path 
              v-if="selectedCategories.includes(category.key)"
              d="M 12 0 L 100 0 L 100 25 L 88 50 L 0 50 L 0 25 Z"
              fill="#ffffff"
            />
            <!-- Always show stroke -->
            <path 
              d="M 12 0 L 100 0 L 100 25 L 88 50 L 0 50 L 0 25 Z"
              fill="none" 
              stroke="#ffffff"
              stroke-width="1"
              vector-effect="non-scaling-stroke"
              :class="{ 'active-stroke': selectedCategories.includes(category.key) }"
            />
          </svg>
          <span class="button-text">{{ category.name }}</span>
        </button>
      </div>
    </div>
   
    <!-- Type and Sort Section - Combined Row -->
    <div class="type-sort-section">
      <!-- Type Section -->
      <div class="type-section">
        <div class="type-header">
          <span class="type-label">Type:</span>
        </div>
        <div class="type-filter">
          <button
            :class="['filter-button', { 'active': selectedType === 'all' }]"
            @click="updateType('all')"
          >
            <svg class="button-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
              <!-- Fill background when active -->
              <path 
                v-if="selectedType === 'all'"
                d="M 12 0 L 100 0 L 100 25 L 88 50 L 0 50 L 0 25 Z"
                fill="#ffffff"
              />
              <!-- Always show stroke -->
              <path 
                d="M 12 0 L 100 0 L 100 25 L 88 50 L 0 50 L 0 25 Z"
                fill="none" 
                stroke="#ffffff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
                :class="{ 'active-stroke': selectedType === 'all' }"
              />
            </svg>
            <span class="button-text">All</span>
          </button>
          <button
            :class="['filter-button', { 'active': selectedType === 'usb' }]"
            @click="updateType('usb')"
          >
            <svg class="button-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
              <!-- Fill background when active -->
              <path 
                v-if="selectedType === 'usb'"
                d="M 12 0 L 100 0 L 100 25 L 88 50 L 0 50 L 0 25 Z"
                fill="#ffffff"
              />
              <!-- Always show stroke -->
              <path 
                d="M 12 0 L 100 0 L 100 25 L 88 50 L 0 50 L 0 25 Z"
                fill="none" 
                stroke="#ffffff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
                :class="{ 'active-stroke': selectedType === 'usb' }"
              />
            </svg>
            <span class="button-text">USB</span>
          </button>
          <button
            :class="['filter-button', { 'active': selectedType === 'cable' }]"
            @click="updateType('cable')"
          >
            <svg class="button-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
              <!-- Fill background when active -->
              <path 
                v-if="selectedType === 'cable'"
                d="M 12 0 L 100 0 L 100 25 L 88 50 L 0 50 L 0 25 Z"
                fill="#ffffff"
              />
              <!-- Always show stroke -->
              <path 
                d="M 12 0 L 100 0 L 100 25 L 88 50 L 0 50 L 0 25 Z"
                fill="none" 
                stroke="#ffffff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
                :class="{ 'active-stroke': selectedType === 'cable' }"
              />
            </svg>
            <span class="button-text">Cable</span>
          </button>
        </div>
      </div>

      <!-- Sort Section -->
      <div class="sort-section">
        <div class="control-group">
          <label for="sort-filter">Sort by</label>
          <select id="sort-filter" :value="sortBy" @change="updateSort($event.target.value)">
            <option value="default">Default</option>
            <option value="price-low">Price (low to high)</option>
            <option value="price-high">Price (high to low)</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterControls',
  props: {
    categories: {
      type: Array,
      required: true
    },
    selectedCategories: {
      type: Array,
      default: () => []
    },
    selectedType: {
      type: String,
      default: 'all'
    },
    sortBy: {
      type: String,
      default: 'default'
    }
  },
  emits: ['toggle-category', 'update-selected-type', 'update-sort-by', 'clear-filters'],
  methods: {
    toggleCategory(category) {
      this.$emit('toggle-category', category);
    },
    updateType(type) {
      console.log('FilterControls: Updating type to:', type);
      this.$emit('update-selected-type', type);
    },
    updateSort(sortValue) {
      console.log('FilterControls: Updating sort to:', sortValue);
      this.$emit('update-sort-by', sortValue);
    },
    clearFilters() {
      this.$emit('clear-filters');
    }
  }
}
</script>

<style scoped>
.filter-controls {
  margin-bottom: 40px;
}

.categories-section {
  margin-bottom: 32px;
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.categories-label {
  font-size: 16px;
  color: #fff;
  font-weight: 400;
}

.clear-filters {
  background: none;
  border: none;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 0;
  font-family: inherit;
}

.clear-filters:hover {
  color: #fff;
}

.categories-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
}

/* Type and Sort Combined Section */
.type-sort-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
}

.type-section {
  flex: 1;
}

.type-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.type-label {
  font-size: 16px;
  color: #fff;
  font-weight: 400;
}

.type-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
}

/* Filter Button Styles */
.filter-button {
  position: relative;
  cursor: pointer;
  font-weight: 200;
  transition: none; /* Remove transform transitions to prevent movement */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  line-height: 1;
  letter-spacing: 0.3px;
  outline: none;
  border: none;
  background: transparent;
  min-width: 120px;
  width: auto;
  height: 40px;
  font-size: 15px;
  padding: 12px 24px;
}

.button-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Active stroke styling */
.active-stroke {
  stroke: #000000 !important;
}

.button-text {
  position: relative;
  z-index: 2;
  pointer-events: none;
  transition: color 0.2s ease;
  color: #fff;
}

.filter-button.active .button-text {
  color: #000;
}

/* Hover states - only affect the specific button being hovered */
.filter-button:hover:not(:disabled):not(.active) path {
  stroke: #cccccc;
}

.filter-button:hover:not(:disabled):not(.active) .button-text {
  color: #fff;
}

.filter-button:hover:not(:disabled).active .button-text {
  color: #000;
}


/* Sort Section */
.sort-section {
  flex-shrink: 0;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-group label {
  font-size: 16px;
  color: #fff;
  font-weight: 400;
  white-space: nowrap;
}

select {
  padding: 12px 32px 12px 0;
  border: none;
  border-bottom: 1px solid #ffffff;
  border-radius: 0;
  background-color: transparent;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  min-width: 160px;
  height: 44px;
  font-family: inherit;
  flex-shrink: 0;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 12px;
}

select option {
  background-color: #1a1a1a !important;
  color: #fff !important;
  padding: 8px;
}

select option:hover,
select option:focus,
select option:checked:hover {
  background-color: #4ECDC4 !important;
  color: #000 !important;
}

select:focus {
  outline: none;
}

select:hover {
  border-bottom-color: #cccccc;
}

@media (max-width: 768px) {
  .categories-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .categories-filter {
    justify-content: flex-start;
    gap: 8px;
  }

  .type-sort-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .type-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .type-filter {
    justify-content: flex-start;
    gap: 8px;
  }
  
  .sort-section {
    width: 100%;
  }
  
  .control-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }
  
  select {
    width: 100%;
  }
}
</style>