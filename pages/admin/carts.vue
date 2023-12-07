<script setup lang="ts">
import type { Laptop } from "@/types";

const tab = ref(0);

const generateRandomNumber = (max: number) => {
  const num = Math.floor(Math.random() * max) + 1;
  return num.toString().padStart(3, "0");
};

const laptops = ref<Laptop[]>(
  Array.from({ length: 10 }, () => ({
    id: `L802WL${(Math.floor(Math.random() * 6) + 18)
      .toString()
      .padStart(2, "0")}0${generateRandomNumber(200)}`,
    cart: Math.floor(Math.random() * 3) + 1,
    exists: false,
  })).sort((a, b) => a.cart - b.cart)
);

const missing = computed(() => {
  return laptops.value.filter((laptop) => !laptop.exists);
});

const search = ref("");

const filteredLaptops = computed(() => {
  if (search.value.includes("cart:")) {
    const cart = search.value.split("cart:")[1];
    return laptops.value.filter((laptop) => laptop.cart == parseInt(cart));
  } else {
    return laptops.value.filter((laptop) =>
      laptop.id.toLowerCase().includes(search.value.toLowerCase())
    );
  }
});
</script>

<template>
  <div role="tablist" class="tabs tabs-lifted">
    <button
      role="tab"
      class="tab"
      :class="{ 'tab-active': tab == 0 }"
      @click="tab = 0"
    >
      Carts
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
  <div class="flex gap-2 flex-wrap">
    <div class="flex-grow" v-if="tab == 0">
      <input
        class="input input-bordered mb-2 w-full"
        type="text"
        v-model="search"
        placeholder="Search"
      />
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Cart</th>
            <th>ID</th>
            <th>Exists</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="laptop in filteredLaptops">
            <td>{{ laptop.cart }}</td>
            <td>{{ laptop.id }}</td>
            <td class="flex">
              <input
                class="checkbox checkbox-sm"
                type="checkbox"
                v-model="laptop.exists"
              />
            </td>
          </tr>
          <tr v-if="filteredLaptops.length == 0">
            <td colspan="3" class="text-center">
              <h2>No matches</h2>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="tab == 1" class="flex-grow">
      <div v-if="missing.length > 0">
        <h2>Missing</h2>
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>Cart</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(laptop, i) in missing">
              <td>{{ laptop.cart }}</td>
              <td>{{ laptop.id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h2>No missing laptops</h2>
      </div>
    </div>
  </div>
</template>
