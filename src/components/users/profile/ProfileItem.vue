<template>
  <div class="profile-container">
    <a-row>
      <a-col :span="16">
        <h2 class="profile-name">Mình là ai?</h2>
        <div class="profile-content">
          <p class="font-large">
            Xin chào, tôi là một lập trình viên với gần 3 năm kinh nghiệm. Tôi chuyên về
            <span>Lavarel</span> và <span>NodeJS</span> , đã tham gia và hoàn thành nhiều dự án lớn
            và nhỏ, tích lũy được nhiều kinh nghiệm thực tế quý báu.
          </p>
          <p class="font-large">
            Trong quá trình làm việc, tôi đã phát triển và quản lý các hệ thống backend, từ thiết kế
            cơ sở dữ liệu đến triển khai và bảo trì hệ thống. Tôi luôn cố gắng áp dụng những kiến
            thức đã học vào thực tế để nâng cao hiệu quả công việc.
          </p>
          <p class="font-large">
            Ngoài ra, tôi cũng có kiến thức cơ bản về VueJS, GitHub Actions, GitLab CI/CD, Code
            Build và AWS, giúp tôi có cái nhìn toàn diện hơn về phát triển phần mềm. Tôi luôn sẵn
            lòng học hỏi và cải thiện bản thân, hướng tới mục tiêu đóng góp hiệu quả cho các dự án
            trong tương lai.
          </p>
        </div>
      </a-col>

      <a-col :span="8" class="profile-image">
        <div class="img">
          <img v-lazy="'/profile.webp'" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="scss" src="./style.scss" />
