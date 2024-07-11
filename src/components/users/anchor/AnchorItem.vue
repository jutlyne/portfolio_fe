<template>
  <div class="scrollbar scrollbar-left">
    <div class="customscroll" :class="{ 'readmore-active': readmoreActive }">
      <a-anchor
        :target-offset="targetOffset"
        wrapperClass="anchor-container"
        :affix="false"
        :items="items"
      ></a-anchor>
      <div class="transparent"></div>
    </div>
    <div class="loadmore">
      <button @click="readmore">
        <span> Read {{ readmoreActive ? 'less' : 'more' }} </span>
        <DoubleRightOutlined class="rotare" :class="{ 'rotare-active': readmoreActive }" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
