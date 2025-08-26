<script setup lang="ts">
import { computed, type ComputedRef, onMounted, reactive, ref, type Ref, toRefs, watch } from 'vue'
import type { Coffee } from '@/store/coffees/types'
import dayjs from 'dayjs'
import { processingOptions, roastLevelOptions } from '@/views/coffees/data.ts'
import useCountries from '@/composables/useCountries/index.ts'
import useCurrencies from '@/composables/useCurrencies.ts'
import { useSettingsStore } from '@/store/settings'
import useRoastersStore from '@/store/roasters/roasters.ts'
import type { RoasterRead } from '@/store/roasters/types'
import useValidation from '@/composables/useValidation.ts'
import type { VForm } from 'vuetify/components'
import { useI18n } from 'vue-i18n'
import useUnsavedChanges from '@/composables/useUnsavedChanges.ts'

const countries = useCountries()
const currencies = useCurrencies()
const { hasChanges } = toRefs(useUnsavedChanges())
const settingsStore = useSettingsStore()
const roastersStore = useRoastersStore()
const { required, numberRange, composeRules } = useValidation()
const { t } = useI18n()

const roasters: Ref<RoasterRead[]> = ref([])
const initialForm = ref({})
const form: Coffee = reactive({
  name: '',
  roaster_id: null,
  roast_level: null,
  cupping_score: null,
  country: null,
  processing: null,
  price: null,
  notes: '',
  roast_date: null,
})

const formRef: Ref<InstanceType<typeof VForm> | null> = ref(null)
const isDatepickerOpened: Ref<boolean> = ref(false)

const formattedDate: ComputedRef<string> = computed(() =>
  form.roast_date ? dayjs(form.roast_date).format('DD.MM.YYYY') : '',
)

const onSelectRoastDate = () => {
  isDatepickerOpened.value = false
}

const getRoasters = async () => {
  roasters.value = await roastersStore.getRoasters()
}

const generateLabelI18N = (key: string): string => t(`coffee_form.${key}.label`)

const generatePlaceholderI18N = (key: string): string => t(`coffee_form.${key}.placeholder`)

const generateErrorI18N = (key: string, error: string): string =>
  t(`coffee_form.${key}.errors.${error}`)

const coffeeNameRules = composeRules(required(generateErrorI18N('name', 'required')))
const cuppingScoreRules = composeRules(
  required(generateErrorI18N('cupping_score', 'required')),
  numberRange(60, 100, generateErrorI18N('cupping_score', 'range')),
)

const resetInitialForm = () => {
  Object.assign(initialForm.value, form)
}

onMounted(async () => {
  await getRoasters()
})

watch(
  () => form,
  () => {
    hasChanges.value = JSON.stringify(initialForm.value) !== JSON.stringify(form)
  },
  {
    deep: true,
  },
)

defineExpose({
  form,
  validate: () => formRef.value?.validate(),
  resetInitialForm,
})
</script>

<template>
  <v-card class="pa-4">
    <v-form ref="formRef" validate-on="submit">
      <v-text-field
        v-model="form.name"
        :label="generateLabelI18N('name')"
        :placeholder="generatePlaceholderI18N('name')"
        :rules="coffeeNameRules"
        @update:modelValue="formRef?.resetValidation()"
      />

      <v-autocomplete
        v-model="form.roaster_id"
        :label="generateLabelI18N('select_roaster')"
        :items="roasters"
        item-value="id"
      />

      <v-text-field
        v-model.number="form.cupping_score"
        :label="generateLabelI18N('cupping_score')"
        :placeholder="generatePlaceholderI18N('cupping_score')"
        type="number"
        clearable
        :rules="cuppingScoreRules"
        @update:modelValue="formRef?.resetValidation()"
      />

      <v-select
        v-model="form.roast_level"
        :items="roastLevelOptions"
        :label="generateLabelI18N('select_roast_level')"
        clearable
      />

      <v-autocomplete
        v-model="form.country"
        :label="generateLabelI18N('select_country_of_origin')"
        item-title="name"
        item-value="code"
        :items="countries.countries"
      >
        <template v-slot:item="{ props }">
          <v-list-item v-bind="props" :title="countries.getFlagAndName(props.value as string)" />
        </template>
        <template v-slot:selection="{ item }">{{ item.raw.flag }} {{ item.title }} </template>
      </v-autocomplete>

      <v-select
        v-model="form.processing"
        :items="processingOptions"
        :label="generateLabelI18N('select_processing')"
        clearable
      />

      <v-menu
        v-model="isDatepickerOpened"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290"
      >
        <template #activator="{ props }">
          <v-text-field
            v-bind="props"
            v-model="formattedDate"
            :label="generateLabelI18N('select_roast_date')"
            :placeholder="generatePlaceholderI18N('select_roast_date')"
            readonly
            variant="outlined"
            append-inner-icon="mdi-calendar-month-outline"
          />
        </template>

        <v-date-picker
          v-model="form.roast_date"
          no-title
          first-day-of-week="1"
          hide-header
          weekday-format="short"
          @update:model-value="onSelectRoastDate"
        />
      </v-menu>

      <v-text-field
        v-model="form.price"
        type="number"
        :label="generateLabelI18N('price')"
        :placeholder="generatePlaceholderI18N('price')"
        clearable
      >
        <template #append-inner>
          <div style="width: 24px" class="text-center">
            {{ currencies.getCurrencySymbol(settingsStore.currency) }}
          </div>
        </template>
      </v-text-field>

      <v-textarea
        v-model="form.notes"
        :label="generateLabelI18N('notes')"
        :placeholder="generatePlaceholderI18N('notes')"
        rows="4"
      />
    </v-form>
  </v-card>
</template>
