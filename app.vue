<script setup lang="ts">
import { slugToTitle } from "./utils/parse";

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

const user = ref(null);

const auth = useFirebaseAuth();

auth?.onAuthStateChanged((user) => {
  user ? (user = user) : (user = null);
});

const config = useRuntimeConfig();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="navbar bg-base-100 sticky top-0 p-4 z-10 shadow-xl">
      <div class="justify-start gap-2 flex-wrap flex-grow w-full">
        <div class="text-sm p-0 breadcrumbs" v-if="!route.meta.noBreadCrumbs">
          <ul>
            <li>
              <button @click="router.push({ name: 'index' })">
                <Transition>
                  <IconCSS name="mdi:home" v-if="breadcrumbs.length != 0" />
                </Transition>
              </button>
            </li>
            <li v-for="(item, index) in breadcrumbs" :key="index">
              <a @click.prevent="navigateTo(item.url)">
                {{ slugToTitle(item.label) }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="justify-end flex-shrink">
        <JokeDialog />
      </div>
    </header>
    <main class="flex justify-center p-0 sm:p-3">
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
    <footer class="footer pl-2 fixed bottom-0 [&>* *]:outline">
      <span
        class="text-transparent hover:text-base-content hover:text-xl transition-all"
      >
        {{ config.public.__GIT_HASH__ }}
      </span>
    </footer>
  </div>
</template>
