<script setup lang="ts">
interface Props {
  showLinks?: boolean
  customText?: string
}

const props = withDefaults(defineProps<Props>(), {
  showLinks: true,
  customText: '© 2024 Vue + Vuetify 演示应用',
})
</script>

<template>
  <v-footer app color="grey-darken-3" class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <p class="text-body-2 text-grey-lighten-1">
            {{ customText }}
            <template v-if="showLinks">
              |
              <v-btn
                href="https://vuejs.org/"
                target="_blank"
                variant="text"
                size="small"
                color="grey-lighten-1"
              >
                Vue.js
              </v-btn>
              |
              <v-btn
                href="https://vuetifyjs.com/"
                target="_blank"
                variant="text"
                size="small"
                color="grey-lighten-1"
              >
                Vuetify
              </v-btn>
            </template>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
