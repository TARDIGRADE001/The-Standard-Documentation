<script setup lang="ts">
const { seo } = useAppConfig()

// Fetch both navigations in parallel
const [{ data: docsNavigation }, { data: standardNavigation }] = await Promise.all([
  useAsyncData('docs-navigation', () => queryCollectionNavigation('docs')),
  useAsyncData('standard-navigation', () => queryCollectionNavigation('standard'))
])

// Create a computed property that combines both navigation
const combinedNavigation = computed(() => {
  // Start with the docs navigation
  const result = [...(docsNavigation.value || [])]
  
  // Add standard navigation as a top-level item if it exists
  if (standardNavigation.value && standardNavigation.value.length > 0) {
    const standardChildren = standardNavigation.value[0]?.children
    if (standardChildren) {
      result.push(...standardChildren)
    }
  }
  
  return result
})

// Also combine the search data from both collections
const { data: files } = useLazyAsyncData('search', async () => {
  const [docsFiles, standardFiles] = await Promise.all([
    queryCollectionSearchSections('docs'),
    queryCollectionSearchSections('standard')
  ])
  return [...docsFiles, ...standardFiles]
}, {
  server: false
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
})

provide('navigation', combinedNavigation)

</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="combinedNavigation"
      />
    </ClientOnly>
  </UApp>
</template>
