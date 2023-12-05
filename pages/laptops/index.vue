<script setup lang="ts">
import { CartMap } from "@/data/mapping";
const router = useRouter();
const route = useRoute("laptops");

const locations = ref({
  LC3: CartMap.filter((cart) => cart.location === "LC3"),
  LC2: CartMap.filter((cart) => cart.location === "LC2"),
  Misc: CartMap.filter(
    (cart) => cart.location !== "LC3" && cart.location !== "LC2"
  ),
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex flex-col gap-2 flex-wrap justify-center"
      v-for="(carts, location) in locations"
    >
      <div class="divider h-0">{{ location }}</div>
      <Button
        v-for="cart in carts"
        :key="cart.id"
        @click="
          router.push({ name: 'laptops-cart-id', params: { id: cart.id } })
        "
        :style="{
          backgroundColor: `#${cart.color.bg}`,
          color: `#${cart.color.text}`,
        }"
        class="justify-start"
      >
        {{ `Cart ${cart.id} (${cart.name.split(" ")[0]} | ${cart.location})` }}
      </Button>
    </div>
  </div>
</template>
