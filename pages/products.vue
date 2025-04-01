
<script setup>
const selectedCity = useState('selectedCity');
const { data: companyData } = await useFetch('/api/company');
const { data: reviewsData } = await useFetch('/api/reviews');
const { data: productsData } = await useFetch('/api/products');
const { data: specialistsData } = await useFetch('/api/agents');


const getSpecialists = (cityKey) => {
  specialists.value = specialistsData.value[cityKey.value].agents
}

onMounted(() => {
  const cityKey = selectedCity.value || 'rostovNaDonu';
    updateCityData(cityKey);
    updateCompanyRating(cityKey);
    getCompanyProducts(cityKey)
    getSpecialists(cityKey)
})


watch(selectedCity, (newCity) => {
    updateCityData(newCity.value);
    updateCompanyRating(newCity.value);
    getCompanyProducts(newCity.value)
    getSpecialists(newCity.value)
});

const companyName = ref(null)
const companyVerified = ref(null)
const companyLogoSrc = ref(null)
const emptyCityValue = ref(false)
const companyAddress = ref(null)
const companyAddressUrl = ref(null)
const companyMap = ref(null)

const updateCityData = (cityKey) => {
    currentCompany.value = companyData.value?.[cityKey.value].naslediy;
    companyName.value  = currentCompany.value.name;
    companyVerified.value = currentCompany.value.verified
    companyLogoSrc.value = currentCompany.value.logo
    emptyCityValue.value = false
    companyAddress.value = currentCompany.value.adress
    companyAddressUrl.value = currentCompany.value.adressUrl
    companyMap.value = currentCompany.value.map
}

const changeRatingNumber = ref(null)
const companyReview = ref(null)

const updateCompanyRating = (cityKey) => {
  currentRewiews.value = reviewsData.value?.[cityKey.value].naslediy;
  changeRatingNumber.value = currentRewiews.value.rating;
  companyReview.value = currentRewiews.value.reviewsAmount
  changeRating();
}


const companyRatingColor = ref(null)

const changeRating = () => {
  if (changeRatingNumber.value >= 4) {
    companyRatingColor.value = 'green'
  } else if (changeRatingNumber.value <= 4 && changeRatingNumber.value >= 3) {
    companyRatingColor.value = 'orange'
  } else {
    companyRatingColor.value = 'red'
  }
}
changeRating()


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
      phoneNumberBtnVal.value = currentCompany.value.number
      return phoneNumberBtnVal
}

const currentCompany = ref(null);
const currentRewiews = ref(null);
const currentProducts = ref(null);
const specialists = ref(null);
const selectedCategories = ref([]);
const filteredProducts = ref([]);

const productsCarsArr = ref([])
const productsClothesArr = ref([])
const productsCarArr = ref([]);
const productsJeepArr = ref([]);
const productsHatArr = ref([]);
const productsOuterweartArr = ref([]);


onMounted(() => {
  const cityKey = selectedCity.value || 'rostovNaDonu';
  updateCityData(cityKey);
  updateCompanyRating(cityKey);
  getCompanyProducts(cityKey);
  getSpecialists(cityKey);
});


const getCompanyProducts = (cityKey) => {
  currentProducts.value = productsData.value.products[cityKey.value].naslediy;
  filteredProducts.value = [...currentProducts.value];
  updateProductsArrays();
  updateOptionsCounters();
};


const updateProductsArrays = () => {
  productsCarsArr.value = currentProducts.value.filter(p => 
    p.category === 'cars'
  );
  productsCarArr.value = currentProducts.value.filter(p => 
    p.category === 'cars' && p.subCategory === 'car'
  );
  productsJeepArr.value = currentProducts.value.filter(p => 
    p.category === 'cars' && p.subCategory === 'jeep'
  );
  productsClothesArr.value = currentProducts.value.filter(p => 
    p.category === 'clothes'
  );
  productsHatArr.value = currentProducts.value.filter(p => 
    p.category === 'clothes' && p.subCategory === 'hat'
  );
  productsOuterweartArr.value = currentProducts.value.filter(p => 
    p.category === 'clothes' && p.subCategory === 'outerwear'
  );
  
};


