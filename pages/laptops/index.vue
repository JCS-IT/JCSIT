<script setup lang="ts">
const router = useRouter();
const route = useRoute("laptops");

const carts = ref([
  { id: 1, name: "Red Cart" },
  { id: 2, name: "Blue Cart" },
  { id: 3, name: "Green Cart" },
]);
</script>

<template>
  <div class="flex gap-2">
    <Button
      v-for="cart in carts"
      :key="cart.id"
      @click="
        router.push({ name: 'laptops-booking', query: { cart: cart.id } })
      "
    >
      {{ cart.name }}
    </Button>
  </div>
</template>
