<template>
  <div class="scrollbar scrollbar-left">
    <div class="customscroll">
      <a-anchor
        :target-offset="targetOffset"
        :offsetTop="targetOffset"
        wrapperClass="anchor-container"
        :affix="false"
        :items="items"
      ></a-anchor>
      <div class="transparent"></div>
    </div>
    <div class="loadmore">
      <button>
        <span> Read more </span>
        <DoubleRightOutlined class="rotare" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
