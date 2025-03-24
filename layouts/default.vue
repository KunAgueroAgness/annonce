<script setup>
const { data } = await useFetch('/api/cities');
const isLoading = ref(false);
const rightDrawerOpen = ref(true);
const drawer = ref(false);
const confirm = ref(false);

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
    console.log('Выбран город:', city.label);
    console.log('Ключ города:', city.value);
  }
};
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header-bg q-py-sm header-padding d-flex align-center justyfy-between">
      <q-toolbar :bordered="false" :elevated="false" :inset="false" :dense="true"
        class="text-black d-flex align-center justyfy-between">
        <div class="q-toolbar-left d-flex align-center justyfy-between">
          <q-toolbar-title class="q-toolbar__title-header d-flex align-center">
            Annoncé
          </q-toolbar-title>
          <q-btn color="grey" :glossy="false" :rounded="true" :noCaps="true" :replace="true" text-color="black"
            unelevated icon="eva-grid-outline" label="Все категории" class="btn-all-category" />
        </div>
        <div class="q-toolbar-right d-flex align-center justyfy-between">
          <q-select class="header-select" :borderless="true" v-model="selectedCity" :options="cityOptions"
            @update:model-label="onCitySelected" :loading="isLoading" label="Выберите город">
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-select>
          <q-btn class="creat-advert-btn" textColor="green" label="Разместить объявление" :noCaps="true" @click="confirm = true" />
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Скоро вы сможете расместить свое объявление</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Хорошо" color="green" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-btn @click="drawer = !drawer" dense icon="menu" color="grey" textColor="black" class="drawer-btn">
            <q-avatar
            class="draw-avatar"
            >
            <img src="./../public/avatar.png" alt="">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" :width="200" :breakpoint="500" :overlay="true" bordered side="right" class="bg-grey">
      <q-scroll-area class="fit">
        <q-btn flat label="Выйти с аккаунта" color="green" @click="drawer = false" />
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="footer-style text-black">
      <q-toolbar>
        <q-toolbar-title>
          <div>© Annonce 2023</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<style lang="scss">
.q-header {
  height: 64px;
}
.q-toolbar__title-header {
  font-family: "Noto Serif";
  font-weight: 600;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 0%;
  flex: none;
  padding: 10px 25px 10px 8px;
}

.btn-all-category {
  width: 167px;
  height: 48px;
  margin-left: 12px;
  border-radius: 40px;
  // padding:16px 12px ;
}

.header-select {
  min-width: 152px;
  // height: 32px;
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
.creat-advert-btn{
  margin-left: 52px;
}
.drawer-btn {
  margin-left: 26px;
  border-radius: 24px;
  height: 48px;
  padding: 4px 4px 4px 12px;
}
.draw-avatar{
  margin-left: 8px;
  border-radius: 80px;
  height: 40px;
  width: 40px;
}
.footer-style{
  height: 88px;
  background-color: $grey-2;
  padding: 24px 32px 40px;
}
.footer-style .q-toolbar__title{
  font-size: 15px;
  line-height: 24px;
  font-weight: 500;
}

</style>