<script setup lang="ts">
import type { JokeRes, Laptop } from "@/types";

const tab = ref(0);

const generateRandomNumber = (max: number) => {
  const num = Math.floor(Math.random() * max) + 1;
  return num.toString().padStart(3, "0");
};

const laptops = ref<Laptop[]>(
  Array.from({ length: 1000 }, () => ({
    id: `L802${["WL", "ML"][Math.floor(Math.random() * 2)]}${(
      Math.floor(Math.random() * 6) + 18
    )
      .toString()
      .padStart(2, "0")}0${generateRandomNumber(200)}`,
    cart: Math.floor(Math.random() * 3) + 1,
    exists: true,
  })).sort((a, b) => a.cart - b.cart),
);

const search = ref("");

const filteredLaptops = computed(() => {
  // ID: <L|E><SCHOOL NUMBER><TYPE: WL|ML|MD|WD><YEAR yy><NUMBER 0000>

  return (
    laptops.value
      // Filter by cart
      .filter((laptop) =>
        search.value.toLowerCase().includes("cart:")
          ? laptop.cart ==
            parseInt(search.value.toLowerCase().split("cart:")[1])
          : laptop.cart,
      )
      // Filter by year
      .filter((laptop) =>
        search.value.includes("year:")
          ? laptop.id
              .split("L802")[1]
              .slice(2, 4)
              .match(search.value.split("year:")[1].slice(0, 2))
          : laptop.id,
      )
      // Everything else
      .filter((laptop) =>
        laptop.id.toLowerCase().includes(
          search.value
            .toLowerCase()
            .replace(/cart:\d+|year:\d+/g, "")
            .replace(" ", ""),
        ),
      )
  );
});

const { list, containerProps, wrapperProps } = useVirtualList(filteredLaptops, {
  // Keep `itemHeight` in sync with the item's row.
  itemHeight: 22,
});

const joke = useQuery<JokeRes>({
  queryKey: ["PgmJoke"],
  queryFn: () =>
    fetch("https://v2.jokeapi.dev/joke/Programming?type=single").then((res) =>
      res.json(),
    ),
  refetchInterval: () => 1000 * 60 * 60 * 24,
});
</script>

<template>
  <h1>RANDOM DATA. DEMO ONLY</h1>
  <div role="tablist" class="tabs tabs-lifted">
    <button
      role="tab"
      class="tab"
      :class="{ 'tab-active': tab == 0 }"
      @click="tab = 0"
    >
      Laptops
    </button>
    <button
      role="tab"
      class="tab"
      :class="{ 'tab-active': tab == 1 }"
      @click="tab = 1"
    >
      Missing
    </button>
  </div>

  <div v-if="tab == 0" class="max-sm:w-[80vw] w-[22rem]">
    <input
      class="input input-bordered mb-2 w-full"
      type="text"
      v-model="search"
      placeholder="Search"
    />
    <div class="w-full join join-vertical">
      <div
        class="grid px-1 border join-item dark:border-[#383f47]"
        style="grid-template-columns: 1fr 2fr 1fr"
      >
        <span>Cart</span>
        <span class="pl-5">ID</span>
        <span>Exists</span>
      </div>
      <div
        v-bind="containerProps"
        class="max-h-[65vh] min-h-[45vh] shadow-inner join-item border dark:border-[#383f47]"
      >
        <div v-bind="wrapperProps">
          <div
            v-for="item in list"
            :key="item.data.id"
            class="h-[22px] grid gap-2 even:bg-base-200 px-2 w-full"
            style="grid-template-columns: 1fr 4fr 1fr"
          >
            <span class="text-center">
              {{ item.data.cart }}
            </span>
            <span class="text-center">
              {{ item.data.id }}
            </span>
            <span class="text-center">
              <input
                class="checkbox checkbox-sm"
                :class="{
                  'checkbox-success': item.data.exists,
                  'checkbox-error': !item.data.exists,
                }"
                type="checkbox"
                v-model="item.data.exists"
              />
            </span>
          </div>
          <div class="h-full">
            <div
              v-if="list.length == 0"
              class="flex flex-col justify-center items-center mt-5"
            >
              <IconCSS name="arcticons:bad-piggies" size="150" />
              <span class="text-2xl">No results found</span>
              <span> (A a piggy stole them!) </span>
              <span
                v-if="joke.data.value?.joke"
                class="mt-5 p-2 shadow-xl mx-6 border rounded-xl dark:border-[#383f47]"
              >
                {{ joke.data.value.joke }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="btn btn-block mt-2"
      @click="laptops.forEach((i) => (i.exists = false))"
    >
      Reset
    </button>
  </div>

  <div v-if="tab == 1" class="max-sm:w-[80vw] w-[22rem]">
    <div class="flex gap-3 my-3">
      <h2 class="font-bold">Total Missing:</h2>
      <span>{{ laptops.filter((laptop) => !laptop.exists).length }}</span>
    </div>
    <div class="join join-vertical w-full">
      <div
        class="grid px-1 border join-item dark:border-[#383f47]"
        style="grid-template-columns: 1fr 2fr"
      >
        <span>Cart</span>
        <span class="pl-5">ID</span>
      </div>

      <div
        class="h-[65vh] overflow-y-scroll mt-4 shadow-inner border join-item dark:border-[#383f47]"
      >
        <div
          v-for="item in laptops.filter((laptop) => !laptop.exists)"
          :key="item.id"
          class="h-[22px] grid gap-2 even:bg-base-200 px-2 w-full"
          style="grid-template-columns: 1fr 4fr"
        >
          <span class="text-center">
            {{ item.cart }}
          </span>
          <span class="text-center">
            {{ item.id }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
