<template>
  <a-row class="blog-detail-container">
    <a-col :md="24" :lg="18">
      <div class="detail-content">
        <div class="action-group">
          <RouterLink to="/blog">
            <LeftOutlined class="arrow-left font-small" />
            Quay về
          </RouterLink>
        </div>
      </div>
    </a-col>
    <a-col :md="24" :lg="6">
      <RightScrollbar :items="releatedBlogs" />
    </a-col>
  </a-row>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
