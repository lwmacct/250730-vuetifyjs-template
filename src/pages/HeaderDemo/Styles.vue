<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter.vue'

// 当前选中的样式配置
const currentStyle = ref({
  color: 'primary',
  elevation: 4,
  height: undefined,
  navIconColor: 'white',
})

// 是否使用插槽内容
const useSlotContent = ref(false)

// 预设的样式主题
const styleThemes = [
  {
    name: '深色主题',
    color: 'grey-darken-4',
    elevation: 2,
    height: 50,
    navIconColor: 'white',
  },
  {
    name: '默认主题',
    color: 'primary',
    elevation: 4,
    height: undefined,
    navIconColor: 'white',
  },

  {
    name: '成功主题',
    color: 'success',
    elevation: 8,
    height: 80,
    navIconColor: 'white',
  },
  {
    name: '警告主题',
    color: 'warning',
    elevation: 6,
    height: 80,
    navIconColor: 'white',
  },
]

// 自定义操作按钮
const customActions = [
  {
    icon: 'mdi-bell',
    text: '通知',
    color: 'warning',
    variant: 'text' as const,
    onClick: () => console.log('通知按钮点击'),
  },
  {
    icon: 'mdi-account',
    text: '用户',
    color: 'info',
    variant: 'text' as const,
    onClick: () => console.log('用户按钮点击'),
  },
]

// 切换样式主题
const switchTheme = (theme: any) => {
  currentStyle.value = { ...theme }
}
</script>

