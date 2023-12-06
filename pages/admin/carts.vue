<script setup lang="ts">
import type { Laptop } from "@/types";

const generateRandomNumber = (max: number, pad: number) => {
  const num = Math.floor(Math.random() * max) + 1;
  return Number(num.toString().padStart(pad, "0"));
};

const laptops = ref<Laptop[]>(
  Array.from({ length: 10 }, () => ({
    id: `L802WL230${generateRandomNumber(200, 3)}`,
    cart: generateRandomNumber(4, 0),
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
        <th>Exists</th>
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
