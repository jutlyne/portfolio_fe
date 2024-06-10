<template>
  <div class="scrollbar scrollbar-right">
    <div class="related-blogs">
      <h2 class="font-large">Có thể bạn sẽ thích</h2>
      <div class="related-item">
        <div class="group" v-for="item in items" :key="item">
          <RouterLink :to="'/blog/' + item.id">
            <div class="image">
              <img src="https://i.imgur.com/i4he2Or.jpeg" alt="" />
            </div>
            <h3 class="item-title line-clamp-2">
              {{ item.title }}
            </h3>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
