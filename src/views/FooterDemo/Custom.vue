<script setup lang="ts">
// 自定义页脚演示页面
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <!-- 使用通用头部组件 -->
  <AppHeader title="自定义页脚演示" titleIcon="mdi-foot-print" />

  <!-- 主要内容区域 -->
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="mx-auto">
            <v-card-title class="text-h4 text-center pa-6">
              <v-icon size="large" color="primary" class="mr-3">mdi-foot-print</v-icon>
              自定义页脚配置
            </v-card-title>

            <v-card-text>
              <v-alert type="info" variant="tonal" class="mb-6">
                <template v-slot:prepend>
                  <v-icon>mdi-information</v-icon>
                </template>
                这个页面演示了自定义页脚配置
              </v-alert>

              <v-card variant="outlined" class="mb-6">
                <v-card-title>自定义配置说明</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card variant="tonal" color="warning">
                        <v-card-title class="text-h6">
                          <v-icon color="warning" class="mr-2">mdi-cog</v-icon>
                          自定义文本
                        </v-card-title>
                        <v-card-text class="text-body-2">
                          <ul>
                            <li>自定义版权信息</li>
                            <li>自定义公司名称</li>
                            <li>自定义年份</li>
                            <li>支持动态内容</li>
                          </ul>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-card variant="tonal" color="info">
                        <v-card-title class="text-h6">
                          <v-icon color="info" class="mr-2">mdi-link</v-icon>
                          链接控制
                        </v-card-title>
                        <v-card-text class="text-body-2">
                          <ul>
                            <li>显示/隐藏链接</li>
                            <li>自定义链接文本</li>
                            <li>自定义链接地址</li>
                            <li>控制链接样式</li>
                          </ul>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card variant="outlined" class="mb-6">
                <v-card-title>代码示例</v-card-title>
                <v-card-text>
                  <pre
                    class="bg-grey-lighten-4 pa-4 rounded"
                  ><code>&lt;!-- 自定义文本，隐藏链接 --&gt;
&lt;AppFooter 
  custom-text="© 2024 我的公司名称"
  :show-links="false"
/&gt;

&lt;!-- 自定义文本，显示链接 --&gt;
&lt;AppFooter 
  custom-text="© 2024 我的应用"
  :show-links="true"
/&gt;

&lt;!-- 固定模式，自定义文本 --&gt;
&lt;AppFooter 
  :fixed="true"
  custom-text="© 2024 固定页脚"
  :show-links="false"
/&gt;</code></pre>
                </v-card-text>
              </v-card>

              <v-alert type="success" variant="tonal" class="mt-4">
                <template v-slot:prepend>
                  <v-icon>mdi-check-circle</v-icon>
                </template>
                当前页面：自定义页脚演示 (/footer-demo/custom)
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <!-- 使用自定义页脚组件 -->
  <AppFooter custom-text="© 2024 自定义页脚演示" :show-links="true" :fixed="false" />
</template>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>
