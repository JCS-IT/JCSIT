<script setup lang="ts">
import { carts } from "@/data/mapping";
const router = useRouter();
const route = useRoute("laptops");
</script>

<template>
  <div class="flex flex-col gap-2 flex-wrap justify-center">
    <Button
      v-for="cart in carts"
      :key="cart.id"
      @click="router.push({ name: 'laptops-cart-id', params: { id: cart.id } })"
      :style="{
        backgroundColor: `#${cart.color.bg}`,
        color: `#${cart.color.text}`,
      }"
      class="justify-start"
    >
      {{ `Cart ${cart.id} (${cart.name.split(" ")[0]} | ${cart.location})` }}
    </Button>
  </div>
</template>
