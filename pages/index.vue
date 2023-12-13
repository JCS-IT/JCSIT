<script setup lang="ts">
// import { FloorMap } from "@/data/mapping";
import { doc } from "firebase/firestore";
import type { ConfigData } from "@/types";
const router = useRouter();

const configData = useDocument<ConfigData>(
  doc(useFirestore(), "global/config"),
);
</script>

<template>
  <div class="grid gap-2">
    <div
      class="grid gap-2 flex-wrap"
      v-for="floor in configData?.floors.toReversed()"
    >
      <div class="divider h-0">{{ floor.name }}</div>
      <div class="flex flex-row flex-wrap gap-1 justify-center">
        <Button
          v-for="cart in floor.carts"
          :key="cart.id"
          @click="router.push({ name: 'cart-id', params: { id: cart.id } })"
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
    <div class="w-full">
      <div class="divider"></div>
      <a class="btn-error w-full btn" href="https://ism.cbe.ab.ca">
        <IconCSS name="mdi:fire" />
        <span>HEAT ticket</span>
      </a>
    </div>
  </div>
</template>
