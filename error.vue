<template>
  <div class="error-page column flex-center cosmic-bg">
    <div 
      v-for="i in asteroidCount" 
      :key="i" 
      class="asteroid" 
      :style="asteroidStyle(i)"
    ></div>

    <div class="planet-container q-mb-md">
      <q-icon name="mdi-earth" size="xl" text-color="c-yellow" color="warning" class="rotating-planet" />
    </div>

    <h1 class="neon-text text-h2 text-weight-bold q-mb-xs">
      404 — Упс страница не найдена, мы в космосе!?
    </h1>

    <p class="text-subtitle1 text-center q-mb-lg vibration-text">
      <q-icon name="mdi-alert-octagram" color="orange" class="q-mr-xs" />
      Cкорей возвращайтесь!
    </p>

    <q-btn
      to="/"
      label="Эвакуироваться на главную"
      text-color="white"
      color="green"
      size="lg"
      class="shield-btn q-px-xl q-mb-lg"
      no-caps
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const darkMode = ref($q.dark.isActive);
const asteroidCount = 25;

const asteroidStyle = (i) => {
  const size = Math.random() * 25 + 10;
  const delay = Math.random() * 8;
  const duration = Math.random() * 4 + 3;
  
  return {
    '--size': `${size}px`,
    '--left': `${Math.random() * 100}%`,
    '--delay': `${delay}s`,
    '--duration': `${duration}s`,
    '--color': `hsl(${Math.random() * 40 + 20}, 80%, 60%)`,
    '--rotation': `${Math.random() * 360}deg`,
    '--opacity': Math.random() * 0.8 + 0.2,
    '--blur': `${Math.random() * 3}px`,
    '--distance': `${Math.random() * 100 + 50}px`,
  };
};
</script>

<style lang="scss" scoped>
.error-page{height:100vh;}

.cosmic-bg {
  position: relative;
  overflow: hidden;
  background: rgb(2,0,36);
  background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
}

.planet-container {
  position: relative;
  z-index: 2;
}

.rotating-planet {
  animation: rotate 20s linear infinite;
  filter: drop-shadow(0 0 10px rgba(0, 150, 255, 0.5));
}

.crater {
  position: absolute;
  border-radius: 50%;
  background: rgba(0,0,0,0.3);
  box-shadow: inset 2px 2px 4px rgba(0,0,0,0.5);
  
  &-1 {
    top: 20%;
    left: 30%;
    width: 12px;
    height: 12px;
  }
  
  &-2 {
    top: 50%;
    left: 60%;
    width: 8px;
    height: 8px;
  }
  
  &-3 {
    top: 70%;
    left: 20%;
    width: 15px;
    height: 10px;
    border-radius: 40%;
  }
}

.asteroid {
  position: absolute;
  top: -100px;
  left: var(--left);
  width: var(--size);
  height: var(--size);
  background: var(--color);
  opacity: var(--opacity);
  border-radius: 50%;
  filter: blur(var(--blur));
  animation: 
    fall var(--duration) linear infinite var(--delay),
    rotate var(--duration) linear infinite var(--delay),
    glow 2s ease-in-out infinite alternate;
  z-index: 1;

  &:nth-child(3n + 1) {
    border-radius: 30% 70% 50% 50% / 50% 50% 70% 60%;
  }
  
  &:nth-child(5n + 2) {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  
  &:nth-child(7n + 3) {
    clip-path: polygon(
      50% 0%, 70% 20%, 100% 30%, 
      80% 50%, 100% 70%, 70% 80%, 
      50% 100%, 30% 80%, 0% 70%, 
      20% 50%, 0% 30%, 30% 20%
    );
  }
}

.neon-text {
  color: #fff;
  text-shadow: 
    0 0 5px #fff,
    0 0 10px var(--q-primary),
    0 0 20px var(--q-primary),
    0 0 40px var(--q-secondary);
  animation: neon-pulse 1.5s ease-in-out infinite alternate;
  z-index: 2;
  position: relative;
}

.vibration-text {
  animation: vibrate 0.5s linear infinite;
  z-index: 2;
  position: relative;
}

.shield-btn {
  transition: all 0.4s;
  z-index: 2;
  position: relative;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 0 15px 5px rgba(0, 200, 255, 0.5),
      inset 0 0 10px rgba(255, 255, 255, 0.8);
    
    &::after {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border: 2px solid rgba(0, 200, 255, 0.3);
      border-radius: inherit;
      animation: shield-pulse 1.5s infinite;
    }
  }
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

@keyframes fall {
  to { 
    transform: 
      translateY(calc(100vh + 100px)) 
      rotate(var(--rotation));
  }
}

@keyframes glow {
  from { opacity: var(--opacity); }
  to { opacity: calc(var(--opacity) * 0.7); }
}

@keyframes neon-pulse {
  from { text-shadow: 0 0 5px #fff; }
  to { 
    text-shadow: 
      0 0 10px #fff,
      0 0 20px var(--q-primary),
      0 0 30px var(--q-secondary);
  }
}

@keyframes vibrate {
  0%, 100% { transform: translateX(-1px); }
  25% { transform: translateY(-1px); }
  50% { transform: translateX(1px); }
  75% { transform: translateY(1px); }
}

@keyframes shield-pulse {
  0% { 
    opacity: 1;
    transform: scale(1);
  }
  100% { 
    opacity: 0;
    transform: scale(1.3);
  }
}
</style>
