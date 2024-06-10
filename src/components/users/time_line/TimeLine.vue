<template>
  <a-timeline class="timeline-container" mode="alternate">
    <template v-for="d in data" :key="d">
      <a-timeline-item class="timeline-item font-medium">
        <template #dot>
          <img class="dot" src="/dot.gif" alt="" />
        </template>
        <RouterLink :to="'/blog/' + d.id" class="item">
          <span class="item-title font-large">{{ d.title }}</span>
          <span class="item-sort-text font-medium line-clamp-2">
            {{ d.body }}
          </span>
          <span class="read-more">
            Đọc thêm
            <RightOutlined class="arrow-right font-small" />
          </span>
        </RouterLink>
      </a-timeline-item>
    </template>
  </a-timeline>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
