<script setup lang="ts">
const router = useRouter();
const route = useRoute("laptops-booking");
</script>

<template>
  <div class="flex flex-col min-h-screen min-w-full">
    <header class="navbar bg-base-100 sticky top-0 p-4 z-10 shadow-xl">
      <div class="navbar-start join">
        <button
          class="text-xl font-bold"
          @click="router.push({ name: 'index' })"
        >
          JCS IT
        </button>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end"></div>
    </header>
    <main class="flex-grow">
      <div class="flex flex-col justify-between h-full">
        <div id="content" class="flex-grow">
          <div class="flex justify-center flex-grow p-0 sm:p-3">
            <div id="overlay" class="absolute z-[5]"></div>
            <Suspense>
              <NuxtLayout>
                <NuxtPage />
              </NuxtLayout>
              <template #fallback>
                <div
                  class="grid justify-center items-center h-full overflow-hidden"
                >
                  <span class="loading loading-lg loading-infinity" />
                </div>
              </template>
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
