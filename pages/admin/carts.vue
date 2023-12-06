<script setup lang="ts">
import type { Laptop } from "@/types";

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const laptops = ref<Laptop[]>(
  Array.from({ length: 10 }, () => ({
    id: `L802WL2300${randomIntFromInterval(0, 10)}`,
    cart: 1,
  }))
);
</script>

<template>
  <table class="table table-zebra">
    <thead>
      <tr>
        <th>Cart</th>
        <th>ID</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(laptop, i) in laptops">
        <td>{{ laptop.cart }}</td>
        <td>{{ laptop.id }}</td>
        <td class="flex gap-1">
          <input
            type="radio"
            :name="`radio-${i}`"
            class="radio radio-success"
            checked
          />
          <input type="radio" :name="`radio-${i}`" class="radio radio-error" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
