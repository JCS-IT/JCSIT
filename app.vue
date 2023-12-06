<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const breadcrumbs = computed(() => {
  const pathArray = route.fullPath.split("/").filter(Boolean);
  return pathArray.map((segment, index) => {
    return {
      label: segment,
      url: "/" + pathArray.slice(0, index + 1).join("/"),
    };
  });
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="navbar bg-base-100 sticky top-0 p-4 z-10 shadow-xl">
      <div class="gap-2 flex-wrap">
        <button
          class="text-xl font-bold"
          @click="router.push({ name: 'index' })"
        >
          JCS IT
        </button>
        <div class="text-sm p-0 breadcrumbs">
          <ul>
            <li />
            <li v-for="(item, index) in breadcrumbs" :key="index">
              <a @click.prevent="navigateTo(item.url)">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main class="p-0 sm:p-3">
      <Suspense>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <template #fallback>
          <div class="grid justify-center items-center h-full overflow-hidden">
            <span class="loading loading-lg loading-infinity" />
          </div>
        </template>
      </Suspense>
    </main>
  </div>
</template>
