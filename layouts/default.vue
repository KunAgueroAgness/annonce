<script setup>
const { data } = await useFetch('/api/cities');
const cartItemsCount = ref(3)

const isLoading = ref(false);
const rightDrawerOpen = ref(true);
const drawer = ref(false);
const confirm = ref(false);
const router = useRouter();
const $q = useQuasar();




const selectedCity = useState('selectedCity', () => ({
  label: 'Ростов-на-Дону',
  value: 'rostovNaDonu',
}));

const cityOptions = computed(() => {
  if (!data.value?.cities) return [];
  return Object.entries(data.value.cities).map(([key, value]) => ({
    label: value,
    value: key,
  }));
});
const onCitySelected = (city) => {
  if (city) {
    selectedCity.value = city;
  }
};
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};


const logout = async () => {
  try {
    await $fetch('/api/logout', { method: 'POST' })
    navigateTo('/login')
  } catch (err) {
    console.error('Ошибка при выходе:', err)
  }
}
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header-bg q-py-sm d-flex align-center justify-between"
      :class="$device.isMobile ? '' : 'header-padding'">
      <q-toolbar v-if="!$device.isMobile" :bordered="false" :elevated="false" :inset="false" :dense="true"
        class="text-black d-flex align-center justify-between">
        <div class="d-flex align-center">
          <q-toolbar-title class="q-toolbar__title-header d-flex align-center">
            <NuxtLink to="/products">
              Annoncé
            </NuxtLink>
          </q-toolbar-title>
          <q-btn color="grey" :glossy="false" :rounded="true" :noCaps="true" :replace="true" text-color="black"
            unelevated icon="eva-grid-outline" label="Все категории" class="btn-all-category" />
        </div>
        <div class="d-flex align-center justify-between">
          <q-select class="header-select" :borderless="true" v-model="selectedCity" :options="cityOptions"
            @update:model-label="onCitySelected" :loading="isLoading" label="Выберите город">
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-select>
          <q-btn class="creat-advert-btn" textColor="green" label="Разместить объявление" :noCaps="true"
            @click="confirm = true" />
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Скоро вы сможете разместить свое объявление</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Хорошо" color="green" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-btn @click="drawer = !drawer" dense icon="menu" color="grey" textColor="black" class="drawer-btn">
            <q-avatar class="draw-avatar">
              <img :draggable="false" src="./../public/avatar.png" alt="">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
      <q-toolbar v-if="$device.isMobile" :bordered="false" :elevated="false" :inset="false" :dense="true"
        class="mobile-toolbar text-black d-flex align-center justify-between">
        <q-btn @click="drawer = !drawer" dense icon="menu" textColor="black" class="mobile-drawer-btn">
        </q-btn>
        <q-toolbar-title class="q-toolbar__title-header d-flex align-center">
          <NuxtLink to="/products">
            Annoncé
          </NuxtLink>
        </q-toolbar-title>
        <q-icon name="bi-bag" color="black" size="24px" class="cart-icon">
          <q-badge floating color="green" text-color="grey-0" label="3" class="header-cart-badge" />
        </q-icon>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" :width="200" :breakpoint="500" :overlay="true" bordered side="right" class="bg-grey">
      <q-scroll-area class="fit">
        <q-btn flat label="Выйти с аккаунта" color="green" @click="logout" />
      </q-scroll-area>
    </q-drawer>
    <slot />
    <q-footer v-if="!$device.isMobile" class="footer-style d-flex">
      <div>
        <NuxtLink class="line-heigh-24 footer-main-link text-black" to="/products">© Annonce 2023</NuxtLink>
      </div>
      <div>
        <NuxtLink class="line-heigh-24 footer-grey-link" to="/documents">Документы</NuxtLink>
      </div>
      <div>
        <NuxtLink class="line-heigh-24 footer-grey-link" to="/about-us">О компании</NuxtLink>
      </div>
    </q-footer>

    <q-footer v-if="$device.isMobile" class="footer-style-mobile d-flex flex-colum">
      <div>
        <NuxtLink class="line-heigh-24 footer-main-link text-black" to="/products">© Annonce 2023</NuxtLink>
      </div>
      <div>
        <NuxtLink class="line-heigh-24 footer-grey-link-mobile" to="/documents">Документы</NuxtLink>
      </div>
      <div>
        <NuxtLink class="line-heigh-24 footer-grey-link-mobile" to="/about-us">О компании</NuxtLink>
      </div>
      <div>
        <NuxtLink class="line-heigh-24 footer-grey-link-mobile" to="/sellers">Продавцам</NuxtLink>
      </div>
      <div>
        <NuxtLink class="line-heigh-24 footer-grey-link-mobile" to="/buyers">Покупателям</NuxtLink>
      </div>
      <q-btn class="mobile-creat-advert-btn" textColor="grey-3" label="Разместить объявление" :noCaps="true"
        @click="confirm = true" />
      <div class="language-choose d-flex align-center">
        <img class="language-choose-img" src="./../public/flag-rf.png" alt="Russia">
        Русский
      </div>
    </q-footer>
  </q-layout>
</template>
<style lang="scss">
.q-header {
  height: 64px;
  position: static;
}

.mobile-toolbar {
  //width: 100%;
  padding: 8px;
}

.q-toolbar__title-header {
  font-family: "Noto Serif";
  font-weight: 600;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 0;
  flex: none;
  padding: 10px 25px 10px 8px;
}


.btn-all-category {

  height: 48px;
  margin-left: 12px;
  border-radius: 40px;
}

.btn-all-category .q-btn__content {
  width: 167px;
}

.header-select {
  min-width: 152px;
  position: relative;
}

.header-select::after {
  content: '';
  position: absolute;
  height: 32px;
  border: 1px solid $grey-1;
  right: -26px;
  top: 11px;
}

.mobile-creat-advert-btn {
  margin: 0;

  .q-btn {
    padding: 0;
  }
}

.mobile-creat-advert-btn.q-btn {
  padding: 0;
}

.mobile-creat-advert-btn span {
  justify-content: flex-start;
}

.mobile-creat-advert-btn .row {
  flex: none;
}

.creat-advert-btn {
  margin-left: 52px;
}

.drawer-btn {
  margin-left: 26px;
  border-radius: 24px;
  height: 48px;
  padding: 4px 4px 4px 12px;
}

.draw-avatar {
  margin-left: 8px;
  border-radius: 80px;
  height: 40px;
  width: 40px;
}

.drawer-btn {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.footer-style {
  background-color: $grey-2;
  padding: 24px 32px 40px !important;
  height: 88px !important;
  width: 100%;
  position: static !important;
  bottom: 0;
}

.footer-style-mobile {
  background-color: $grey-2;
  padding: 24px 16px;
  position: static;
  bottom: 0;
}

.footer-grey-link {
  color: $grey-3;
  margin-right: 20px
}

.footer-grey-link-mobile {
  color: $grey-3;
  margin-bottom: 20px
}

.footer-main-link {
  margin-right: 20px
}

.header-cart-badge {
  font-weight: 600;
  font-size: 11px;
  border-radius: 50%;
  border: 1px solid $grey-0;
  opacity: 1;
  position: relative;
  top: -10px;
  left: -10px;
}

.language-choose {
  color: $grey-3;
}

.language-choose-img {
  margin-right: 6px;
  width: 16px;
  border-radius: 50%;
  height: 16px;
}
</style>