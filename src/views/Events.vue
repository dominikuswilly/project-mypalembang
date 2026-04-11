<template>
  <div class="events-view animate-fade">
    <div class="header">
      <h1 class="gradient-text">Events</h1>
      <p class="subtitle">Discover what's happening in Palembang</p>
    </div>

    <div class="content">
      <div class="coming-soon-card glass">
        <div class="icon-wrapper">
          <div class="pulse-ring"></div>
          <CalendarIcon :size="48" class="calendar-icon" />
        </div>
        
        <h2 class="status-text">Coming Soon</h2>
        <p class="description">
          We're currently curating the most exciting cultural, culinary, and community events just for you.
        </p>
        
        <div class="notify-badge">
          <SparklesIcon :size="16" />
          <span>Something big is coming</span>
        </div>
      </div>

      <div class="features-preview">
        <div class="feature glass">
          <div class="feature-icon"><MusicIcon :size="20" /></div>
          <span>Cultural Festivals</span>
        </div>
        <div class="feature glass">
          <div class="feature-icon"><UtensilsIcon :size="20" /></div>
          <span>Food Bazaars</span>
        </div>
        <div class="feature glass">
          <div class="feature-icon"><TicketIcon :size="20" /></div>
          <span>Local Concerts</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Calendar as CalendarIcon, 
  Sparkles as SparklesIcon,
  Music as MusicIcon,
  Utensils as UtensilsIcon,
  Ticket as TicketIcon
} from 'lucide-vue-next';
</script>

<style scoped>
.events-view {
  padding: 24px 20px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.header h1 {
  font-size: 32px;
  margin-bottom: 4px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 14px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.coming-soon-card {
  width: 100%;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
}

.icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 24px;
  margin-bottom: 12px;
}

.calendar-icon {
  color: var(--primary);
  filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.4));
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary);
  border-radius: 24px;
  animation: pulse 2s infinite;
  opacity: 0;
}

@keyframes pulse {
  0% { transform: scale(0.9); opacity: 0.5; }
  100% { transform: scale(1.4); opacity: 0; }
}

.status-text {
  font-size: 28px;
  background: linear-gradient(135deg, var(--primary), #FFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.description {
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.6;
  max-width: 280px;
}

.notify-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(212, 175, 55, 0.15);
  padding: 8px 16px;
  border-radius: 100px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  margin-top: 8px;
}

.features-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  width: 100%;
}

.feature {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 16px;
}

.feature-icon {
  color: var(--primary);
  display: flex;
  opacity: 0.8;
}

@media (max-width: 380px) {
  .feature {
    flex: 1 1 40%;
    justify-content: center;
  }
}
</style>
