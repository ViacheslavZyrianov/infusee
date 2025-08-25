<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue'
import type { Brew } from '@/store/brews/types.ts'
import useCoffeesStore from '@/store/coffees/coffees.ts'
import { useRatings } from '@/composables/useRatings.ts'
import useBrewMethods from '@/composables/useBrewMethods.ts'
import type { CoffeeRead } from '@/store/coffees/types'
import useValidation from '@/composables/useValidation'
import type { VForm } from 'vuetify/components'
import { useI18n } from 'vue-i18n'

const { ratingKeys, ratingLabel, ratingHint, ratingModel } = useRatings()
const coffeesStore = useCoffeesStore()
const { getBrewMethodsForSelect } = useBrewMethods()
const { required, composeRules } = useValidation()
const { t } = useI18n()

const form: Brew = reactive({
  coffee_id: null,
  brew_method: null,
  rating_aroma: 0,
  rating_flavor: 0,
  rating_acidity: 0,
  rating_bitterness: 0,
  rating_sweetness: 0,
  rating_body: 0,
  rating_aftertaste: 0,
  grind: null,
  dose: null,
  channeling: null,
  output: null,
  notes: null,
})
const formRef: Ref<InstanceType<typeof VForm> | null> = ref(null)
const coffees: Ref<Pick<CoffeeRead, 'id' | 'name'>[]> = ref([])

const selectCoffeeRules = composeRules(required(t('brew_form.select_coffee.errors.required')))

const getCoffees = async () => {
  coffees.value = await coffeesStore.getCoffees('id, name')
}

onMounted(async () => {
  await getCoffees()
})

defineExpose({
  form,
  validate: () => formRef.value?.validate(),
})
</script>

<template>
  <v-card>
    <v-form ref="formRef" validate-on="submit">
      <v-autocomplete
        v-model="form.coffee_id"
        :label="t('brew_form.select_coffee.label')"
        item-title="name"
        item-value="id"
        :items="coffees"
        :rules="selectCoffeeRules"
        @update:modelValue="formRef?.resetValidation()"
      />
      <v-select
        v-model="form.brew_method"
        :label="t('brew_form.select_brew_method.label')"
        :items="getBrewMethodsForSelect()"
      >
        <template #subheader="{ props: { title, icon } }">
          <div class="d-flex align-center pa-4 opacity-50">
            <v-icon :icon="icon as string" size="18" class="mr-2" />
            <span class="text-body-2">{{ title }}</span>
          </div>
        </template>
      </v-select>

      <div class="mb-4">
        <v-label class="mb-2">{{ t('brew_form.ratings.label') }}</v-label>
        <div class="d-flex flex-column gr-2">
          <div v-for="ratingKey in ratingKeys" :key="ratingModel(ratingKey)">
            <div class="d-flex align-center w-100">
              <div class="text-body-2 mr-auto">{{ ratingLabel(ratingKey) }}</div>
              <v-rating
                v-model="form[ratingModel(ratingKey)]"
                :length="5"
                :size="24"
                clearable
                active-color="primary"
              />
            </div>
            <div class="text-caption opacity-50">
              {{ ratingHint(ratingKey) }}
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex gc-4">
        <v-text-field
          v-model="form.grind"
          :label="t('brew_form.grind.label')"
          :placeholder="t('brew_form.grind.placeholder')"
          type="number"
        />
        <v-text-field
          v-model="form.dose"
          :label="t('brew_form.dose.label')"
          :placeholder="t('brew_form.dose.placeholder')"
          :suffix="t('brew_form.dose.suffix')"
          type="number"
        />
      </div>
      <div class="d-flex gc-4">
        <v-text-field
          v-model="form.channeling"
          :label="t('brew_form.channeling.label')"
          :placeholder="t('brew_form.channeling.placeholder')"
          :suffix="t('brew_form.channeling.suffix')"
          type="number"
        />
        <v-text-field
          v-model="form.output"
          :label="t('brew_form.output.label')"
          :placeholder="t('brew_form.output.placeholder')"
          :suffix="t('brew_form.output.suffix')"
          type="number"
        />
      </div>
      <v-textarea
        v-model="form.notes"
        :label="t('brew_form.notes.label')"
        :placeholder="t('brew_form.notes.placeholder')"
      />
    </v-form>
  </v-card>
</template>

<style scoped></style>
