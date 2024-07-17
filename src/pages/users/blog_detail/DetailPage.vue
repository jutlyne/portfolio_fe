<template>
  <a-row class="blog-detail-container">
    <a-col :md="24" :lg="6" class="w-100-sm anchor-md">
      <AnchorItem :items="anchor" />
    </a-col>
    <a-col :md="24" :lg="12">
      <div class="detail-content">
        <div class="action-group">
          <RouterLink to="/blogs" class="btn-back">
            <LeftOutlined class="arrow-left font-small" />
            <span>Quay về</span>
          </RouterLink>
        </div>

        <div class="blog-info">
          <BlogInfo v-if="blogInfo" :blogInfo="blogInfo" />
        </div>

        <div class="anchor-sm">
          <AnchorItem :items="anchor" />
        </div>

        <div class="rendered-article">
          <ProseItem :body="blogBody" />
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
