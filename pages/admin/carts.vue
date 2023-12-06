<script setup lang="ts">
import type { Laptop } from "@/types";

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
  }))
);

const missing = computed(() => {
  return laptops.value.filter((laptop) => !laptop.exists);
});
</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <div class="flex-grow">
      <h2>Carts</h2>
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Cart</th>
            <th>ID</th>
            <th>Exists</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(laptop, i) in laptops">
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
        </tbody>
      </table>
    </div>

    <div v-if="missing.length > 0" class="flex-grow">
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
  </div>
</template>