<template>
  <!-- 动态演示：不同颜色的 AppHeader -->
  <AppHeader
    title="样式控制演示"
    titleIcon="mdi-palette"
    :actions="customActions"
    :color="currentStyle.color"
    :elevation="currentStyle.elevation"
    :height="currentStyle.height"
    :navIconColor="currentStyle.navIconColor"
    :use-custom-content="useSlotContent"
  >
    <template #custom-content v-if="useSlotContent">
      <!-- 默认主题插槽 -->
      <template v-if="currentStyle.color === 'primary'">
        <div class="d-flex align-center">
          <v-btn icon="mdi-bell" variant="text" color="white" class="mr-2">
            <v-badge content="3" color="error" offset-x="8" offset-y="-8">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon="mdi-account" variant="text" color="white" class="mr-2">
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-chip color="white" variant="outlined" size="small">
            <v-icon start>mdi-check-circle</v-icon>
            在线
          </v-chip>
        </div>
      </template>

      <!-- 深色主题插槽 -->
      <template v-else-if="currentStyle.color === 'grey-darken-4'">
        <div class="d-flex align-center">
          <v-btn icon="mdi-moon" variant="text" color="white" class="mr-2">
            <v-icon>mdi-moon</v-icon>
          </v-btn>
          <v-btn icon="mdi-cog" variant="text" color="white" class="mr-2">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
          <v-chip color="grey-lighten-1" variant="outlined" size="small">
            <v-icon start>mdi-account-circle</v-icon>
            夜间模式
          </v-chip>
        </div>
      </template>

      <!-- 成功主题插槽 -->
      <template v-else-if="currentStyle.color === 'success'">
        <div class="d-flex align-center">
          <v-btn icon="mdi-check-circle" variant="text" color="white" class="mr-2">
            <v-icon>mdi-check-circle</v-icon>
          </v-btn>
          <v-btn icon="mdi-chart-line" variant="text" color="white" class="mr-2">
            <v-icon>mdi-chart-line</v-icon>
          </v-btn>
          <v-chip color="green-lighten-4" variant="outlined" size="small">
            <v-icon start>mdi-trending-up</v-icon>
            运行正常
          </v-chip>
        </div>
      </template>

      <!-- 警告主题插槽 -->
      <template v-else-if="currentStyle.color === 'warning'">
        <div class="d-flex align-center">
          <v-btn icon="mdi-alert" variant="text" color="white" class="mr-2">
            <v-icon>mdi-alert</v-icon>
          </v-btn>
          <v-btn icon="mdi-shield" variant="text" color="white" class="mr-2">
            <v-icon>mdi-shield</v-icon>
          </v-btn>
          <v-chip color="orange-lighten-4" variant="outlined" size="small">
            <v-icon start>mdi-exclamation</v-icon>
            注意安全
          </v-chip>
        </div>
      </template>
    </template>
  </AppHeader>

  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">AppHeader 样式控制演示</h1>
          <p class="text-body-1 mb-6">
            AppHeader 组件提供了丰富的颜色和样式控制选项，可以完全自定义外观。
            <strong>点击下方的主题卡片来实时切换样式！</strong>
          </p>

          <!-- 插槽控制按钮 -->
          <v-card class="mb-6">
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <h3 class="text-h6 mb-2">插槽内容控制</h3>
                  <p class="text-body-2 text-grey">
                    切换是否显示自定义插槽内容，每个主题都有对应的插槽模板
                  </p>
                </div>
                <v-switch
                  v-model="useSlotContent"
                  :label="useSlotContent ? '显示插槽内容' : '隐藏插槽内容'"
                  color="primary"
                  hide-details
                ></v-switch>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 交互式主题选择器 -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2">mdi-palette</v-icon>
              点击切换主题
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="theme in styleThemes"
                  :key="theme.name"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card
                    :class="{ 'border-primary': currentStyle.color === theme.color }"
                    class="theme-card cursor-pointer"
                    variant="outlined"
                    style="height: 200px"
                    @click="switchTheme(theme)"
                  >
                    <v-card-text class="text-center pa-4">
                      <div
                        class="theme-preview mb-3"
                        :style="{
                          backgroundColor: `var(--v-${theme.color}-base)`,
                          height: '60px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }"
                      >
                        {{ theme.name }}
                      </div>
                      <div class="text-subtitle-2 font-weight-bold">{{ theme.name }}</div>
                      <div class="text-caption text-grey">
                        color: {{ theme.color }}<br />
                        elevation: {{ theme.elevation }}<br />
                        height: {{ theme.height || '默认' }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-6">
        <v-col cols="12">
          <h2 class="text-h4 mb-4">当前配置</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>实时代码示例</v-card-title>
            <v-card-text>
              <pre class="bg-grey-lighten-4 pa-4 rounded"><code>&lt;AppHeader 
  title="样式控制演示"
  titleIcon="mdi-palette"
  :actions="customActions"
     color="{{ currentStyle.color }}"
   :elevation="{{ currentStyle.elevation }}"
   :height="{{ currentStyle.height || 'undefined' }}"
   navIconColor="{{ currentStyle.navIconColor }}"
/&gt;</code></pre>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>当前样式值</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-title>颜色</v-list-item-title>
                  <template v-slot:append>
                    <v-chip :color="currentStyle.color" variant="outlined">
                      {{ currentStyle.color }}
                    </v-chip>
                  </template>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>阴影</v-list-item-title>
                  <template v-slot:append>
                    <v-chip color="grey" variant="outlined">
                      {{ currentStyle.elevation }}
                    </v-chip>
                  </template>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>高度</v-list-item-title>
                  <template v-slot:append>
                    <v-chip color="grey" variant="outlined">
                      {{ currentStyle.height || '默认' }}
                    </v-chip>
                  </template>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>图标颜色</v-list-item-title>
                  <template v-slot:append>
                    <v-chip color="grey" variant="outlined">
                      {{ currentStyle.navIconColor }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-alert type="info" variant="tonal" class="mt-4 mb-6">
        <template v-slot:prepend>
          <v-icon>mdi-information</v-icon>
        </template>
        当前页面：样式控制演示 (/header-demo/styles) - 点击上方主题卡片实时切换样式！
      </v-alert>
    </v-container>
  </v-main>

  <!-- 页脚使用 sticky footer 模式进行测试 -->
  <AppFooter :fixed="true" />
</template>

<style scoped>
.v-card {
  border-radius: 16px;
}

.theme-card {
  transition: all 0.3s ease;
  border-width: 2px;
}

.theme-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.theme-card.border-primary {
  border-color: var(--v-primary-base) !important;
  box-shadow: 0 0 0 2px rgba(var(--v-primary-base), 0.2);
}

.theme-preview {
  transition: all 0.3s ease;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
