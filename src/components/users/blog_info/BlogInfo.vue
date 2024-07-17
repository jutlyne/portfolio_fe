<template>
  <div>
    <h1 class="info-header">{{ blogInfo?.name }}</h1>
    <div class="info-author">
      <a title="Thông tin tác giả"
        ><img
          alt="Avatar Võ Cao Kỳ"
          loading="lazy"
          width="960"
          height="1280"
          decoding="async"
          data-nimg="1"
          src="/profile.webp"
        />
        <div class="author-name">
          <div>Võ Cao Kỳ</div>
          <div class="created-date">
            <time :datetime="blogInfo?.created_at"
              >{{ blogInfo?.created_at
              }}<!-- -->
              🎉 </time
            ><span>{{ blogInfo?.readtime }} phút đọc</span>
          </div>
        </div></a
      >
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
