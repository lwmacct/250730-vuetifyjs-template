<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

// 当前选中的样式配置
const currentStyle = ref({
  color: 'primary',
  elevation: 4,
  height: undefined,
  navIconColor: 'white',
})

// 预设的样式主题
const styleThemes = [
  {
    name: '默认主题',
    color: 'primary',
    elevation: 4,
    height: undefined,
    navIconColor: 'white',
  },
  {
    name: '深色主题',
    color: 'grey-darken-4',
    elevation: 2,
    height: 50,
    navIconColor: 'white',
  },
  {
    name: '成功主题',
    color: 'success',
    elevation: 8,
    height: 70,
    navIconColor: 'white',
  },
  {
    name: '警告主题',
    color: 'warning',
    elevation: 6,
    height: 65,
    navIconColor: 'white',
  },
  {
    name: '错误主题',
    color: 'error',
    elevation: 12,
    height: 80,
    navIconColor: 'white',
  },
  {
    name: '信息主题',
    color: 'info',
    elevation: 4,
    height: 60,
    navIconColor: 'white',
  },
  {
    name: '紫色主题',
    color: 'purple',
    elevation: 10,
    height: 75,
    navIconColor: 'white',
  },
  {
    name: '蓝色主题',
    color: 'blue',
    elevation: 6,
    height: 65,
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
  />

  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">AppHeader 样式控制演示</h1>
          <p class="text-body-1 mb-6">
            AppHeader 组件提供了丰富的颜色和样式控制选项，可以完全自定义外观。
            <strong>点击下方的主题卡片来实时切换样式！</strong>
          </p>
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
                    @click="switchTheme(theme)"
                  >
                    <v-card-text class="text-center pa-4">
                      <div
                        class="theme-preview mb-3"
                        :style="{
                          backgroundColor: `var(--v-${theme.color}-base)`,
                          height: `${theme.height || 50}px`,
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
          <v-card>
            <v-card-title>可控制的样式属性</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-palette</v-icon>
                  </template>
                  <v-list-item-title>color</v-list-item-title>
                  <v-list-item-subtitle
                    >应用栏背景颜色（支持 Vuetify 所有颜色）</v-list-item-subtitle
                  >
                </v-list-item>

                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="secondary">mdi-elevation</v-icon>
                  </template>
                  <v-list-item-title>elevation</v-list-item-title>
                  <v-list-item-subtitle>阴影深度（0-24）</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-arrow-expand-vertical</v-icon>
                  </template>
                  <v-list-item-title>height</v-list-item-title>
                  <v-list-item-subtitle>应用栏高度（数字或字符串）</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="warning">mdi-format-color-fill</v-icon>
                  </template>
                  <v-list-item-title>navIconColor</v-list-item-title>
                  <v-list-item-subtitle>导航图标颜色</v-list-item-subtitle>
                </v-list-item>
              </v-list>
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

      <!-- 添加更多内容来测试滚动条 -->
      <v-row class="mt-6">
        <v-col cols="12">
          <h2 class="text-h4 mb-4">测试滚动条效果</h2>
          <p class="text-body-1 mb-4">
            这个页面使用 sticky footer 模式，当内容超出视口高度时，页脚会跟随在内容底部。
            当内容不足时，页脚会固定在视口底部。
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Sticky Footer 测试</v-card-title>
            <v-card-text>
              <p class="mb-4">
                当前页面使用 <code>:fixed="true"</code> 模式，实现了真正的 sticky footer 效果。
              </p>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-check-circle</v-icon>
                  </template>
                  <v-list-item-title>内容不足时</v-list-item-title>
                  <v-list-item-subtitle>页脚固定在视口底部</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-check-circle</v-icon>
                  </template>
                  <v-list-item-title>内容超出时</v-list-item-title>
                  <v-list-item-subtitle>页脚跟随在内容底部</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-check-circle</v-icon>
                  </template>
                  <v-list-item-title>响应式布局</v-list-item-title>
                  <v-list-item-subtitle>自动适应不同屏幕高度</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>技术实现</v-card-title>
            <v-card-text>
              <pre class="bg-grey-lighten-4 pa-4 rounded text-caption"><code>/* Sticky Footer CSS */
.footer-sticky {
  margin-top: auto;
  min-height: 64px;
  flex-shrink: 0;
}

:deep(.v-application) {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

:deep(.v-main) {
  flex: 1 0 auto;
}</code></pre>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 添加更多测试内容 -->
      <v-row class="mt-6">
        <v-col cols="12">
          <v-card>
            <v-card-title>额外测试内容</v-card-title>
            <v-card-text>
              <p class="mb-4">
                这些内容用于测试当页面内容超出视口高度时，sticky footer 的行为。
                你可以调整浏览器窗口大小来观察效果。
              </p>
              <v-row>
                <v-col cols="12" md="4" v-for="i in 3" :key="i">
                  <v-card variant="outlined" class="mb-4">
                    <v-card-title class="text-h6">测试卡片 {{ i }}</v-card-title>
                    <v-card-text>
                      <p>这是第 {{ i }} 个测试卡片，用于增加页面内容高度。</p>
                      <v-progress-linear
                        :model-value="i * 30"
                        color="primary"
                        class="mt-2"
                      ></v-progress-linear>
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
          <v-card>
            <v-card-title>滚动测试区域</v-card-title>
            <v-card-text>
              <p class="mb-4">
                向下滚动查看 sticky footer 的效果。当内容超出视口时，页脚会跟随在内容底部。
              </p>
              <div v-for="i in 5" :key="i" class="mb-4">
                <v-divider class="mb-2"></v-divider>
                <p class="text-body-2">
                  <strong>测试段落 {{ i }}</strong> - 这是用于测试滚动效果的额外内容。
                  当页面内容足够多时，你可以观察到 sticky footer 的行为变化。
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <!-- 页脚使用 sticky footer 模式进行测试 -->
  <AppFooter />
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
