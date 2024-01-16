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

const user = useCurrentUser();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="navbar bg-base-100 sticky top-0 p-4 z-10 shadow-xl">
      <div class="navbar-start gap-2 flex-wrap">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <IconCSS name="mdi:menu" />
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm mt-3 dropdown-content z-[1] p-2 shadow-xl bg-base-200 rounded-box w-30"
          >
            <li>
              <a @click="navigateTo({ name: 'spaces' })">Spaces</a>
            </li>
            <li v-if="user">
              <a @click="navigateTo({ name: 'admin' })">Admin</a>
            </li>
          </ul>
        </div>
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
      <div class="navbar-end">
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
  </div>
</template>
