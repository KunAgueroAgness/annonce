<template>
  <q-page class="row items-center justify-center bg-grey-1">
    <q-card class="login-card q-pa-lg login-card-style">
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold text-primary q-mb-xs">Добро пожаловать</div>
        <div class="text-subtitle2 text-grey-7">Войдите в свой аккаунт</div>
      </q-card-section>

      <q-form @submit.prevent="handleSubmit" class="q-gutter-y-md">
        <q-card-section class="q-px-none">
          <q-input v-model="form.login" label="Логин" outlined dense :rules="[val => !!val || 'Обязательное поле']"
            lazy-rules>
            <template v-slot:prepend>
              <q-icon name="person" color="grey-6" />
            </template>
          </q-input>

          <q-input v-model="form.password" label="Пароль" outlined dense :type="isPwd ? 'password' : 'text'"
            :rules="[val => !!val || 'Обязательное поле']" lazy-rules class="q-mt-sm">
            <template v-slot:prepend>
              <q-icon name="lock" color="grey-6" />
            </template>
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer text-grey-6"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <div class="row justify-between items-center q-mt-md">
            <q-checkbox v-model="rememberMe" label="Запомнить меня" color="primary" size="sm" />
            <q-btn flat label="Забыли пароль?" color="primary" size="sm" @click="showPasswordResetDialog = true" />
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn label="Войти" type="submit" color="primary" class="full-width" :loading="loading" unelevated />
        </q-card-actions>
      </q-form>

      <q-dialog v-model="showPasswordResetDialog" persistent>
        <q-card class="login-card-style">
          <q-card-section class="row items-center">
            <div class="text-h6">Восстановление пароля</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input v-model="resetEmail" label="Ваш email" outlined dense class="q-mb-sm" />
            <div class="text-caption text-grey-7">
              Мы отправим ссылку для сброса пароля
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Отмена" color="grey" v-close-popup />
            <q-btn label="Отправить" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-banner v-if="error" dense class="text-white bg-negative q-mt-md" rounded>
        <template v-slot:avatar>
          <q-icon name="error" color="white" />
        </template>
        {{ error }}
        <template v-slot:action>
          <q-btn flat color="white" icon="close" size="sm" @click="error = ''" />
        </template>
      </q-banner>
    </q-card>
  </q-page>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

const form = ref({
  login: '',
  password: ''
})

const error = ref('')
const loading = ref(false)
const isPwd = ref(true)
const rememberMe = ref(false)
const showPasswordResetDialog = ref(false)
const resetEmail = ref('')

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    const { success } = await $fetch('/api/login', {
      method: 'POST',
      body: {
        ...form.value,
        remember: rememberMe.value
      }
    })

    if (success) {
      navigateTo('/products')
    }
  } catch (err) {
    error.value = err.data?.statusMessage || 'Ошибка авторизации'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
.login-card-style{
  max-width: 400px;
}
.q-page {
  background: #f8f9fa;
}
</style>