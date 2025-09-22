// 产品卡片小部件 Vue 组件
export default {
  name: 'ProductCardWidget',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 组件数据
    };
  },
  computed: {
    // 计算属性
    hasImage() {
      return this.value.productImage && this.value.productImage._url;
    },
    hasCategory() {
      return this.value.category && this.value.category.trim() !== '';
    },
    hasDescription() {
      return this.value.productDescription && this.value.productDescription.trim() !== '';
    }
  },
  methods: {
    // 方法
    updateField(field, value) {
      this.$emit('input', {
        ...this.value,
        [field]: value
      });
    }
  },
  template: `
    <div class="product-card-widget-editor">
      <div class="preview-section mb-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">预览效果</h4>
        <div class="bg-gray-50 p-4 rounded-lg border">
          <div class="max-w-xs mx-auto">
            <div class="bg-white rounded-xl overflow-hidden shadow-lg">
              <div class="relative overflow-hidden h-32">
                <div v-if="hasImage" class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <i class="fa-solid fa-image text-gray-400 text-2xl"></i>
                </div>
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <i class="fa-solid fa-image text-gray-400 text-2xl"></i>
                </div>
                <div v-if="hasCategory" class="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {{ value.category }}
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">
                  {{ value.productTitle || '产品标题' }}
                </h3>
                <p v-if="hasDescription" class="text-gray-600 text-sm mb-3 line-clamp-2">
                  {{ value.productDescription }}
                </p>
                <a href="#" class="inline-flex items-center text-blue-600 text-sm font-medium">
                  查看详情
                  <i class="fa-solid fa-arrow-right ml-1 text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
