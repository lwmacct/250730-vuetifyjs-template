<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CustomHeaderContent from '@/components/CustomHeaderContent.vue'
</script>

<template>
  <v-app>
    <!-- 使用自定义内容插槽 -->
    <AppHeader :use-custom-content="true" navIcon="mdi-menu" navIconColor="white" color="primary">
      <template #custom-content>
        <CustomHeaderContent />
      </template>
    </AppHeader>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">插槽方式自定义内容</h1>
            <p class="text-body-1 mb-6">
              使用插槽方式可以完全自定义导航栏右侧的内容，提供最大的自由度。
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>代码示例</v-card-title>
              <v-card-text>
                <pre class="bg-grey-lighten-4 pa-4 rounded"><code>&lt;AppHeader 
  :use-custom-content="true"
  navIcon="mdi-menu"
  navIconColor="white"
  color="primary"
&gt;
  &lt;template #custom-content&gt;
    &lt;CustomHeaderContent /&gt;
  &lt;/template&gt;
&lt;/AppHeader&gt;</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>特性说明</v-card-title>
              <v-card-text>
                <ul>
                  <li>完全自定义导航栏右侧内容</li>
                  <li>支持复杂的布局和交互</li>
                  <li>可以传递数据给子组件</li>
                  <li>适合复杂的应用场景</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mt-4 mb-6">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          当前页面：插槽方式演示 (/header-demo/slot)
        </v-alert>
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