const selectOptions = computed(() => [
  {
    label: 'Все товары и услуги',
    value: 'all',
    header: true,
    list: currentProducts.value
  },
  {
    label: 'Автомобили',
    value: 'cars',
    header: true,
    list: productsCarsArr.value
  },
  {
    label: 'Легковые автомобили',
    value: 'car',
    description: `Доступно: ${productsCarArr.value.length}`,
    list: productsCarArr.value
  },
  {
    label: 'Внедорожники',
    value: 'jeep',
    description: `Доступно: ${productsJeepArr.value.length}`,
    list: productsJeepArr.value
  },
  {
    label: 'Одежда',
    value: 'clothes',
    header: true,
    list: productsClothesArr.value
  },
  {
    label: 'Головные уборы',
    value: 'hat',
    description: `Доступно: ${productsHatArr.value.length}`,
    list: productsHatArr.value
  },
  {
    label: 'Верхняя одежда',
    value: 'outerwear',
    description: `Доступно: ${productsOuterweartArr.value.length}`,
    list: productsOuterweartArr.value
  }
]);


const applyFilters = () => {
  filteredProducts.value = selectedCategories.value.list
};


const model = ref('Сегодня с 8:00 до 23:00')
const options = ref([])
options.value =  [
  'Вчера с 8:00 до 23:00', 'Сегодня с 8:00 до 23:00', 'Завтра с 8:00 до 23:00',
]


const updateOptionsCounters = () => {
  updateProductsArrays();
};


