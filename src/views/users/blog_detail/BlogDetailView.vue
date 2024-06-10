<template>
  <div class="blog-detail-container">
    <div class="detail-content">
      <div class="action-group">
        <RouterLink to="/blog">
          <LeftOutlined class="arrow-left font-small" />
          Quay về
        </RouterLink>
      </div>
    </div>
    <RightScrollbar :items="releatedBlogs" />
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
