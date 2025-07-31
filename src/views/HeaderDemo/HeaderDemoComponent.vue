<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CustomHeaderContent from '@/components/CustomHeaderContent.vue'
</script>

<template>
  <v-app>
    <!-- 直接传入组件对象 -->
    <AppHeader
      :custom-content="CustomHeaderContent"
      navIcon="mdi-menu"
      navIconColor="white"
      color="success"
    />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">组件对象方式</h1>
            <p class="text-body-1 mb-6">
              直接传入组件对象是最简洁的使用方式，适合独立组件且无需额外数据传递的场景。
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>代码示例</v-card-title>
              <v-card-text>
                <pre class="bg-grey-lighten-4 pa-4 rounded"><code>&lt;AppHeader 
  :custom-content="CustomHeaderContent"
  navIcon="mdi-menu"
  navIconColor="white"
  color="success"
/&gt;</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>特性说明</v-card-title>
              <v-card-text>
                <ul>
                  <li>最简洁的使用方式</li>
                  <li>直接传入组件对象</li>
                  <li>无需额外的模板代码</li>
                  <li>适合独立组件场景</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mt-4">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          当前页面：组件对象方式演示 (/header-demo/component)
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
