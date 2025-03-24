<script setup>

const { data: rewiewsData } = await useFetch('/api/reviews')
const { data: companyData } = await useFetch('/api/company');
const { data: productsData } = await useFetch('/api/products');

const currentCompany = ref(null);
const currentProducts = ref(null);
const currentRewiews = ref(null)

const companyLogoSrc = ref('./avatar.png')
const  companyName = ref('Наследие')
const companyVerified = ref(false)
const changeRatingNumber = ref(3.5)
const companyRating = ref('')
const companyReview = ref(4)
const tab = ref('products')

const changeRating = () => {
  if (changeRatingNumber.value >= 4) {
    companyRating.value = 'green'
  } else if (changeRatingNumber.value <= 4 && changeRatingNumber.value >= 3) {
    companyRating.value = 'yellow'
  } else {
    companyRating.value = 'red'
  }
}
const selectedCity = useState('selectedCity');
const updateCityData = (cityKey) => {
  if (cityKey === 'rostovNaDonu') {
    currentCompany.value = companyData.value.company.rostovNaDonu.naslediy;
    console.log('currentCompany.value', currentCompany.value)
    currentProducts.value = productsData.value.products.rostovNaDonu.naslediy;
    console.log('currentProducts.value', currentProducts.value)
    currentRewiews.value = rewiewsData.value.rostovNaDonu.naslediy;
    console.log('currentRewiews.value', currentRewiews.value)
  } else {
    currentCompany.value = null;
    currentProducts.value = null;
  }
};
watch(selectedCity, (newCity) => {
  if (newCity) {
    updateCityData(newCity.value);
  } else {
    console.log('Город не выбран');
    currentCompany.value = null;
    currentProducts.value = null;
  }
});
onMounted(() => {
  if (selectedCity.value) {
    updateCityData(selectedCity.value.value);
  }
});
const numberLoading = ref(false)
const phoneNumberBtnVal = ref('Показать номер телефона')
const numberCheckBtnColor = ref('green')
const numberCheckTextColor = ref('white')
const getPhoneNumber = () => {
  if(phoneNumberBtnVal.value != 'Показать номер телефона'){
    return
  }
  numberLoading.value = true;
  setTimeout(() => {
        numberLoading.value = false
      }, 3000)
      numberCheckBtnColor.value = 'grey'
      numberCheckTextColor.value = 'green'
      phoneNumberBtnVal.value = '+7(999)-888-77-66'

      return phoneNumberBtnVal
}
changeRating()
</script>
<template>
  <div class="d-flex align-center flex-colum">
    <div class="products--top d-flex align-center flex-colum justyfy-between">
      <div class="company-logo ">
        <img :src="companyLogoSrc" alt="Логотип организации">
      </div>
      <span class="company-name">{{ companyName }}</span>
      <div class="company-main-info d-flex align-center justyfy-center justyfy-between">
        <span class="company-verified   font16"><q-icon class="margin-r-xs" :color="companyVerified ? 'green' : 'red'"
            :name="companyVerified ? 'mdi-check-decagram' : 'mdi-alert-decagram'" />{{ companyVerified ? "Документы проверены" : "Документы не проверены" }}</span>
        <span class="self-center  font16"> • </span>
        <span class="company-rating  font16"><q-icon class="margin-r-xs" :color="companyRating" name="mdi-star" />{{
          changeRatingNumber }}</span>
        <span class="self-center  font16"> • </span>
        <span class="company-review  font16">{{ companyReview }} отзывов</span>
      </div>
      <q-btn class="check-number" :loading="numberLoading" @click="getPhoneNumber()"
        :color="numberCheckBtnColor" 
        :text-color="numberCheckTextColor"
        :label="phoneNumberBtnVal"/>
    </div>

        <q-tabs
          v-model="tab"
          class="products-tabs"
          align="justify"
          narrow-indicator
          active-class="active-product-tab"
        >
          <q-tab class="product-tab" name="products" :ripple="false" color="grey-2"  label="Товары и услуги" noCaps>
          </q-tab>
          <q-tab class="product-tab" name="agents" :ripple="false" color="grey-2" label="Агенты" noCaps>
          </q-tab>
          <q-tab class="product-tab" name="about" :ripple="false" color="grey-2"  label="О компании" noCaps>
          </q-tab>
        </q-tabs>
        <q-separator />
        <q-tab-panels class="product-q-tab-panels" v-model="tab" animated>
          <q-tab-panel name="products">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="agents">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="about">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
  </div>
</template>
<style lang="scss">
.products--top {
  height: 388px;
  width: 560px;
}

.company-logo {
  width: 120px;
  height: 120px;
  margin-bottom: 24px;

}

.company-logo img {
  width: 100%;
  height: 100%;
}

.company-name {
  font-weight: 600;
  line-height: 28px;
  font-size: 24px;
  margin-bottom: 12px;
}

.company-main-info {
  width: 360px;
  height: 20px;
  margin-bottom: 24px;
}

.check-number {
  border-color: $green;
  padding: 20px 32px !important;
  margin-bottom: 32px;
}
.product-tab{
  min-height: 40px !important;
}
.product-tab{
  border-radius: 12px;
  background-color: $grey;
  margin-right: 8px;
  .q-tab__indicator{
    display: none;
  }
}
.active-product-tab{
  border: 1px solid black;
}
.product-q-tab-panels{
    width: 100% ;
  }
</style>
