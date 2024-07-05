<template>
  <div class="scrollbar scrollbar-right">
    <div class="related-blogs">
      <h2 class="font-large">Có thể bạn sẽ thích</h2>
      <a-row class="related-item">
        <a-col class="group" :lg="24" :sm="12" v-for="item in items" :key="item">
          <RouterLink :to="'/blogs/' + item.id">
            <div class="image">
              <img src="https://i.imgur.com/i4he2Or.jpeg" alt="" />
            </div>
            <h3 class="item-title line-clamp-2">
              {{ item.title }}
            </h3>
          </RouterLink>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
