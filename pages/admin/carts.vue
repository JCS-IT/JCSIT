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
    exists: true,
  }))
);
</script>

<template>
  <table class="table table-zebra">
    <thead>
      <tr>
        <th>Cart</th>
        <th>ID</th>
        <th>Exists (Y/N)</th>
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
            v-model="laptop.exists"
            :value="true"
          />
          <input
            type="radio"
            :name="`radio-${i}`"
            class="radio radio-error"
            :value="false"
            v-model="laptop.exists"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