const tab = ref('products')
</script>
<template>
  <div class="alternative d-flex align-center flex-colum text-warning" v-if="emptyCityValue">
    <h2>По выбранному городу пока нет данных</h2>
    <h3>Выберите другой город</h3>
  </div>
  
  <div v-else class="d-flex align-center flex-colum">
    <div v-if="!$device.isMobile" class="products--top d-flex align-center flex-colum justify-between">
      <div class="company-logo ">
        <img :draggable="false" :src="companyLogoSrc" alt="'Логотип организации'">
      </div>
      <span class="card-title margin-bottom-12">{{ companyName }}</span>
      <div class="company-main-info d-flex align-center justyfy-center justify-between">
        <span class="font16">
          <q-icon class="q-mr-xs" :color="companyVerified ? 'green' : 'red'"
            :name="companyVerified ? 'mdi-check-decagram' : 'mdi-alert-decagram'" 
            />{{ companyVerified ? "Документы проверены" : "Документы не проверены" }}</span>
        <span class="font16"> • </span>
        <span class="font16"><q-icon class="q-mr-xs" :color="companyRatingColor" name="mdi-star" />{{
          changeRatingNumber }}</span>
        <span class="font16"> • </span>
        <span class="font16">{{ companyReview }} отзывов</span>
      </div>
      <q-btn class="check-number" :loading="numberLoading" @click="getPhoneNumber()"
        :color="numberCheckBtnColor" 
        :text-color="numberCheckTextColor"
        :label="phoneNumberBtnVal"/>
    </div>
        <q-tabs
          v-model="tab"
          :class="$device.isMobile ? 'products-tabs-mobile' : 'products-tabs'"
          align="justify"
          narrow-indicator
          active-class="active-product-tab"
        >
          <q-tab class="product-tab" name="products" :ripple="false" color="grey-2" :label="`Товары и услуги ${$device.isMobile ? currentProducts.length : ''}`" noCaps>
          </q-tab>
          <q-tab class="product-tab" name="agents" :ripple="false" color="grey-2" :label="`Агенты ${$device.isMobile ? specialists.length : ''}`" noCaps>
          </q-tab>
          <q-tab class="product-tab" name="about" :ripple="false" color="grey-2"  label="О компании" noCaps>
          </q-tab>
        </q-tabs>
        <q-separator color="black"/>
        <q-tab-panels class="product-q-tab-panels" v-model="tab" animated>

          <q-tab-panel   name="products">
            <div class="d-flex width-100 justify-center">
              <div class="filter-container">
                <q-select
                  borderless 
                  v-model="selectedCategories" 
                  :options="selectOptions"
                  label="Все товары и услуги"
                  bottomSlots
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section v-if="scope.opt.header">
                        <q-item-label class="text-weight-bold">{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section v-else>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                        <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                  <q-btn 
                  label="Показать" 
                  @click="applyFilters"
                  />
              </div>
            </div>
            <div :class="[$device.isMobile ? 'products-list-mobile' : 'products-list']">
              <div v-for="product in filteredProducts" :key="product.name">
                <q-card 
                  :bordered="false"
                  :flat="true"
                  class="q-pa-md-sm product-item"
                  :square="false"
                >
                  <div v-if="product.isAvailable" class="product-image-badges fixed-top-left absolute-top-left q-pl-sm q-pt-sm">
                    <q-badge
                      color="black"
                      reverse
                      :rounded="true"
                      text-color="grey-0"
                      class="q-py-xs q-px-sm q-mr-xs"
                    >
                      <q-icon
                        name="mdi-eye"
                        color="grey-0"
                        class="q-mr-sm"
                        size="sm"
                      />
                    {{ product.views }}
                    </q-badge>
                    <q-badge
                      color="black"
                      :rounded="true"
                      text-color="grey-0"
                      class="q-py-xs q-px-sm "
                    >
                      <q-icon
                        name="mdi-calendar-blank"
                        color="grey-0"
                        class="q-mr-sm"
                        size="sm"
                      />
                    {{ product.daysSincePublished }}
                    </q-badge>
                  </div>
                  <img  :draggable="false" class="product-image" :src="product.image" :alt="product.name">
                  <q-card-section>
                    <div class="product-price text-weight-medium">{{ product.price}} ₽</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="product-name text-weight-medium ">{{ product.name }}</div>
                  </q-card-section>
                  <q-card-section class="ad-control">
                    <div v-if="product.isAvailable && !product.isPromoted" class="product-not-promoted d-flex align-center justify-between">
                      <span class="promoted-text text-weight-regular">Увеличьте количество просмотров</span>
                      <q-btn
                        class="promoted-ad-btn" 
                        color="green" 
                        text-color="white"
                        label="Продвигать"
                        @click="promoteAdFunc(product)"
                      />
                    </div>
                    <div v-else-if="!product.isAvailable && product.isPromoted" class="product-promoted d-flex align-center justify-center">
                      <p class="text-weight-regular product-promoted-success">Объявление продвигается</p>
                    </div>
                    <div v-else-if="!product.isAvailable && !product.isPromoted" class="d-flex align-center justify-center">
                      <p class="text-weight-regular product-hided">Обьявление скрыто</p>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="agents" :class="$device.isMobile ? 'mobil-tab-panel' : ''">
            <div class="d-flex align-center flex-colum ">
              <div :class="$device.isMobile ? 'container-mobile' : 'container'">
                
                <q-card
                class="d-flex align-center padding-20 agents-card margin-bottom-12"
                :bordered="false"
                :flat="true"
                v-for="specialist in specialists"
                >

                <img :draggable="false" class="product-image agents-list-img" :src="specialist.image" alt="">
                <q-card-section
                class="specialist-info-block flex-colum"
                >
                  <p class="card-title q-mb-xs"> {{ specialist.name }}</p>
                  <div class="d-flex align-center margin-bottom-12">
                    <span class="d-flex align-center q-mr-xs line-heigh-20r">
                      <q-icon v-if="true" class="q-mr-xs line-heigh-20" color="green" name="mdi-check-decagram" />
                    {{ $device.isMobile ? 'Проверен' : 'Документы проверены'}}
                    </span>
                    <span class="d-flex align-center q-mr-xs line-heigh-20" v-if="specialist.rating"> •  <q-icon class="q-mr-xs" color="green" name="mdi-star" />{{ changeRatingNumber }}</span>
                    <span class="d-flex align-center line-heigh-20" >{{ false ? ` • ${specialist.reviewsAmount} отзывов` : "" }}</span>
                  </div>
                    <div class="specialist-text-block text-black">
                      <p class="specialist-text line-heigh-24 q-panel">
                        {{ specialist.description }}
                      </p>
                    </div>
                </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="about">
            <div class="d-flex align-center flex-colum">
              <div v-if="$device.isMobile" class="d-flex align-center flex-colum justify-between">
                <div class="company-logo-mobile">
                  <img :draggable="false" :src="companyLogoSrc" alt="Логотип организации">
                </div>
                <span class="card-title margin-bottom-12">{{ companyName }}</span>
                <div class=" d-flex align-center justify-center justify-between">
                  <span class="font16">
                    <q-icon class="q-mr-xs" :color="companyVerified ? 'green' : 'red'"
                      :name="companyVerified ? 'mdi-check-decagram' : 'mdi-alert-decagram'" 
                      />{{ companyVerified ? "Документы проверены" : "Документы не проверены" }}</span>
                  <span class="font16"> • </span>
                  <span class="font16"><q-icon class="q-mr-xs" :color="companyRatingColor" name="mdi-star" />{{
                    changeRatingNumber }}</span>
                  <span class="font16"> • </span>
                  <span class="font16">{{ companyReview }} отзывов</span>
                </div>
              </div>
              <div class="d-flex align-center flex-colum" :class="$device.isMobile ? '' : 'container'">
                <q-card
                :bordered="false"
                :flat="true"
                class="about-page-adress-block margin-top-32"
                >
                <div class="padding-20">
                  <span class="card-title q-mb-sm">О компании</span>
                  <div class="about-company-text text-weight-regular margin-bottom-12">
                    Копкой занимаемся 15 лет. Все началось с хобби и плавно переросло в любимую работу. Работаем с профессиональной техникой. 
                  </div>
                </div>
                  <q-select
                    disable
                    filled
                    v-model="model"
                    :options="options"
                    label="Режим работы"
                    class="about-company-select margin-bottom-12 padding-20"
                  />
                  <q-card-section
                      v-if="!$device.isMobile"
                  class="about-company-bottom d-flex align-center justify-between"
                  >
                  <div class="d-flex flex-colum padding-20 padding-r-20">
                    <span class="card-title q-mb-sm">Местоположение</span>
                    <div class="about-company-text text-green"> <NuxtLink :to="companyAddressUrl" class="">{{ companyAddress }}</NuxtLink></div>
                  </div>
                  <div class="map-bg d-flex align-center justify-center">
                    <q-icon name="place" color="green" class="map-place-icon"/>
                  </div>
                  </q-card-section>
                  <q-card-section
                      v-if="$device.isMobile"
                      class="about-company-bottom-mobile d-flex align-center flex-colum justify-center"
                  >
                    <div class="mobile-map-bg d-flex align-center justify-center">
                      <q-icon name="place" color="green" class="map-place-icon"/>
                    </div>
                    <div class="d-flex flex-colum padding-20 padding-r-20">
                      <span class="card-title q-mb-sm">Местоположение</span>
                      <div class="about-company-text text-green"> <NuxtLink :to="companyAddressUrl" class="">{{ companyAddress }}</NuxtLink></div>
                    </div>

                  </q-card-section>
                </q-card>
              </div>
            </div>
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
.company-logo-mobile{
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
}
.company-logo-mobile img{
  width: 120px;
  height: 120px;
}

.company-logo img {
  width: 100%;
  height: 100%;
}

.card-title{
  font-weight: 600;
  line-height: 28px;
  font-size: 24px;
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
.products-tabs-mobile{
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;

}
.products-tabs{
  margin-bottom: 32px;
}
.product-tab{
  min-height: 40px !important;
  font-size: 15px;
}
.product-tab .q-tab__label{
  font-size: 15px;
  line-height: 24px;
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
  border-top: 1px solid $grey-1;
}
.q-panel{
  padding: 0;
}
.products-list{
  padding: 0 32px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
}
.products-list-mobile{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.product-image{
  border-radius: 20px !important;
}
.ad-control{
  border-top: 1px solid $grey-3;
  padding-left: 4px;
  padding-right: 4px;
}
.product-price{
  align-items: flex-start;
  font-size: 17px;
  line-height: 20px;
  color: $black;
}
.product-promoted-success{
  color: $green;
  line-height: 20px;
}
.product-hided{
  color: $red;
  line-height: 20px;
  margin-top: 14px;
}
.promoted-text{
  font-size: 13px;
  line-height: 18px;
  color: $grey-3;
}
.agents-card{
  background-color: $grey-0;
  border-radius: 20px;
}

.agents-list-img{
  width: 140px !important;
  height: 140px;
  margin-right: 20px;
}
.margin-bottom-12{
  margin-bottom: 12px;
}
.specialist-info-block{
  padding: 0;
  width: 360px;
}
.specialist-text-block{
  width: 100%;
  height: 48px;
}
.specialist-text{
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
}
.about-company-text{
  font-size: 17px;
  line-height: 28px;
}
.about-company-select{
  width: 100%;

  .q-field__label{
  font-weight: 600 !important;
  line-height: 28px !important;
  font-size: 24px !important;
  margin-bottom: 8px !important;
  }
  .ellipsis{
    margin-top: 4px;
    font-weight: 400;
    font-size: 17px;
    line-height: 28px;
  }
  .q-field__control{
    padding: 20px !important;
    border-radius: 16px !important;
  }
}
.about-company-bottom{
  height: 132px;
  width: 100%;
}
.about-company-bottom.q-card__section--vert{
    padding: 0;
  }
.about-page-adress-block{
  width: 100%;
}
.about-company-companyMap{
  
  width: 200px;
  height: 100%;
}
.map-bg{
  background-image: url('/images/rostovNaDonu/naslediy/map.png');
  border-radius:0 20px 20px 0;
  width: 200px;
  height: 132px;
}
.mobile-map-bg{
  background-image: url('/images/rostovNaDonu/naslediy/map.png');
  border-radius:20px 20px 0 0;
  width: 100%;
  height: 96px;

}
.map-place-icon{
  font-size: 56px;
}
.filter-container{
  width: 470px;
  padding: 16px;
}
.mobil-tab-panel{
 padding: 24px 16px;
}
.container-mobile{
width: 100vw;
}

.filter-container .q-field__control{
  border-radius: 12px;
  background: $grey-5;
  padding-left: 16px;
}
.filter-container .q-field{
  border: 1px solid grey-2;
}

</style>
