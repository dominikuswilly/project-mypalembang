<template>
  <div class="skeleton-card glass">
    <div class="shimmer"></div>
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-title"></div>
      <div class="skeleton-meta"></div>
      <div class="skeleton-desc"></div>
      <div class="skeleton-tags">
        <div class="skeleton-tag"></div>
        <div class="skeleton-tag"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  margin-bottom: 24px;
  overflow: hidden;
  position: relative;
  min-height: 280px;
}

.shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.skeleton-image {
  aspect-ratio: 16 / 9;
  background: rgba(255, 255, 255, 0.05);
}

.skeleton-content {
  padding: 16px;
}

.skeleton-title {
  height: 24px;
  width: 60%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  margin-bottom: 12px;
}

.skeleton-meta {
  height: 14px;
  width: 30%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  margin-bottom: 16px;
}

.skeleton-desc {
  height: 40px;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  margin-bottom: 16px;
}

.skeleton-tags {
  display: flex;
  gap: 8px;
}

.skeleton-tag {
  height: 20px;
  width: 60px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
}
</style>
