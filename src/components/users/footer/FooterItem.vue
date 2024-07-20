<template>
  <a-layout-footer class="font-large">
    <span>Copyright © 2024 JutLy</span>
    <span class="dmca">
      <a
        href="//www.dmca.com/Protection/Status.aspx?ID=3d2c2208-65dc-4510-b592-07a8f99e208b"
        title="DMCA.com Protection Status"
        class="dmca-badge"
      >
        <img
          v-lazy="
            'https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=3d2c2208-65dc-4510-b592-07a8f99e208b'
          "
          alt="DMCA.com Protection Status"
      /></a>
    </span>
  </a-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { LayoutFooter } from 'ant-design-vue'

export default defineComponent({
  components: {
    ALayoutFooter: LayoutFooter
  },
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js'
    script.async = true
    document.body.appendChild(script)
  }
})
</script>

<style lang="scss" src="./style.scss" />
