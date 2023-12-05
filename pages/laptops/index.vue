<script setup lang="ts">
import { FloorMap } from "@/data/mapping";
const router = useRouter();
</script>

<template>
  <div class="grid gap-2">
    <div class="grid gap-2 flex-wrap" v-for="floor in FloorMap.toReversed()">
      <div class="divider h-0">{{ floor.name }}</div>
      <div class="flex flex-row flex-wrap gap-1 justify-center">
        <Button
          v-for="cart in floor.carts"
          :key="cart.id"
          @click="
            router.push({ name: 'laptops-cart-id', params: { id: cart.id } })
          "
          :style="{
            backgroundColor: `#${cart.color.bg}`,
            color: `#${cart.color.text}`,
          }"
          class="flex-grow"
        >
          {{
            `Cart ${cart.id} (${cart.name.split(" ")[0]} | ${
              cart.location.room
            })`
          }}
        </Button>
      </div>
    </div>
  </div>
</template>
