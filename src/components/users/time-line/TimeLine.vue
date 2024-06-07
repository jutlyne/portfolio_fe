<template>
  <a-timeline class="timeline-container" mode="alternate">
    <template v-for="d in data" :key="d">
      <a-timeline-item class="timeline-item">
        <template #dot>
          <img class="dot" src="/dot.gif" alt="" />
        </template>
        <a href="#" class="item">
          <span class="item-title">{{ d.title }}</span>
          <span class="item-sort-text">
            {{ d.body }}
          </span>
          <span class="read-more">
            Đọc thêm
            <RightOutlined class="arrow-right" />
          </span>
        </a>
      </a-timeline-item>
    </template>
  </a-timeline>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
