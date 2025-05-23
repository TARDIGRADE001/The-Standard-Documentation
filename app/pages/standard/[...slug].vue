<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '#ui-pro/utils/content'

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc, seo } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data: rawPage } = await useAsyncData(route.path, () => queryCollection('standard').path(route.path).first())
if (!rawPage.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Process page content to remove first H1 that matches the title
const page = computed(() => {
  if (!rawPage.value || !rawPage.value.body) return rawPage.value
  
  // Create a deep copy of the page
  const processedPage = JSON.parse(JSON.stringify(rawPage.value))
  
  // Check if the first child is an H1 heading
  if (processedPage.body?.value?.length > 0) {
    const firstChild = processedPage.body.value[0]
    
    // Check if it's a heading with depth 1 (H1)
    if (firstChild[0] === 'h1') {
      // Remove this heading from children array
      processedPage.body.value.shift() // Remove the first child
      // if the new first child is an p, shift it again
      if (processedPage.body.value[0].tag === 'p') {
        processedPage.body.value.shift()
      }
    }
  }

  console.log("processedPage", processedPage)
  // navigate all the body element, check all the title, and remove the first number of the title like "1.0- Introduction..."
  processedPage.body.value.forEach((element: [
    string,
    object,
    object
  ]) => {
    if (element[0] === 'h1' || element[0] === 'h2' || element[0] === 'h3') {
      
    }
  })
  
  return processedPage
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('standard', route.path, {
    fields: ['description']
  })
})

useSeoMeta({
  title: page.value.seo.title,
  ogTitle: `${page.value.seo.title} - ${seo?.siteName}`,
  description: page.value.seo.description,
  ogDescription: page.value.seo.description
})

const headline = computed(() => findPageHeadline(navigation?.value, page.value))

defineOgImageComponent('Docs', {
  title: page.value.title,
  description: page.value.description,
  headline: headline.value
})

const links = computed(() => {
  const links = []
  if (toc?.bottom?.edit) {
    links.push({
      icon: 'i-lucide-external-link',
      label: 'Edit this page',
      to: `${toc.bottom.edit}/${page?.value?.stem}.${page?.value?.extension}`,
      target: '_blank'
    })
  }

  return [...links, ...(toc?.bottom?.links || [])].filter(Boolean)
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :headline="headline"
    />

    <UPageBody>
      <ContentRenderer
        v-if="page"
        :value="page"
      />

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="page.body?.toc?.links"
      >
        <template
          v-if="toc?.bottom"
          #bottom
        >
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="page.body?.toc?.links?.length"
              type="dashed"
            />

            <UPageLinks
              :title="toc.bottom.title"
              :links="links"
            />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>